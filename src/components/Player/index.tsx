import { IonButton, IonIcon, IonRange, IonText } from '@ionic/react'
import {
	play as PlayIcon,
	pause as PauseIcon,
	playForward as PlayForwardIcon,
	playBack as PlayBackIcon
} from 'ionicons/icons'
import { useRef } from 'react'
import styles from './Player.module.css'
import usePlayer from './usePlayer'
import { formatSecondsToTime } from 'frazy-parser'

interface Props {
	mediaLink: string
}

const Player = ({ mediaLink }: Props) => {
	const mediaRef = useRef<HTMLMediaElement>(null)

	const {
		playerState,
		onTimeUpdate,
		onPlay,
		onPause,
		onPauseButtonClick,
		onPlayButtonClick,
		onIonKnobMoveEnd,
		onIonKnobMoveStart,
		onRangeChange,
		plus5,
		minus5
	} = usePlayer(mediaRef)

	return (
		<div className={styles.playerContainer}>
			<audio
				ref={mediaRef}
				onTimeUpdate={onTimeUpdate}
				// controls
				onPlay={onPlay}
				onPause={onPause}
				src={mediaLink}
			></audio>

			<div>
				<IonRange
					onIonKnobMoveStart={onIonKnobMoveStart}
					onIonKnobMoveEnd={onIonKnobMoveEnd}
					onIonChange={onRangeChange}
					value={playerState.currentTimePercentage}
				></IonRange>
				<div className={styles.timeText}>
					<IonText color='primary' title='current time'>
						{formatSecondsToTime(playerState.currentTime)}
					</IonText>
					<IonText color='primary' title='remained'>
						{'-' + formatSecondsToTime(playerState.remainedTime)}
					</IonText>
					<IonText color='primary' title='duration'>
						{formatSecondsToTime(playerState.duration)}
					</IonText>
				</div>
				<div className={styles.controls}>
					<IonButton size='small' onClick={minus5}>
						<IonIcon icon={PlayBackIcon}></IonIcon>
					</IonButton>
					{playerState.isPlaying ? (
						<IonButton size='small' onClick={onPauseButtonClick}>
							<IonIcon icon={PauseIcon}></IonIcon>
						</IonButton>
					) : (
						<IonButton size='small' onClick={onPlayButtonClick}>
							<IonIcon icon={PlayIcon}></IonIcon>
						</IonButton>
					)}
					<IonButton size='small' onClick={plus5}>
						<IonIcon icon={PlayForwardIcon}></IonIcon>
					</IonButton>
				</div>
			</div>

			{/* <div>{JSON.stringify(playerState, null, 2)}</div> */}
		</div>
	)
}

export default Player
