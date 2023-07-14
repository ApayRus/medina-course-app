import { Config, SettingsItem } from '../components/AppStateProvider'

interface Props {
	settings: Config
	parentIds: string[]
	parentTitles: string[]
}

/**
 *
 * returns flat layers from config as  ['en/main', 'en/notes', 'ru/main', 'ru/transcription']
 */
export const getFlatSettings = ({
	settings,
	parentIds,
	parentTitles
}: Props) => {
	// @ts-ignore
	return settings.reduce((acc, item) => {
		if ('content' in item) {
			const { id, title, content } = item
			const newItem = getFlatSettings({
				settings: content,
				parentIds: [...parentIds, id],
				parentTitles: [...parentTitles, title]
			}) as SettingsItem[]
			return [...acc, ...newItem]
		} else {
			const { id, title, main, value } = item
			const newItem = {
				title: [...parentTitles, title],
				path: [...parentIds, id].join('/'),
				main,
				value
			}
			return [...acc, newItem]
		}
	}, []) as SettingsItem[]
}
