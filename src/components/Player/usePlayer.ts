import { useState, useEffect, RefObject, useContext } from 'react'
import { AppStateContext } from '../AppStateProvider'

interface PlayerState {
	currentTime: number
	currentTimePercentage: number
	duration: number
	remainedTime: number
	isPlaying: boolean
	isSeeking: boolean
}

const playerInitialState = {
	currentTime: 0,
	duration: 0,
	remainedTime: 0,
	currentTimePercentage: 0,
	isPlaying: false,
	isSeeking: false
}

const usePlayer = (
	mediaRef: RefObject<HTMLMediaElement>,
	mediaLink: string
) => {
	const [playerState, setPlayerState] =
		useState<PlayerState>(playerInitialState)

	const {
		methods: { update: updateAppState }
	} = useContext(AppStateContext)

	useEffect(() => {
		updateAppState({ loading: true })
		if (mediaRef.current) {
			mediaRef.current.onloadedmetadata = () => {
				updateAppState({ loading: false })
				setPlayerState(oldState => {
					const { duration } = mediaRef.current!
					return { ...playerInitialState, duration }
				})
			}
		}
	}, [mediaRef, mediaLink])

	const onTimeUpdate = () => {
		setPlayerState(oldState => {
			const { currentTime, duration } = mediaRef.current!
			const remainedTime = duration - currentTime || 0
			const currentTimePercentage = (currentTime / duration) * 100 || 0
			return { ...oldState, currentTime, remainedTime, currentTimePercentage }
		})
	}

	const onIonKnobMoveStart = ({ detail: { value } }: any) => {
		setPlayerState(oldState => ({ ...oldState, isSeeking: true }))
	}

	const onIonKnobMoveEnd = ({ detail: { value } }: any) => {
		setPlayerState(oldState => ({ ...oldState, isSeeking: false }))
		mediaRef.current!.currentTime = (value * playerState.duration) / 100
	}

	const onPlay = () => {
		setPlayerState(oldState => ({ ...oldState, isPlaying: true }))
	}

	const onPause = () => {
		setPlayerState(oldState => ({ ...oldState, isPlaying: false }))
	}

	const onPlayButtonClick = () => {
		mediaRef.current!.play()
	}

	const plus5 = () => {
		mediaRef.current!.currentTime += 5
	}
	const minus5 = () => {
		mediaRef.current!.currentTime -= 5
	}

	const onPauseButtonClick = () => {
		mediaRef.current!.pause()
	}

	const onRangeChange = ({ detail: { value } }: any) => {
		if (playerState.isSeeking) {
			mediaRef.current!.currentTime = (value * playerState.duration) / 100
		}
	}

	return {
		playerState,
		onTimeUpdate,
		onIonKnobMoveStart,
		onIonKnobMoveEnd,
		onPlay,
		onPause,
		onPlayButtonClick,
		onPauseButtonClick,
		onRangeChange,
		plus5,
		minus5
	}
}

export default usePlayer
