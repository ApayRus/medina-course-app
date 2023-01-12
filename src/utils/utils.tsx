import { FlatTableOfContentType } from '../components/NavigationProvider'

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
