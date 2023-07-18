import { IonButton, IonIcon } from '@ionic/react'
import {
	play as PlayIcon,
	pause as PauseIcon,
	playForward as PlayForwardIcon,
	playBack as PlayBackIcon
} from 'ionicons/icons'
import { useContext } from 'react'
import { PlayerContext } from 'react-wavesurfer-provider'
import { AppStateContext } from '../AppStateProvider'

const PlayerButtons = () => {
	const {
		state: { isPlaying, currentTime },
		methods: playerMethods
	} = useContext(PlayerContext)

	const {
		methods: { getSetting, getDictationSettings }
	} = useContext(AppStateContext)

	const dictationMode = getSetting(`player/dictationMode`) as boolean

	const minus5 = () => {
		playerMethods.setCurrentTime(currentTime - 5)
	}
	const plus5 = () => {
		playerMethods.setCurrentTime(currentTime + 5)
	}

	const play = () => {
		if (dictationMode) {
			const dictationSettings = getDictationSettings()
			playerMethods.playDictation(dictationSettings)
		} else {
			playerMethods.play()
		}
	}

	return (
		<>
			<IonButton size='small' onClick={minus5} fill='clear'>
				<IonIcon icon={PlayBackIcon}></IonIcon>
			</IonButton>
			{isPlaying ? (
				<IonButton size='small' onClick={playerMethods.pause} fill='clear'>
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
