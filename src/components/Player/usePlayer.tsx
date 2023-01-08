import { RefObject, useState, useContext, useEffect } from 'react'
import { AppStateContext } from '../AppStateProvider'
import { State, Methods, EventHandlers } from './Provider'

const playerInitialState: State = {
	currentTime: 0,
	duration: 0,
	remainedTime: 0,
	currentTimePercentage: 0,
	isPlaying: false,
	isSeeking: false,
	mediaLink: '',
	playMode: 'all'
}

const usePlayer = (mediaRef: RefObject<HTMLMediaElement>) => {
	const [state, setState] = useState<State>(playerInitialState)

	const {
		methods: { update: updateAppState }
	} = useContext(AppStateContext)

	useEffect(() => {
		updateAppState({ loading: true })
		if (mediaRef.current) {
			mediaRef.current.onloadedmetadata = () => {
				updateAppState({ loading: false })
				setState(oldState => {
					const { duration } = mediaRef.current!
					return { ...oldState, duration }
				})
			}
		}
	}, [mediaRef, state.mediaLink])

	// MEDIA ELEMENT EVENT HANDLERS

	const onTimeUpdate = () => {
		setState(oldState => {
			const { currentTime, duration } = mediaRef.current!
			const remainedTime = duration - currentTime || 0
			const currentTimePercentage = (currentTime / duration) * 100 || 0
			return { ...oldState, currentTime, remainedTime, currentTimePercentage }
		})
	}

	const onPlay = () => {
		setState(oldState => ({ ...oldState, isPlaying: true }))
	}

	const onPause = () => {
		setState(oldState => ({ ...oldState, isPlaying: false }))
	}

	// ION-RANGE (SEEK BAR) EVENT HANDLERS

	const onRangeChange = ({ detail: { value } }: any) => {
		if (state.isSeeking) {
			mediaRef.current!.currentTime = (value * state.duration) / 100
		}
	}

	const onIonKnobMoveStart = ({ detail: { value } }: any) => {
		setState(oldState => ({ ...oldState, isSeeking: true }))
	}

	const onIonKnobMoveEnd = ({ detail: { value } }: any) => {
		setState(oldState => ({ ...oldState, isSeeking: false }))
		mediaRef.current!.currentTime = (value * state.duration) / 100
	}

	// METHODS

	const play = () => {
		mediaRef.current!.play()
	}

	const pause = () => {
		mediaRef.current!.pause()
	}

	const plus5 = () => {
		mediaRef.current!.currentTime += 5
	}
	const minus5 = () => {
		mediaRef.current!.currentTime -= 5
	}

	const setMediaLink = (mediaLink: string) => {
		setState(oldState => ({ ...oldState, mediaLink }))
	}

	const setPlayMode = (playMode: 'phrase' | 'all') => {
		setState(oldState => ({ ...oldState, playMode }))
	}

	const methods: Methods = {
		play,
		pause,
		plus5,
		minus5,
		setMediaLink,
		setPlayMode,
		onRangeChange,
		onIonKnobMoveStart,
		onIonKnobMoveEnd
	}

	const eventHandlers: EventHandlers = {
		onPlay,
		onPause,
		onTimeUpdate
	}

	return { state, mediaRef, methods, eventHandlers }
}

export default usePlayer
