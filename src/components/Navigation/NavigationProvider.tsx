import React, { createContext, useState, useEffect, useContext } from 'react'
import { getToc } from '../../api'
import { getFlatTableOfContent } from '../../utils/utils'
import { AppStateContext } from '../AppStateProvider'
import { TableOfContentType, FlatNavItem } from './types'

interface State {
	tableOfContent: TableOfContentType
	flatTableOfContent: Array<FlatNavItem>
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
	loaded: false
}

export const NavigationContext = createContext<ContextType>({
	state: defaultContextValue
})

const NavigationProvider: React.FC<Props> = ({ children }) => {
	const {
		methods: { update: updateAppState },
		state: { translationLanguage }
	} = useContext(AppStateContext)

	const [state, setState] = useState<State>(defaultContextValue)

	useEffect(() => {
		const readServerData = async () => {
			const toc = await getToc()
			// const [toc, tocTr] = await Promise.all([
			// 	getToc(),
			// 	getToc(translationLanguage)
			// ])
			console.log(toc)
			// console.log(tocTr)
			const tableOfContent = toc
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
