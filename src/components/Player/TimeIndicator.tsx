import { IonText } from '@ionic/react'
import { formatSecondsToTime } from 'frazy-parser'

interface Props {
	currentTime: number
	remainedTime: number
	duration: number
}

const TimeIndicator: React.FC<Props> = ({
	currentTime,
	remainedTime,
	duration
}) => {
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
