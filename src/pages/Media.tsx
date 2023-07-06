import { IonContent, IonFooter, IonSpinner, IonToolbar } from '@ionic/react'
import { useEffect, useContext } from 'react'
import { useParams } from 'react-router'
import { AppStateContext } from '../components/AppStateProvider'
import { getPhrases } from '../utils/utils'
import { getContentLayers, getMediaLink } from '../api'
import { PlayerContext } from 'react-wavesurfer-provider'
import PlayerWavesurfer from '../components/PlayerWavesurfer'
import PlayerControls from '../components/PlayerControls'
import PageTitles from '../components/PageTitles'

interface State {
	contentLayers: string[]
	mediaLink: string
}

const Media: React.FC = () => {
	const { path = '' } = useParams<{ path: string }>()

	const {
		state: { layers, configLoaded }
	} = useContext(AppStateContext)

	const { state: playerState, methods: playerMethods } =
		useContext(PlayerContext)

	useEffect(() => {
		const loadData = async () => {
			const mediaLink = await getMediaLink(path)
			playerMethods.setMediaLink(mediaLink)
			const contentLayers = await getContentLayers(layers, path)
			const phrases = getPhrases(contentLayers)
			playerMethods.updatePhrases({ phrases })
		}
		if (configLoaded) {
			loadData()
		}
	}, [path, configLoaded])

	const showSpinner = !playerState?.isReady

	return (
		<>
			<IonContent fullscreen>
				<PageTitles path={path} />
				{showSpinner && <IonSpinner color='primary' />}
				<div style={!showSpinner ? {} : { visibility: 'hidden' }}>
					<PlayerWavesurfer />
				</div>
				<pre>{JSON.stringify(playerState, null, 2)}</pre>
			</IonContent>
			<IonFooter>
				<IonToolbar>
					<PlayerControls />
				</IonToolbar>
			</IonFooter>
		</>
	)
}

export default Media
