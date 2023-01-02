// import { TableOfContent, File, Folder } from '../components/TableOfContent'
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
