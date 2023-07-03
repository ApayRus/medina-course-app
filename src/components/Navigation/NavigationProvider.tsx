import React, { createContext, useState, useEffect, useContext } from 'react'
import { getTocs } from '../../api'
import { getFlatTocs, getPageInfo as getPageInfoUtil } from '../../utils/utils'
import { AppStateContext, LayerToDisplay } from '../AppStateProvider'
import { TableOfContentType, FlatNavItem, NavItemType } from './types'

export interface Toc {
	info: LayerToDisplay
	data: TableOfContentType
}

export interface FlatToc {
	info: LayerToDisplay
	data: FlatNavItem[]
}

interface State {
	tocs: Toc[]
	flatTocs: FlatToc[]
}

export interface PageInfo {
	layers: {
		layerInfo: LayerToDisplay
		itemInfo: FlatNavItem
	}[]
	type: NavItemType
}

interface Methods {
	getPageInfo: (path: string) => PageInfo
}

interface Props {
	children: JSX.Element | JSX.Element[]
}

interface ContextType {
	state: State
	methods: Methods
}

const defaultContextValue = {
	tocs: [],
	flatTocs: []
}

export const NavigationContext = createContext<ContextType>({} as ContextType)

const NavigationProvider: React.FC<Props> = ({ children }) => {
	const {
		methods: { update: updateAppState },
		state: { layers, configLoaded }
	} = useContext(AppStateContext)

	const [state, setState] = useState<State>(defaultContextValue)

	useEffect(() => {
		const readServerData = async () => {
			const tocs = await getTocs(layers)

			const flatTocs = getFlatTocs(tocs)

			setState(oldState => ({
				...oldState,
				tocs,
				flatTocs
			}))

			updateAppState({ tocsLoaded: true })
		}
		if (configLoaded) {
			readServerData()
		}

		return () => {}
	}, [configLoaded])

	const getPageInfo = (path: string) => {
		return getPageInfoUtil({ path, flatTocs: state.flatTocs })
	}

	const methods = { getPageInfo }

	return (
		<NavigationContext.Provider value={{ state, methods }}>
			{children}
		</NavigationContext.Provider>
	)
}

export default NavigationProvider
