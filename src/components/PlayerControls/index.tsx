import React from 'react'
import ProgressBar from './ProgressBar'
import PlayerButtons from './Buttons'
import TimeIndicator from './TimeIndicator'

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
				<PlayerButtons />
			</div>
		</div>
	)
}

export default PlayerControls
