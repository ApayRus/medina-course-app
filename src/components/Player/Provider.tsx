import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { AppStateContext } from '../AppStateProvider'

interface State {
	currentTime: number
	currentTimePercentage: number
	duration: number
	remainedTime: number
	isPlaying: boolean
	isSeeking: boolean
	mediaLink: string
}

/* 
type IonRangeEvent = {
	detail: { value: number }
} 
*/

interface Methods {
	play: () => void
	pause: () => void
	plus5: () => void
	minus5: () => void
	setMediaLink: (mediaLink: string) => void
	onRangeChange: (props: any) => void
	onIonKnobMoveStart: (props: any) => void
	onIonKnobMoveEnd: (props: any) => void
}

interface ContextType {
	state: State
	methods: Methods
}

interface Props {
	children: JSX.Element
}

const playerInitialState = {
	currentTime: 0,
	duration: 0,
	remainedTime: 0,
	currentTimePercentage: 0,
	isPlaying: false,
	isSeeking: false,
	mediaLink: ''
}

const defaultContextValue = {} as ContextType

export const PlayerContext = createContext<ContextType>(defaultContextValue)

const PlayerProvider: React.FC<Props> = ({ children }) => {
	const [state, setState] = useState<State>(playerInitialState)

	const mediaRef = useRef<HTMLMediaElement>(null)

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

	const methods = {
		play,
		pause,
		plus5,
		minus5,
		setMediaLink,
		onRangeChange,
		onIonKnobMoveStart,
		onIonKnobMoveEnd
	}

	const contextValue = { state, methods }

	return (
		<PlayerContext.Provider value={contextValue}>
			<audio
				ref={mediaRef}
				onTimeUpdate={onTimeUpdate}
				// controls
				onPlay={onPlay}
				onPause={onPause}
				src={state.mediaLink}
			></audio>
			{children}
		</PlayerContext.Provider>
	)
}

export default PlayerProvider
