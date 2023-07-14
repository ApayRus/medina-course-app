import React, { useContext } from 'react'
import { PlayerContext } from 'react-wavesurfer-provider'
import { AppStateContext } from './AppStateProvider'

export default function PlayerWavesurfer() {
	const { state: playerState } = useContext(PlayerContext)
	const {
		methods: { getSetting }
	} = useContext(AppStateContext)

	const showWaveform = getSetting('player/showWaveform')

	return (
		<div style={showWaveform ? {} : { display: 'none' }}>
			<audio id='mediaElement' src={playerState.mediaLink} />
			<div id='waveformContainer' />
			<div id='timelineContainer' />
		</div>
	)
}
