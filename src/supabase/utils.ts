// import { TableOfContent, File, Folder } from '../components/TableOfContent'
import { FlatTableOfContentType } from '../components/NavigationProvider'
import { Folder, Page, TableOfContentType } from '../components/TableOfContent'
import supabase from './client'

export const getBucketFiles = async (
	bucketName: string,
	dirs: string[]
): Promise<TableOfContentType> => {
	const path = dirs.join('/')

	const { data: folderContent } = await supabase.storage
		.from(bucketName)
		.list(path, { sortBy: { column: 'name', order: 'asc' }, limit: 1000 })

	if (!folderContent) return []

	const foldersRaw = folderContent.filter(elem => !elem.id) // supabase returns folders w\o id, only with name
	const filesRaw = folderContent.filter(elem => elem.id)

	const files: Page[] = filesRaw.map(elem => {
		return {
			type: 'file',
			path: elem.name,
			title: elem.name
		}
	})

	const folders: Folder[] = await Promise.all(
		foldersRaw.map(async elem => {
			const { name } = elem
			const content = await getBucketFiles(bucketName, [...dirs, name])
			return {
				type: 'folder',
				title: name,
				path: name,
				content
			}
		})
	)

	return [...files, ...folders]
}

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
