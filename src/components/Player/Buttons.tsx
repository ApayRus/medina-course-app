import { IonButton, IonIcon } from '@ionic/react'
import {
	play as PlayIcon,
	pause as PauseIcon,
	playForward as PlayForwardIcon,
	playBack as PlayBackIcon
} from 'ionicons/icons'

interface Props {
	play: () => void
	pause: () => void
	plus5: () => void
	minus5: () => void
	isPlaying: boolean
}

const PlayerButtons: React.FC<Props> = ({
	play,
	pause,
	plus5,
	minus5,
	isPlaying
}) => {
	return (
		<>
			<IonButton size='small' onClick={minus5} fill='clear'>
				<IonIcon icon={PlayBackIcon}></IonIcon>
			</IonButton>
			{isPlaying ? (
				<IonButton size='small' onClick={pause} fill='clear'>
					<IonIcon icon={PauseIcon}></IonIcon>
				</IonButton>
			) : (
				<IonButton size='small' onClick={play} fill='clear'>
					<IonIcon icon={PlayIcon}></IonIcon>
				</IonButton>
			)}
			<IonButton size='small' onClick={plus5} fill='clear'>
				<IonIcon icon={PlayForwardIcon}></IonIcon>
			</IonButton>
		</>
	)
}

export default PlayerButtons
