import axios from 'axios'
import { TableOfContentType } from '../components/Navigation/types'
import { Config, Layer } from '../components/AppStateProvider'

export const getToc = async (trLang?: string) => {
	const lang = trLang ? trLang : ''
	const { data: toc } = await axios(`/content/TOC_${lang}.json`)
	return toc as TableOfContentType
}

export const getSubs = async (path: string, layers: Layer[]) => {
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
	const { data: config } = await axios(`/config.json`)
	return config as Config
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
