import { IonSpinner } from '@ionic/react'
import { createContext, useEffect, useState } from 'react'
import { getConfig } from '../api'
import { getFlatLayers } from '../functions/config'

/* 
Layers in config file are a tree to visualize checkboxes in nested way 
Layers in app state is a flat array, to know which layers we should load and in which order to display them
*/

export interface LayerToDisplay {
	path: string
	title: string
	checked?: boolean
	main?: boolean
}

export interface LayerItemInConfig {
	id: string
	title: string
	checked?: boolean
	main?: boolean
}

export interface LayerFolderInConfig {
	id: string
	title: string
	content: ConfigLayers
}

export type ConfigLayers = Array<LayerItemInConfig | LayerFolderInConfig>

export interface Config {
	layers: ConfigLayers
}

export interface AppState {
	loading: boolean
	configLoaded: boolean
	tocsLoaded: boolean
	trLang: string
	config: Config // all possible languages/layers
	layers: LayerToDisplay[] // ['en/main', 'ru/main'] // active layers to display
}

interface Methods {
	update: (newValues: Partial<AppState>) => void
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

const AppStateProvider: React.FC<Props> = ({ children }) => {
	const [state, setState] = useState<AppState>({
		loading: true,
		configLoaded: false,
		tocsLoaded: false,
		trLang: 'ru',
		config: defaultConfig,
		layers: []
	})

	useEffect(() => {
		const loadConfig = async () => {
			/* 
			scenarios:
			1) a first open of the app, load default config and put to LS
			2) non first open, config the same, get state from LS 
			3) non first open, a new config, load config from Server, update layers "checked" from LS 
			*/

			const configServer = await getConfig()

			let config, layers

			const appStateLSString = localStorage.getItem('appState') || `{}`
			const appStateLS = JSON.parse(appStateLSString) as AppState
			const { config: configLS, layers: layersLS } = appStateLS

			// 1)
			if (appStateLSString === '{}') {
				config = configServer
				layers = getFlatLayers({
					layers: config.layers,
					parentIds: [],
					parentTitles: []
				})
			}

			// 2)
			else if (JSON.stringify(configLS) === JSON.stringify(configServer)) {
				config = configLS
				layers = layersLS
			}

			// 3)
			else {
				config = configServer
				const layersServer = getFlatLayers({
					layers: config.layers,
					parentIds: [],
					parentTitles: []
				})
				layers = layersServer.map(layer => {
					const layerLS = layersLS.find(elem => elem.path === layer.path)
					const checked = layerLS?.checked || false
					return { ...layer, checked }
				})
			}

			update({ config: configServer, layers, configLoaded: true })
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
			if ('layers' in newValues) {
				localStorage.setItem('appState', JSON.stringify(newState))
			}
			return newState
		})
	}

	const contextValue: { state: AppState; methods: Methods } = {
		state,
		methods: { update }
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
