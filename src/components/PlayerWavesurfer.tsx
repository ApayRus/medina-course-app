import React, { useContext } from 'react'
import { PlayerContext } from 'react-wavesurfer-provider'

export default function Player2() {
	const { state: playerState } = useContext(PlayerContext)

	return (
		<div style={{ display: 'none' }}>
			<audio id='mediaElement' src={playerState.mediaLink} />
			<div id='waveformContainer' />
			<div id='timelineContainer' />
		</div>
	)
}
