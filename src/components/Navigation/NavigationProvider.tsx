import React, { createContext, useState, useEffect, useContext } from 'react'
import { getToc, getTocs } from '../../api'
import { getFlatTableOfContent } from '../../utils/utils'
import { AppStateContext } from '../AppStateProvider'
import { TableOfContentType, FlatNavItem } from './types'

interface State {
	tableOfContent: TableOfContentType
	flatTableOfContent: Array<FlatNavItem>
	flatTableOfContentTr: Array<FlatNavItem>
	loaded: boolean
}

interface Props {
	children: JSX.Element | JSX.Element[]
}

interface ContextType {
	state: State
	// methods: Methods
}

const defaultContextValue = {
	tableOfContent: [],
	flatTableOfContent: [],
	flatTableOfContentTr: [],
	loaded: false
}

export const NavigationContext = createContext<ContextType>({
	state: defaultContextValue
})

const NavigationProvider: React.FC<Props> = ({ children }) => {
	const {
		methods: { update: updateAppState },
		state: { trLang, layers, configLoaded }
	} = useContext(AppStateContext)

	const [state, setState] = useState<State>(defaultContextValue)

	useEffect(() => {
		const readServerData = async () => {
			const toc = await getToc()
			const tocs = await getTocs(layers)
			updateAppState({ tocsLoaded: true })

			const tocTr = await getToc(trLang)

			const tableOfContent = toc
			const flatTableOfContent = getFlatTableOfContent(tableOfContent, [])
			const flatTableOfContentTr = getFlatTableOfContent(tocTr, [])
			setState(oldState => ({
				...oldState,
				tableOfContent,
				flatTableOfContent,
				flatTableOfContentTr,
				loaded: true
			}))
		}
		if (configLoaded) {
			readServerData()
		}

		return () => {}
	}, [configLoaded])

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
