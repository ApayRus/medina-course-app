import { findCurrentPhraseNum } from 'frazy-parser'
import { useContext, useEffect, useRef, useState } from 'react'
import { PlayerContext } from '../Player/Provider'
import { Phrase, State, Methods, PhraseTr } from './types'

export const defaultState: State = {
	currentPhraseNum: 0,
	phrases: [],
	phrasesTr: []
}

const usePhrases = () => {
	const [state, setState] = useState<State>(defaultState)

	const phraseRefs = useRef<HTMLDivElement[]>([])

	const {
		state: { currentTime, playMode },
		methods: { setPlayMode },
		mediaRef
	} = useContext(PlayerContext)

	useEffect(() => {
		if (playMode === 'phrase') {
			const { phrases, currentPhraseNum } = state
			const currentPhrase = phrases[currentPhraseNum]
			const { end } = currentPhrase
			if (currentTime >= end && mediaRef.current) {
				mediaRef.current.pause()
				mediaRef.current.currentTime = end
				setPlayMode('all')
			}
		} else {
			const { phrases } = state
			const currentPhraseNum = findCurrentPhraseNum(phrases, currentTime)
			setState(oldState => ({ ...oldState, currentPhraseNum }))
		}
	}, [currentTime, state.phrases])

	const setPhrases = (phrases: Phrase[]) => {
		setState(oldState => ({ ...oldState, phrases }))
	}

	const setPhrasesTr = (phrasesTr: PhraseTr[]) => {
		setState(oldState => ({ ...oldState, phrasesTr }))
	}

	const setCurrentPhraseNum = (currentPhraseNum: number) => {
		setState(oldState => ({ ...oldState, currentPhraseNum }))
	}

	const playPhrase = (phraseNum: number) => {
		const { phrases } = state
		const currentPhrase = phrases[phraseNum]
		const { start, id } = currentPhrase
		if (mediaRef.current) {
			setCurrentPhraseNum(+id)
			setPlayMode('phrase')
			mediaRef.current.currentTime = start
			mediaRef.current.play()
		}
	}

	const methods: Methods = { setPhrases, setPhrasesTr, playPhrase }

	return { state, phraseRefs, methods }
}

export default usePhrases
