import {
	IonApp,
	IonRouterOutlet,
	IonSplitPane,
	setupIonicReact
} from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { Route } from 'react-router-dom'
import Menu from './components/Navigation/Menu'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

/* Theme variables */
import './theme/variables.css'

import NavigationProvider from './components/Navigation/NavigationProvider'
import AppStateProvider from './components/AppStateProvider'
import Main from './pages/Main'
import ModalProvider from './components/Modals/ModalsProvider'
import PageFrame from './pages/PageFrame'

setupIonicReact()

const App: React.FC = () => {
	return (
		<IonApp>
			<IonReactRouter>
				<AppStateProvider>
					<NavigationProvider>
						<ModalProvider>
							<IonSplitPane contentId='main'>
								<Menu />
								<IonRouterOutlet id='main'>
									<Route path='/:path+'>
										<PageFrame />
									</Route>
									<Route path='/' exact>
										<Main />
									</Route>
								</IonRouterOutlet>
							</IonSplitPane>
						</ModalProvider>
					</NavigationProvider>
				</AppStateProvider>
			</IonReactRouter>
		</IonApp>
	)
}

export default App
