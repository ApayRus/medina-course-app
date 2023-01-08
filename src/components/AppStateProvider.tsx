import { IonLoading } from '@ionic/react'
import { createContext, useEffect, useState } from 'react'

interface State {
	loading: boolean
	translationLanguage: string
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

const AppStateProvider: React.FC<Props> = ({ children }) => {
	const [state, setState] = useState<State>({
		loading: true,
		translationLanguage: 'ru'
	})
	const [openLoadingOverlay, setOpenLoadingOverlay] = useState(false)

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
