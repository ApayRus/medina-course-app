import { IonSpinner } from '@ionic/react'
import { createContext, useEffect, useState } from 'react'
import { getConfig } from '../api'
import { getFlatSettings } from '../functions/config'
import { DelayMeasure } from 'react-wavesurfer-provider'

export type SettingsItemValue = number | string | boolean

export interface SettingsItem {
	path: string
	title: string[]
	value?: SettingsItemValue
	main?: boolean
	options?: string[]
}

export interface SelectOption {
	id: string
	title: string
}

export interface ConfigItem {
	id: string
	title: string
	description?: string
	main?: boolean
	value?: SettingsItemValue
	options?: SelectOption[]
	min?: number
	max?: number
	step?: string
}

export interface ConfigFolder {
	id: string
	title: string
	description?: string
	content: Array<ConfigItem | ConfigFolder>
}

export type Config = Array<ConfigItem | ConfigFolder>

export interface AppState {
	loading: boolean
	configLoaded: boolean
	tocsLoaded: boolean
	config: Config // tree structure and default settings
	settings: SettingsItem[] // flat config, will be filled with data by user interactions
	isPageTransition: boolean // to know that page opened automatically, to run auto actions, e.g. playing
}

interface updateSettingProps {
	path: string
	value: SettingsItemValue
}

interface DictationSettings {
	repeatCount: number
	repeatDelay: number
	delayMeasure: DelayMeasure
}

interface Methods {
	update: (newValues: Partial<AppState>) => void
	updateSetting: ({ path, value }: updateSettingProps) => void
	getSetting: (path: string) => SettingsItemValue
	getDictationSettings: () => DictationSettings
}

interface ContextType {
	state: AppState
	methods: Methods
}

interface Props {
	children: JSX.Element
}

const defaultContextValue = {} as ContextType

export const AppStateContext = createContext<ContextType>(defaultContextValue)

const defaultConfig = {} as Config

const defaultState = {
	loading: true,
	configLoaded: false,
	tocsLoaded: false,
	config: defaultConfig,
	settings: [],
	isPageTransition: false
}

const AppStateProvider: React.FC<Props> = ({ children }) => {
	const [state, setState] = useState<AppState>(defaultState)

	useEffect(() => {
		const loadConfig = async () => {
			/* 
			scenarios:
			1) a first open of the app, load default config and put to LS
			2) non first open, config the same, get state from LS 
			3) non first open, a new config, load config from Server, update settings "values" from LS 
			*/

			const configServer = await getConfig()

			let config, settings

			const appStateLSString = localStorage.getItem('appState') || `{}`
			const appStateLS = JSON.parse(appStateLSString) as AppState
			const { config: configLS, settings: settingsLS } = appStateLS

			// 1)
			if (appStateLSString === '{}') {
				config = configServer
				settings = getFlatSettings({
					settings: config,
					parentIds: [],
					parentTitles: []
				})
			}

			// 2)
			else if (JSON.stringify(configLS) === JSON.stringify(configServer)) {
				config = configLS
				settings = settingsLS
			}

			// 3)
			else {
				config = configServer
				const settingsServer = getFlatSettings({
					settings: config,
					parentIds: [],
					parentTitles: []
				})
				settings = settingsServer.map(setting => {
					const settingLS = settingsLS.find(elem => elem.path === setting.path)
					const value = settingLS?.value || false
					return { ...setting, value }
				})
			}

			update({ config, settings, configLoaded: true })
		}
		loadConfig()
	}, [])

	useEffect(() => {
		const loading = !(state.configLoaded && state.tocsLoaded)
		update({ loading })
	}, [state.configLoaded, state.tocsLoaded])

	const update = (newValues: Partial<AppState>) => {
		setState(oldState => {
			const newState = { ...oldState, ...newValues }
			if ('settings' in newValues) {
				localStorage.setItem('appState', JSON.stringify(newState))
			}
			return newState
		})
	}

	const updateSetting = ({ path, value }: updateSettingProps) => {
		const { settings } = { ...state }
		const itemIndex = settings.findIndex(elem => elem.path === path)
		settings[itemIndex] = { ...settings[itemIndex], value }
		update({ settings })
	}

	const getSetting = (path: string) => {
		const setting = state.settings.find(elem => elem.path === path)!.value!
		return setting
	}

	const getDictationSettings = () => {
		const repeatCount = getSetting(`player/repeatCount`) as number
		const repeatDelay = getSetting(`player/repeatDelay`) as number
		const delayMeasure = getSetting(`player/delayMeasure`) as DelayMeasure
		return { repeatCount, repeatDelay, delayMeasure }
	}

	const contextValue: { state: AppState; methods: Methods } = {
		state,
		methods: { update, updateSetting, getSetting, getDictationSettings }
	}

	const loadingSpinner = (
		<div style={{ position: 'fixed', top: 10, left: 10 }}>
			<IonSpinner />
		</div>
	)

	return (
		<AppStateContext.Provider value={contextValue}>
			<div>
				{state.loading && loadingSpinner}
				{children}
			</div>
		</AppStateContext.Provider>
	)
}

export default AppStateProvider
