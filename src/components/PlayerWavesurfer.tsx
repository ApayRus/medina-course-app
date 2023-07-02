import React, { useContext, useEffect } from 'react'
import { PlayerContext } from 'react-wavesurfer-provider'

interface Props {
	mediaLink: string
}

export default function Player2() {
	const { state: playerState, methods } = useContext(PlayerContext)

	/* 	useEffect(() => {
		methods.setMediaLink(mediaLink)
	}, [mediaLink]) */

	return (
		<div /* style={{ display: 'none' }} */>
			<audio id='mediaElement' src={playerState.mediaLink} />
			<div id='waveformContainer' />
			<div id='timelineContainer' />
		</div>
	)
}
