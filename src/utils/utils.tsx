import {
	FlatNavItem,
	FlatTableOfContentType,
	Folder,
	Page,
	TableOfContentType
} from '../components/Navigation/types'

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
