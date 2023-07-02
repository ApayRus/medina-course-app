import { IonButton, IonIcon } from '@ionic/react'
import {
	play as PlayIcon,
	pause as PauseIcon,
	playForward as PlayForwardIcon,
	playBack as PlayBackIcon
} from 'ionicons/icons'
import { useContext } from 'react'
import { PlayerContext } from 'react-wavesurfer-provider'

const PlayerButtons = () => {
	const {
		state: { isPlaying, currentTime },
		methods
	} = useContext(PlayerContext)

	const minus5 = () => {
		methods.setCurrentTime(currentTime - 5)
	}
	const plus5 = () => {
		methods.setCurrentTime(currentTime + 5)
	}

	return (
		<>
			<IonButton size='small' onClick={minus5} fill='clear'>
				<IonIcon icon={PlayBackIcon}></IonIcon>
			</IonButton>
			{isPlaying ? (
				<IonButton size='small' onClick={methods.pause} fill='clear'>
					<IonIcon icon={PauseIcon}></IonIcon>
				</IonButton>
			) : (
				<IonButton size='small' onClick={methods.play} fill='clear'>
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
