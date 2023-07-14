import { useContext, useEffect, useRef } from 'react'
import { playOutline as playIcon } from 'ionicons/icons/'
import { IonButton, IonIcon } from '@ionic/react'
import { PlayerContext } from 'react-wavesurfer-provider'
import { LayersContext } from './Layers/Provider'
import { scrollPhrases } from '../utils/utils'
import { AppStateContext } from './AppStateProvider'

interface Props {
	phrasesContainerRef: React.RefObject<HTMLIonContentElement>
}

const PhrasesBlock: React.FC<Props> = ({ phrasesContainerRef }) => {
	const {
		state: { currentPhraseNum, phrases, playMode },
		// phraseRefs,
		methods: { playPhrase }
	} = useContext(PlayerContext)

	const {
		methods: { getSetting }
	} = useContext(AppStateContext)

	const {
		methods: { mixPhrases }
	} = useContext(LayersContext)

	const phraseRefs = useRef<HTMLDivElement[]>([])

	useEffect(() => {
		const autoScroll = getSetting('phrases/autoScroll')
		if (playMode !== 'phrase' && autoScroll) {
			scrollPhrases({
				phraseIndex: currentPhraseNum - 2,
				// delta: screenHeight / 2,
				phraseRefs,
				phrasesContainerRef
			})
		}
	}, [currentPhraseNum])

	return (
		<div className='phrasesBlock'>
			{mixPhrases()?.map((phraseBlock, phraseIndex) => {
				// const { layerInfo, phrase } = phraseWithLayers
				const isActive = currentPhraseNum === phraseIndex
				const { id = '' } = phrases?.[phraseIndex] || {}

				return (
					<div
						className={`phraseWrapper phrase-${phraseIndex}`}
						key={`phrase-${phraseIndex}`}
						ref={el => {
							if (phraseRefs.current) {
								phraseRefs.current[phraseIndex] = el!
							}
						}}
					>
						<div className={isActive ? 'phraseBlock active' : 'phraseBlock'}>
							{phraseBlock.map((phraseLayer, layerIndex) => {
								const { phrase, layerInfo } = phraseLayer
								const { path: layerPath } = layerInfo
								const path = layerPath.replace('content/', '')
								const layerName = path.replace(/\//g, '-')
								const showLayer = getSetting(layerPath) as boolean

								const { text } = phrase?.data || {}
								return showLayer ? (
									<div
										className={`phraseLayer ${layerName} layer-${layerIndex}`}
										key={`layer-${layerIndex}`}
									>
										{getSetting('phrases/showLayerName') && (
											<div className={`path`}>
												{path.replace('layers/', '')}
											</div>
										)}
										<div className={`text`}>{text}</div>
									</div>
								) : (
									<></>
								)
							})}

							<div className='phraseNum'>
								<IonButton
									fill='clear'
									size='small'
									onClick={() => playPhrase(id)}
								>
									<IonIcon icon={playIcon} />
									{phraseIndex}
								</IonButton>
							</div>
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default PhrasesBlock
