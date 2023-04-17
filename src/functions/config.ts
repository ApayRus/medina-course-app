import { Config, Layer } from '../components/AppStateProvider'

/**
 *
 * returns flat layers from config as  ['en/main', 'en/notes', 'ru/main', 'ru/transcription']
 */
export const getLayers = (config: Config) => {
	const { languages } = config

	const layers = languages.reduce((acc: any, item) => {
		const { code: langCode, title: langTitle, layers } = item
		const flatLayers = layers.map(layer => {
			const { code: layerCode, title: layerTitle, checked } = layer
			return {
				path: `${langCode}/${layerCode}`,
				langTitle,
				layerTitle,
				checked
			}
		})
		return [...acc, ...flatLayers]
	}, [])

	return layers as Layer[]
}
