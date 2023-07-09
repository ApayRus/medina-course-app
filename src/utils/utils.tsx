import { parseSubs as parseSubsExternal } from 'frazy-parser'
import { ContentLayer } from '../api'
import {
	FlatNavItem,
	FlatTableOfContentType,
	Folder,
	Page,
	TableOfContentType
} from '../components/Navigation/types'
import {
	FlatToc,
	PageInfo,
	Toc
} from '../components/Navigation/NavigationProvider'
import { Phrase } from 'react-wavesurfer-provider'
import { RefObject } from 'react'

const getCurrentPageIndex = (
	flatTableOfContent: FlatTableOfContentType,
	currentPage: string
) => {
	const index = flatTableOfContent.findIndex(elem => elem.path === currentPage)
	return index
}

const getItemByIndex = (
	flatTableOfContent: FlatTableOfContentType,
	index: number
) => {
	const navItem = flatTableOfContent[index]
	return navItem
}

export const getPageNeighbors = (
	flatTableOfContent: FlatTableOfContentType,
	currentPage: string
) => {
	const pages = flatTableOfContent.filter(elem => elem.type !== 'folder')

	const index = getCurrentPageIndex(pages, currentPage)
	const prevItem = getItemByIndex(pages, index - 1)
	const nextItem = getItemByIndex(pages, index + 1)
	return { prevItem, nextItem }
}

export const getNavItemInfo = (
	flatToc: FlatTableOfContentType,
	path: string
) => {
	const item = flatToc.find(elem => `/${path}` === elem.path)
	return item
}

export const getFlatTocs = (tocs: Toc[]) => {
	return tocs.map(elem => {
		const { data } = elem
		const flatToc = getFlatTableOfContent(data, [])
		return { ...elem, data: flatToc }
	})
}

interface GetPageInfoProps {
	flatTocs: FlatToc[]
	path: string
}

export const getPageInfo = ({ flatTocs, path }: GetPageInfoProps) => {
	const layers = flatTocs.map(flatToc => {
		const { info: layerInfo, data } = flatToc
		const itemInfo = getNavItemInfo(data, path)
		return { layerInfo, itemInfo }
	})

	const { type = 'html' } =
		layers.find(elem => elem.layerInfo.main)?.itemInfo || {}

	return { layers, type } as PageInfo
}

export const getFlatTableOfContent = (
	tableOfContent: TableOfContentType,
	parents: string[]
): FlatNavItem[] => {
	return tableOfContent
		.map((item: Folder | Page) => {
			const { type, title, id } = item
			if (type === 'folder') {
				return [
					{ id, type, title, path: '/' + [...parents, id].join('/') },
					...getFlatTableOfContent(item.content, [...parents, id])
				]
			} else {
				return { ...item, path: '/' + [...parents, id].join('/') }
			}
		})
		.flat()
}

export function parseSubs(text: string) {
	if (!text) return []
	const zeroPhrase = { id: '0', start: 0, end: 0 }
	const phrases = parseSubsExternal(text, false).map(elem => {
		const { id, start, end, body: text } = elem
		return { id, start, end, data: { text } }
	}) as Phrase[]
	return [zeroPhrase, ...phrases]
}

export function getPhrases(contentLayers: ContentLayer[]) {
	const mainLayer = contentLayers.find(elem => elem.info.main)
	const phrasesText = mainLayer?.data || ''
	const phrases = parseSubs(phrasesText)
	return phrases
}

interface ScrollPhrasesProps {
	phraseRefs: RefObject<HTMLDivElement[]>
	phrasesContainerRef: RefObject<HTMLIonContentElement>
	currentPhraseNum: number
	delta?: number
}

export const scrollPhrases = ({
	currentPhraseNum,
	delta = 0,
	phraseRefs,
	phrasesContainerRef
}: ScrollPhrasesProps) => {
	if (!phraseRefs.current) {
		return
	}
	if (currentPhraseNum <= 0 || currentPhraseNum >= phraseRefs.current.length) {
		return
	}
	// const { height: videoHeight = 0 } =
	// 	stickyPlayerContainerRef.current?.getBoundingClientRect() || {}
	const currentPhraseY = phraseRefs.current[currentPhraseNum].offsetTop
	phrasesContainerRef?.current?.scrollToPoint(
		null,
		currentPhraseY + delta, // - videoHeight
		1000
	)
}
