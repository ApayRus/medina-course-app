import { createContext, RefObject } from 'react'
import usePhrases from './usePhrases'
import { State, Methods } from './types'
import PhrasesBlock from '.'

interface ContextType {
	state: State
	methods: Methods
	phraseRefs: RefObject<HTMLDivElement[]>
	phrasesContainerRef: RefObject<HTMLIonContentElement>
}

interface Props {
	children: JSX.Element
}

const defaultContextValue = {} as ContextType

export const PhrasesContext = createContext<ContextType>(defaultContextValue)

const PhrasesProvider: React.FC<Props> = ({ children }) => {
	// const mediaRef = useRef<HTMLMediaElement>(null)

	return (
		<PhrasesContext.Provider value={usePhrases()}>
			<PhrasesBlock />
			{children}
		</PhrasesContext.Provider>
	)
}

export default PhrasesProvider
