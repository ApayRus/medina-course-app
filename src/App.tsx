import {
	IonApp,
	IonRouterOutlet,
	IonSplitPane,
	setupIonicReact
} from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { Route } from 'react-router-dom'
import Menu from './components/Menu'
import MediaPage from './pages/Media'

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

import NavigationProvider from './components/NavigationProvider'
import MainPage from './pages/Main'
import AboutPage from './pages/About'
import AppStateProvider from './components/AppStateProvider'

setupIonicReact()

const App: React.FC = () => {
	return (
		<AppStateProvider>
			<NavigationProvider>
				<IonApp>
					<IonReactRouter>
						<IonSplitPane contentId='main'>
							<Menu />
							<IonRouterOutlet id='main'>
								<Route path='/' exact={true}>
									<MainPage />
								</Route>
								<Route path='/about' exact={true}>
									<AboutPage />
								</Route>
								<Route path='/media/:path+'>
									<MediaPage />
								</Route>
							</IonRouterOutlet>
						</IonSplitPane>
					</IonReactRouter>
				</IonApp>
			</NavigationProvider>
		</AppStateProvider>
	)
}

export default App
