import React, { createContext, useState, useEffect, useContext } from 'react'
import { getBucketFiles } from '../supabase/utils'
import { AppStateContext } from './AppStateProvider'
import { Folder, NavItemType, Page, TableOfContentType } from './TableOfContent'

interface Props {
	children: JSX.Element | JSX.Element[]
}

export interface FlatNavItem {
	type: NavItemType
	title: string
	path: string
}

export type FlatTableOfContentType = FlatNavItem[]

interface State {
	tableOfContent: TableOfContentType
	flatTableOfContent: Array<FlatNavItem>
	loaded: boolean
}

interface ContextType {
	state: State
	// methods: Methods
}

const defaultContextValue = {
	tableOfContent: [],
	flatTableOfContent: [],
	loaded: false
}

export const NavigationContext = createContext<ContextType>({
	state: defaultContextValue
})

const getFlatTableOfContent = (
	tableOfContent: TableOfContentType,
	parents: string[]
): FlatNavItem[] => {
	return tableOfContent
		.map((item: Folder | Page) => {
			const { type, title, path } = item
			if (type === 'folder') {
				return [
					{ type, title, path: '/' + [...parents, path].join('/') },
					...getFlatTableOfContent(item.content, [...parents, path])
				]
			} else if (type === 'file') {
				return { ...item, path: '/media/' + [...parents, path].join('/') }
			} else {
				return { ...item, path: '/' + [...parents, path].join('/') }
			}
		})
		.flat()
}

const NavigationProvider: React.FC<Props> = ({ children }) => {
	const {
		methods: { update: updateAppState }
	} = useContext(AppStateContext)

	const [state, setState] = useState<State>(defaultContextValue)

	useEffect(() => {
		const readServerData = async () => {
			const bucketTOC = await getBucketFiles('audios', [])
			const localTOC: TableOfContentType = [
				{ type: 'page', title: 'home', path: '', icon: 'homeOutline' },
				{
					type: 'page',
					title: 'about',
					path: 'about',
					icon: 'informationCircleOutline'
				}
			]
			const tableOfContent = [...localTOC, ...bucketTOC]
			const flatTableOfContent = getFlatTableOfContent(tableOfContent, [])
			setState(oldState => ({
				...oldState,
				tableOfContent,
				flatTableOfContent,
				loaded: true
			}))
		}
		readServerData()

		return () => {}
	}, [])

	useEffect(() => {
		updateAppState({ loading: !state.loaded })
	}, [state.loaded])

	return (
		<NavigationContext.Provider value={{ state /* , methods */ }}>
			{children}
		</NavigationContext.Provider>
	)
}

export default NavigationProvider
