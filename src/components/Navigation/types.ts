import { FlatToc, Toc } from './NavigationProvider'

export type NavItemType = 'folder' | 'html' | 'richMedia'

export type IconName =
	| 'bookOutline'
	| 'homeOutline'
	| 'documentTextOutline'
	| 'musicalNoteOutline'
	| 'informationCircleOutline'

export interface Page {
	id: string
	type: Exclude<NavItemType, 'folder'>
	title: string
	mediaLink?: string
	icon?: IconName
}

export type IconMap = {
	[key in NavItemType]: IconName
}

export interface Folder {
	id: string
	type: 'folder'
	title: string
	icon?: IconName
	content: Array<Page | Folder>
}

export type TableOfContentType = Array<Page | Folder> | []

export interface TableOfContentProps {
	content: TableOfContentType
	tocs: Toc[]
	flatTocs: FlatToc[]
	parents: string[]
	openedFolders: string[]
}

export interface FlatNavItem {
	id: string
	type: NavItemType
	title: string
	path: string
	mediaLink?: string
}

export type FlatTableOfContentType = FlatNavItem[]
