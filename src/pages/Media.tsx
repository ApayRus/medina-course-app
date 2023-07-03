import { IonContent, IonFooter, IonSpinner, IonToolbar } from '@ionic/react'
import { useEffect, useContext, useState } from 'react'
import { useParams } from 'react-router'
import { AppStateContext } from '../components/AppStateProvider'
import { getPhrases } from '../utils/utils'
import { getContentLayers, getMediaLink } from '../api'
import { PlayerContext } from 'react-wavesurfer-provider'
import PlayerWavesurfer from '../components/PlayerWavesurfer'
import PlayerControls from '../components/PlayerControls'
import { NavigationContext } from '../components/Navigation/NavigationProvider'

interface State {
	contentLayers: string[]
	mediaLink: string
}

const Media: React.FC = () => {
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

	const {
		methods: { getPageInfo }
	} = useContext(NavigationContext)
	const PageInfo = getPageInfo(path)
	const { layers: pageInfoLayers } = PageInfo

	const titles = pageInfoLayers
		.filter(elem => elem.layerInfo.checked)
		.map(elem => {
			const { title } = elem?.itemInfo || {}
			return title
		})

	const titlesJSX = (
		<div className='pageTitlesBlock'>
			{titles.map((title, index) => (
				<div className='pageTitleLayer' key={`title-${index}`}>
					{title}
				</div>
			))}
		</div>
	)

	const showSpinner = !(isLoaded && playerState?.isReady)

	return (
		<>
			<IonContent fullscreen>
				{titlesJSX}
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
