import {
	IonModal,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonButtons,
	IonButton,
	IonContent
} from '@ionic/react'
import { createContext, useState } from 'react'
import Config from '../Settings'

interface Props {
	children: JSX.Element | JSX.Element[]
}

interface ContextType {
	state: State
	methods: Methods
}

interface State {
	isOpen: boolean
	contentComponent: 'Config'
	title?: string
	// props?: any
}

interface OpenModalParams {
	contentComponent: 'Config'
	title?: string
	// props?: any
}

interface Methods {
	openModal: (params: OpenModalParams) => void
}

const defaultContextValue = {} as ContextType

export const ModalContext = createContext<ContextType>(defaultContextValue)

const ModalProvider: React.FC<Props> = ({ children }) => {
	const [state, setState] = useState<State>({
		isOpen: false,
		contentComponent: 'Config'
	})

	const openModal = (params: OpenModalParams) => {
		setState({ isOpen: true, ...params })
	}

	const methods: Methods = { openModal }

	const contextValue = { state, methods }

	const modalWithContent = (
		<IonModal
			isOpen={state.isOpen}
			onDidDismiss={() =>
				setState(oldState => ({ ...oldState, isOpen: false }))
			}
		>
			<IonHeader>
				<IonToolbar>
					<IonTitle>{state.title}</IonTitle>
					<IonButtons slot='end'>
						<IonButton
							onClick={() =>
								setState(oldState => ({ ...oldState, isOpen: false }))
							}
						>
							Close
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent className='ion-padding'>
				{state.contentComponent === 'Config' && <Config />}
			</IonContent>
		</IonModal>
	)

	return (
		<ModalContext.Provider value={contextValue}>
			{children}
			{modalWithContent}
		</ModalContext.Provider>
	)
}

export default ModalProvider
