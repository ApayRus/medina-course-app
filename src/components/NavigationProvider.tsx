import React, { createContext, useState, useEffect } from 'react'
import { getBucketFiles } from '../supabase/utils'
import { Folder, File, TableOfContentType } from './TableOfContent'

interface Props {
	children: JSX.Element | JSX.Element[]
}

export interface NavElementType {
	type: 'folder' | 'file'
	name: string
	path: string
}

export type FlatTableOfContentType = NavElementType[]

interface NavigationContextType {
	tableOfContent: TableOfContentType
	flatTableOfContent: Array<NavElementType>
	loaded: boolean
	currentPage: string
	setCurrentPage: (path: string) => void
}

const defaultContextValue = {
	tableOfContent: [],
	flatTableOfContent: [],
	loaded: false,
	currentPage: '',
	setCurrentPage: (path: string) => {}
}

export const NavigationContext =
	createContext<NavigationContextType>(defaultContextValue)

const getFlatTableOfContent = (
	tableOfContent: TableOfContentType,
	parents: string[]
): NavElementType[] => {
	return tableOfContent
		.map((item: Folder | File) => {
			const { type, name } = item
			if (type === 'folder') {
				return [
					{ type, name, path: [...parents, name].join('/') },
					...getFlatTableOfContent(item.content, [...parents, name])
				]
			} else {
				return { ...item, path: [...parents, name].join('/') }
			}
		})
		.flat()
}

const NavigationProvider: React.FC<Props> = ({ children }) => {
	const [navigationContext, setNavigationContext] =
		useState<NavigationContextType>(defaultContextValue)

	const setCurrentPage = (path: string) => {
		setNavigationContext(oldState => ({ ...oldState, currentPage: path }))
	}

	useEffect(() => {
		const readServerData = async () => {
			const tableOfContent = await getBucketFiles('audios', [])
			const flatTableOfContent = getFlatTableOfContent(tableOfContent, [])
			setNavigationContext({
				tableOfContent,
				flatTableOfContent,
				loaded: true,
				currentPage: '',
				setCurrentPage
			})
		}
		readServerData()

		return () => {}
	}, [])

	return (
		<NavigationContext.Provider value={navigationContext}>
			{children}
		</NavigationContext.Provider>
	)
}
export default NavigationProvider
