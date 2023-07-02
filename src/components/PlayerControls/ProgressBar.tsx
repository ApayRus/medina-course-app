import { IonRange } from '@ionic/react'
import { useContext } from 'react'
import { PlayerContext } from 'react-wavesurfer-provider'

const ProgressBar = () => {
	const {
		state: { currentTime, duration },
		methods: { setCurrentTime }
	} = useContext(PlayerContext)

	const currentTimePercentage = (currentTime / duration) * 100 || 0

	return (
		<IonRange
			style={{
				'--height': '20px',
				'--knob-size': '10px',
				padding: 0,
				paddingInline: 5
			}}
			// onIonKnobMoveStart={onIonKnobMoveStart}
			// onIonKnobMoveEnd={onIonKnobMoveEnd}
			onIonChange={({ detail: { value } }: any) => {
				const currentTime = (value * duration) / 100

				setCurrentTime(currentTime)
			}}
			value={currentTimePercentage}
		></IonRange>
	)
}

export default ProgressBar
