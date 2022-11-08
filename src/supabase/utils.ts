// import { TableOfContent, File, Folder } from '../components/TableOfContent'
import supabase from './client'

export const getBucketFiles = async (bucketName: string, dirs: string[]) => {
	const path = dirs.join('/')

	const { data: folderContent } = await supabase.storage
		.from(bucketName)
		.list(path, { sortBy: { column: 'name', order: 'asc' } })

	if (!folderContent) return []

	const foldersRaw = folderContent.filter(elem => !elem.id) // supabase returns folders w\o id, only with name
	const filesRaw = folderContent.filter(elem => elem.id)

	const files = filesRaw.map(elem => ({ name: elem.name, type: 'file' }))

	const folders: any = await Promise.all(
		foldersRaw.map(async elem => {
			const { name } = elem
			const content = await getBucketFiles(bucketName, [...dirs, name])
			return {
				name,
				type: 'folder',
				content
			}
		})
	)

	return [...files, ...folders]
}
