import { IonRange } from '@ionic/react'

interface Props {
	onRangeChange: (props: any) => void
	onIonKnobMoveStart: (props: any) => void
	onIonKnobMoveEnd: (props: any) => void
	currentTimePercentage: number
}

const ProgressBar: React.FC<Props> = ({
	onIonKnobMoveEnd,
	onIonKnobMoveStart,
	onRangeChange,
	currentTimePercentage
}) => {
	return (
		<IonRange
			style={{
				'--height': '20px',
				'--knob-size': '10px',
				padding: 0,
				paddingInline: 5
			}}
			onIonKnobMoveStart={onIonKnobMoveStart}
			onIonKnobMoveEnd={onIonKnobMoveEnd}
			onIonChange={onRangeChange}
			value={currentTimePercentage}
		></IonRange>
	)
}

export default ProgressBar
