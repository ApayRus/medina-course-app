import { IonContent } from '@ionic/react'
import { useParams } from 'react-router'
import PageTitles from '../components/PageTitles'
import { useContext, useEffect } from 'react'
import { AppStateContext } from '../components/AppStateProvider'
import { getContentLayers } from '../api'
import { Phrase } from 'react-wavesurfer-provider'
import { LayersContext } from '../components/Layers/Provider'
import PhrasesBlockHtml from '../components/PhrasesBlockHtml'

const Html: React.FC = () => {
	const { path = '' } = useParams<{ path: string }>()
	const {
		state: { settings, configLoaded, tocsLoaded }
	} = useContext(AppStateContext)

	const { methods: layerMethods } = useContext(LayersContext)

	useEffect(() => {
		const loadData = async () => {
			const contentLayers = await getContentLayers(settings, path, 'html')
			const layers = contentLayers.map(elem => {
				const { info, data } = elem
				const phrases = data
					.split(/\n\n/gm)
					.map(text => ({ data: { text } })) as Phrase[]
				return { info, phrases }
			})
			layerMethods.setLayers(layers)
		}
		if (configLoaded && tocsLoaded) {
			loadData().then(() => {})
		}
	}, [path, configLoaded, tocsLoaded])

	return tocsLoaded ? (
		<IonContent fullscreen>
			<div className={`htmlPage page-${path.replace('/', '-')}`}>
				<PageTitles path={path} />
				<PhrasesBlockHtml />
			</div>
		</IonContent>
	) : (
		<></>
	)
}

export default Html
