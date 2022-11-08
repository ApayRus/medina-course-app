import React, { createContext, useState, useEffect } from 'react'
import { getBucketFiles } from '../supabase/utils'
import { TableOfContent } from './TableOfContent'

interface Props {
	children: JSX.Element | JSX.Element[]
}

interface NavigationContextType {
	tableOfContent: TableOfContent
	loaded: boolean
	currentPosition?: string
}

export const NavigationContext = createContext<NavigationContextType>({
	tableOfContent: [],
	loaded: false
})

const NavigationProvider: React.FC<Props> = ({ children }) => {
	const [navigationContext, setNavigationContext] =
		useState<NavigationContextType>({ tableOfContent: [], loaded: false })

	useEffect(() => {
		const readServerData = async () => {
			const tableOfContent = await getBucketFiles('audios', [])
			setNavigationContext({ tableOfContent, loaded: true })
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
