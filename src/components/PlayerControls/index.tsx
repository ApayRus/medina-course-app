import React from 'react'
import ProgressBar from './ProgressBar'
import PlayerButtons from './Buttons'
import TimeIndicator from './TimeIndicator'
import Speed from './Speed'

const PlayerControls = () => {
	return (
		<div>
			<ProgressBar />
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-around',
					alignItems: 'center'
				}}
			>
				<TimeIndicator />
				<Speed />
				<PlayerButtons />
			</div>
		</div>
	)
}

export default PlayerControls
