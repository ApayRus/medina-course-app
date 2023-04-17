import { IonLoading } from '@ionic/react'
import { createContext, useEffect, useState } from 'react'
import { getConfig } from '../api'
import { getLayers } from '../functions/config'

interface LangLayer {
	code: string
	title: string
	checked?: boolean
}

export interface Layer {
	path: string
	langTitle: string
	layerTitle: string
	checked?: boolean
}

interface Language {
	code: string
	title: string
	layers: LangLayer[]
}

export interface Config {
	languages: Language[]
}

interface State {
	loading: boolean
	trLang: string
	config: Config // all possible languages/layers
	layers: Layer[] // ['en/main', 'ru/main'] // active layers to display
}

interface Methods {
	update: (newValues: Partial<State>) => void
}

interface ContextType {
	state: State
	methods: Methods
}

interface Props {
	children: JSX.Element
}

const defaultContextValue = {} as ContextType

export const AppStateContext = createContext<ContextType>(defaultContextValue)

const defaultConfig = {} as Config

const AppStateProvider: React.FC<Props> = ({ children }) => {
	const [state, setState] = useState<State>({
		loading: true,
		trLang: 'ru',
		config: defaultConfig,
		layers: []
	})
	const [openLoadingOverlay, setOpenLoadingOverlay] = useState(false)

	useEffect(() => {
		const loadConfig = async () => {
			const config = await getConfig()

			setState(oldState => ({ ...oldState, config }))
			const layers = getLayers(config)
			setState(oldState => ({ ...oldState, layers }))
		}
		loadConfig()
	}, [])

	useEffect(() => {
		setOpenLoadingOverlay(state.loading)
	}, [state.loading])

	const update = (newValues: Partial<State>) => {
		setState(oldState => ({ ...oldState, ...newValues }))
	}

	const contextValue: { state: State; methods: Methods } = {
		state,
		methods: { update }
	}

	return (
		<AppStateContext.Provider value={contextValue}>
			<IonLoading isOpen={openLoadingOverlay} />
			{children}
		</AppStateContext.Provider>
	)
}

export default AppStateProvider
