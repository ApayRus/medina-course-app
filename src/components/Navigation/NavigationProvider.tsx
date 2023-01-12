import React, { createContext, useState, useEffect, useContext } from 'react'
import { getToc } from '../../api'
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
		state: { trLang }
	} = useContext(AppStateContext)

	const [state, setState] = useState<State>(defaultContextValue)

	useEffect(() => {
		const readServerData = async () => {
			const toc = await getToc()
			const tocTr = await getToc(trLang)
			// const [toc, tocTr] = await Promise.all([
			// 	getToc(),
			// 	getToc(trLang)
			// ])
			console.log(toc)
			// console.log(tocTr)
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
