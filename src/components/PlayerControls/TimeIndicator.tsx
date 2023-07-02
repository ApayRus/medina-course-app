import { IonText } from '@ionic/react'
import { formatSecondsToTime } from 'frazy-parser'
import { useContext } from 'react'
import { PlayerContext } from 'react-wavesurfer-provider'

const TimeIndicator = () => {
	const {
		state: { duration, currentTime }
	} = useContext(PlayerContext)

	const remainedTime = duration - currentTime || 0

	return (
		<>
			<IonText color='primary' title='current time'>
				{formatSecondsToTime(currentTime)}
			</IonText>
			<IonText color='primary' title='remained'>
				{'-' + formatSecondsToTime(remainedTime)}
			</IonText>
			<IonText color='primary' title='duration'>
				{formatSecondsToTime(duration)}
			</IonText>
		</>
	)
}

export default TimeIndicator
