import { IonContent, IonFooter, IonSpinner, IonToolbar } from '@ionic/react'
import { useEffect, useContext, useRef } from 'react'
import { useParams } from 'react-router'
import { AppStateContext } from '../components/AppStateProvider'
import { getPhrases } from '../utils/utils'
import { getContentLayers, getMediaLink } from '../api'
import { PlayerContext } from 'react-wavesurfer-provider'
import PlayerWavesurfer from '../components/PlayerWavesurfer'
import PlayerControls from '../components/PlayerControls'
import PageTitles from '../components/PageTitles'
import { LayersContext } from '../components/Layers/Provider'
import PhrasesBlock from '../components/PhrasesBlock'
import { NavigationContext } from '../components/Navigation/NavigationProvider'

const Media: React.FC = () => {
	const { path = '' } = useParams<{ path: string }>()

	const phrasesContainerRef = useRef<HTMLIonContentElement>(null)

	const {
		state: { settings, configLoaded, isPageTransition },
		methods: { getSetting, update: updateAppState }
	} = useContext(AppStateContext)

	const {
		methods: { goNext }
	} = useContext(NavigationContext)

	const {
		state: { layers: layersWithPhrases },
		methods: layerMethods
	} = useContext(LayersContext)

	const { state: playerState, methods: playerMethods } =
		useContext(PlayerContext)

	useEffect(() => {
		const loadData = async () => {
			const mediaLink = await getMediaLink(path)
			playerMethods.setMediaLink(mediaLink)
			const contentLayers = await getContentLayers(settings, path)
			layerMethods.setLayers(contentLayers)
			const phrases = getPhrases(contentLayers)
			playerMethods.updatePhrases({ phrases })
		}
		if (configLoaded) {
			loadData().then(() => {
				if (playerState.isReady && isPageTransition) {
					updateAppState({ isPageTransition: false })
					playerMethods.play()
				}
			})
		}
	}, [path, configLoaded])

	// auto open new page after playing was finished
	useEffect(() => {
		if (playerState.isFinished) {
			const autoPlay = getSetting(`player/autoPlay`) as boolean
			if (autoPlay) {
				updateAppState({ isPageTransition: true })
				goNext()
			}
		}
	}, [playerState.isFinished])

	const showSpinner = !playerState?.isReady

	return (
		<>
			<IonContent fullscreen ref={phrasesContainerRef}>
				<PageTitles path={path} />
				{showSpinner && <IonSpinner color='primary' />}
				<div
					className='waveformPlayer'
					style={!showSpinner ? {} : { visibility: 'hidden' }}
				>
					<PlayerWavesurfer />
				</div>
				<PhrasesBlock phrasesContainerRef={phrasesContainerRef} />
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
