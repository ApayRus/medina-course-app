import axios from 'axios'
import { TableOfContentType } from '../components/Navigation/types'
import { Config, LayerToDisplay } from '../components/AppStateProvider'
import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from '../firebase'
import { Toc } from '../components/Navigation/NavigationProvider'

export const getFile = async (path: string) => {
	const link = await getDownloadURL(ref(storage, path))
	return axios(link)
		.then(result => result.data)
		.catch(e => console.log(e))
}

export const getFiles = async (paths: string[]) => {
	const tasks = paths.map(path => getFile(path))
	const files = await Promise.all(tasks).catch(e => console.log(e))
	return files
}

export const getTocs = async (layers: LayerToDisplay[]) => {
	const tocPaths = layers
		.filter(elem => elem.path.match('toc/') && elem.checked)
		.map(elem => elem.path + '.json')

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
