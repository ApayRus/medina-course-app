import { useContext } from 'react'
import { LayersContext } from './Layers/Provider'
import { AppStateContext } from './AppStateProvider'

const PhrasesBlockHtml: React.FC = () => {
	const {
		methods: { getSetting }
	} = useContext(AppStateContext)

	const {
		methods: { mixPhrases }
	} = useContext(LayersContext)

	const showLayerName = getSetting('phrases/showLayerName')

	return (
		<div className='phrasesBlock'>
			{mixPhrases()?.map((phraseBlock, phraseIndex) => {
				// const { layerInfo, phrase } = phraseWithLayers

				return (
					<div
						key={`phraseWrapper-${phraseIndex}`}
						className={`htmlPhraseWrapper htmlPhrase-${phraseIndex}`}
					>
						<div className={`htmlPhrase`}>
							{phraseBlock.map((phraseLayer, layerIndex) => {
								const { phrase, layerInfo } = phraseLayer
								const { path: layerPath } = layerInfo
								const layerName = layerPath
									.replace('layers/content/', '')
									.replace(/\//g, '-')
								const showLayer = getSetting(layerPath)
								const { text = '' } = phrase?.data || {}
								return showLayer ? (
									<div
										key={`phraseLayer-${layerIndex}`}
										className={`htmlPhraseLayer ${layerName} layer-${layerIndex}`}
									>
										{showLayerName && (
											<div className={`layerName`}>{layerName}</div>
										)}
										<div
											className={`text`}
											dangerouslySetInnerHTML={{ __html: text }}
										/>
									</div>
								) : (
									<></>
								)
							})}
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default PhrasesBlockHtml
