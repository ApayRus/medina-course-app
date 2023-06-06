import { ConfigLayers, LayerToDisplay } from '../components/AppStateProvider'

interface Props {
	layers: ConfigLayers
	parentIds: string[]
	parentTitles: string[]
}

/**
 *
 * returns flat layers from config as  ['en/main', 'en/notes', 'ru/main', 'ru/transcription']
 */
export const getFlatLayers = ({ layers, parentIds, parentTitles }: Props) => {
	// @ts-ignore
	return layers.reduce((acc, item) => {
		if ('content' in item) {
			const { id, title, content } = item
			const newItem = getFlatLayers({
				layers: content,
				parentIds: [...parentIds, id],
				parentTitles: [...parentTitles, title]
			}) as LayerToDisplay[]
			return [...acc, ...newItem]
		} else {
			const { id, title, main, checked } = item
			const newItem = {
				title: [...parentTitles, title].join(', '),
				path: [...parentIds, id].join('/'),
				main,
				checked
			}
			return [...acc, newItem]
		}
	}, []) as LayerToDisplay[]
}
