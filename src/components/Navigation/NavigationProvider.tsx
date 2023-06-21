import React, { createContext, useState, useEffect, useContext } from 'react'
import { getTocs } from '../../api'
import { getFlatTableOfContent } from '../../utils/utils'
import { AppStateContext, LayerToDisplay } from '../AppStateProvider'
import { TableOfContentType, FlatNavItem } from './types'

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

interface Props {
	children: JSX.Element | JSX.Element[]
}

interface ContextType {
	state: State
	// methods: Methods
}

const defaultContextValue = {
	tocs: [],
	flatTocs: []
}

export const NavigationContext = createContext<ContextType>({
	state: defaultContextValue
})

const getFlatTocs = (tocs: Toc[]) => {
	return tocs.map(elem => {
		const { data } = elem
		const flatToc = getFlatTableOfContent(data, [])
		return { ...elem, data: flatToc }
	})
}

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

	return (
		<NavigationContext.Provider value={{ state /* , methods */ }}>
			{children}
		</NavigationContext.Provider>
	)
}

export default NavigationProvider
