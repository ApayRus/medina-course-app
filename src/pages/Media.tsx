import {
	IonContent,
	IonFooter,
	IonPage,
	IonSpinner,
	IonToolbar
} from '@ionic/react'
import { useEffect, useContext, useState } from 'react'
import { useParams } from 'react-router'
// import { PlayerContext } from '../components/Player/Provider'
import Header from './Header'
import Player from '../components/Player'
import PhrasesBlock from '../components/Phrases'
import { PhrasesContext } from '../components/Phrases/Provider'
import { parseSubs } from 'frazy-parser'
import { Phrase, PhraseTr } from '../components/Phrases/types'
import { AppStateContext } from '../components/AppStateProvider'
import { NavigationContext } from '../components/Navigation/NavigationProvider'
import { getNavItemInfo, getPhrases } from '../utils/utils'
import { ContentLayer, getContentLayers, getMediaLink } from '../api'
import { PlayerContext } from 'react-wavesurfer-provider'
import Player2 from '../components/Player2'

interface State {
	contentLayers: string[]
	mediaLink: string
}

const MediaPage: React.FC = () => {
	const { path = '' } = useParams<{ path: string }>()

	const [isLoaded, setIsLoaded] = useState(false)

	const {
		state: { layers, configLoaded }
	} = useContext(AppStateContext)

	const { state: playerState, methods: playerMethods } =
		useContext(PlayerContext)

	useEffect(() => {
		const loadData = async () => {
			setIsLoaded(false)
			const mediaLink = await getMediaLink(path)
			playerMethods.setMediaLink(mediaLink)
			const contentLayers = await getContentLayers(layers, path)
			const phrases = getPhrases(contentLayers)
			playerMethods.updatePhrases({ phrases })
			setIsLoaded(true)
		}
		if (configLoaded) {
			loadData()
		}
	}, [path, configLoaded])

	const showSpinner = !(isLoaded && playerState?.isReady)

	return (
		<IonPage>
			<Header title={path} />
			<IonContent fullscreen>
				{showSpinner && <IonSpinner color='primary' />}
				<div style={!showSpinner ? {} : { visibility: 'hidden' }}>
					<Player2 />
				</div>
			</IonContent>
			<IonFooter>
				<IonToolbar>{/* <Player /> */}</IonToolbar>
			</IonFooter>
		</IonPage>
	)
}

export default MediaPage
