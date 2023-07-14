import React, { createContext, useState, useEffect, useContext } from 'react'
import { getTocs } from '../../api'
import {
	getFlatTocs,
	getPageInfo as getPageInfoUtil,
	getPageNeighbors as getPageNeighborsUtil
} from '../../utils/utils'
import { AppStateContext, SettingsItem } from '../AppStateProvider'
import { TableOfContentType, FlatNavItem, NavItemType } from './types'
import { useIonRouter } from '@ionic/react'
import { useLocation } from 'react-router'

export interface Toc {
	info: SettingsItem
	data: TableOfContentType
}

export interface FlatToc {
	info: SettingsItem
	data: FlatNavItem[]
}

interface State {
	tocs: Toc[]
	flatTocs: FlatToc[]
	prevItem?: FlatNavItem
	nextItem?: FlatNavItem
}

export interface PageInfo {
	layers: {
		layerInfo: SettingsItem
		itemInfo: FlatNavItem
	}[]
	type: NavItemType
}

interface Methods {
	getPageInfo: (path: string) => PageInfo
	goPrev: () => void
	goNext: () => void
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
		state: { settings, configLoaded, tocsLoaded }
	} = useContext(AppStateContext)

	const router = useIonRouter()

	const { pathname: path } = useLocation()

	const [state, setState] = useState<State>(defaultContextValue)

	useEffect(() => {
		const readServerData = async () => {
			const tocs = await getTocs(settings)

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

	useEffect(() => {
		if (tocsLoaded && path) {
			const { prevItem, nextItem } = getPageNeighborsUtil(
				state.flatTocs[0]?.data,
				path
			)
			setState(oldState => ({ ...oldState, prevItem, nextItem }))
		}
	}, [tocsLoaded, path])

	const getPageInfo = (path: string) => {
		return getPageInfoUtil({ path, flatTocs: state.flatTocs })
	}

	const goNext = () => {
		if (state.nextItem) {
			router.push(state.nextItem.path)
		}
	}

	const goPrev = () => {
		if (state.prevItem) {
			router.push(state.prevItem.path)
		}
	}

	const methods = { getPageInfo, goNext, goPrev }

	return (
		<NavigationContext.Provider value={{ state, methods }}>
			{children}
		</NavigationContext.Provider>
	)
}

export default NavigationProvider
