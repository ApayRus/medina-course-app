import axios from 'axios'
import { TableOfContentType } from '../components/Navigation/types'
import { LayerToDisplay } from '../components/AppStateProvider'
import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from '../firebase'

export const getToc = async (trLang?: string) => {
	const lang = trLang ? trLang : ''
	const { data: toc } = await axios(`/content/TOC_${lang}.json`)
	return toc as TableOfContentType
}

export const getTocs = async (layers: LayerToDisplay[]) => {
	const tocLayers = layers.filter(
		elem => elem.path.match('toc/') && elem.checked
	)
	const tocLinks = await Promise.all(
		tocLayers.map(elem => {
			const prms = getDownloadURL(ref(storage, elem.path + '.json')).catch(e =>
				console.log(e)
			)
			return prms
		})
	)

	const tocPromises = tocLinks.map(
		elem => elem && axios.get<TableOfContentType>(elem)
	)

	const tocsRaw = await Promise.all(tocPromises)

	const tocs = tocsRaw.map((elem, index) => {
		const { data = [] } = elem || {}
		const info = layers[index]
		return { info, data }
	})

	return tocs
}

export const getSubs = async (path: string, layers: LayerToDisplay[]) => {
	const pathArray = path.split('/')
	const [bookPath, ...rest] = pathArray
	const pagePath = rest.join('/')
	const { path: layerPath } = layers[0]
	const { data: subs } = await axios(
		`/content/${bookPath}/layers/${layerPath}/${pagePath}.txt`
	)
	return subs as string
}

export const getTranslation = async (path: string, trLang: string) => {
	const pathArray = path.split('/')
	const [bookPath, ...rest] = pathArray
	const pagePath = rest.join('/')
	const { data: translation } = await axios(
		`/content/${bookPath}/layers/${trLang}/translation/${pagePath}.txt`
	)
	return translation as string
}

export const getConfig = async () => {
	const link = await getDownloadURL(ref(storage, 'config.json'))
	const { data } = await axios(link)
	return data
}

async function readFile(fileUrl: string) {
	try {
		const { data } = await axios(fileUrl)
		return data
	} catch (e) {
		// console.log(e)
		return ''
	}
}
