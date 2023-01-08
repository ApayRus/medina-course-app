import { createContext, RefObject, useRef } from 'react'
import usePlayer from './usePlayer'

export interface State {
	currentTime: number
	currentTimePercentage: number
	duration: number
	remainedTime: number
	isPlaying: boolean
	isSeeking: boolean
	mediaLink: string
	playMode: 'phrase' | 'all'
}

// type IonRangeEvent = { detail: { value: number } }

export interface Methods {
	play: () => void
	pause: () => void
	plus5: () => void
	minus5: () => void
	setMediaLink: (mediaLink: string) => void
	setPlayMode: (playMode: 'phrase' | 'all') => void
	onRangeChange: (props: any) => void
	onIonKnobMoveStart: (props: any) => void
	onIonKnobMoveEnd: (props: any) => void
}

export interface EventHandlers {
	onPlay: () => void
	onPause: () => void
	onTimeUpdate: () => void
}

interface ContextType {
	state: State
	methods: Methods
	mediaRef: RefObject<HTMLMediaElement>
}

interface Props {
	children: JSX.Element
}

const defaultContextValue = {} as ContextType

export const PlayerContext = createContext<ContextType>(defaultContextValue)

const PlayerProvider: React.FC<Props> = ({ children }) => {
	const mediaRef = useRef<HTMLMediaElement>(null)

	const {
		state,
		methods,
		eventHandlers: { onPlay, onPause, onTimeUpdate }
	} = usePlayer(mediaRef)

	const contextValue = { state, methods, mediaRef }

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
