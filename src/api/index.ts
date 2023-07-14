import axios from 'axios'
import { TableOfContentType } from '../components/Navigation/types'
import { Config, SettingsItem } from '../components/AppStateProvider'
import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from '../firebase'
import { Toc } from '../components/Navigation/NavigationProvider'

export interface ContentLayer {
	info: SettingsItem
	data: string
}

export const getFile = async (path: string) => {
	try {
		const link = await getDownloadURL(ref(storage, path))
		return axios(link)
			.then(result => result.data)
			.catch(e => console.log(e))
	} catch (e) {
		console.log(e)
		return ''
	}
}

export const getFiles = async (paths: string[]) => {
	const tasks = paths.map(path => getFile(path))
	const files = await Promise.all(tasks).catch(e => console.log(e))
	return files
}

export const getTocs = async (layers: SettingsItem[]) => {
	const tocPaths = layers
		.filter(elem => elem.path.match('toc/') && elem.value)
		.map(elem => elem.path.replace('layers/', '') + '.json')

	const files = (await getFiles(tocPaths)) as TableOfContentType[]

	const tocs = files.map((elem, index) => {
		const data = elem
		const info = layers[index]
		return { info, data }
	})

	return tocs as Toc[]
}

export const getConfig = async () => {
	const config = (await getFile('config.json')) as Config
	return config
}

export const getContentLayers = async (
	layers: SettingsItem[],
	path: string
) => {
	const layerInfoArray = layers.filter(
		elem => elem.path.match('content/') && (elem.value || elem.main)
	)

	const paths = layerInfoArray.map(
		layer => `${layer.path.replace('layers/', '')}/${path}.txt`
	)

	const layerDataArray = (await getFiles(paths)) as string[]

	const contentLayers = layerInfoArray.map((elem, index) => {
		const info = elem
		const data = layerDataArray[index]
		return { info, data }
	})

	return contentLayers as ContentLayer[]
}

export const getMediaLink = async (path: string) => {
	return getDownloadURL(ref(storage, `content/media/${path}.mp3`)).catch(e => {
		console.log(e)
		return ''
	})
}
