import { useContext } from 'react'
import { PlayerContext } from './Provider'
import PlayerButtons from './Buttons'
import ProgressBar from './ProgressBar'
import TimeIndicator from './TimeIndicator'

const Player = () => {
	const { state: playerState, methods } = useContext(PlayerContext)

	return (
		<div className=''>
			<ProgressBar {...playerState} {...methods} />
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center'
				}}
			>
				<TimeIndicator {...playerState} />
				<PlayerButtons {...playerState} {...methods} />
			</div>
		</div>
	)
}

export default Player
