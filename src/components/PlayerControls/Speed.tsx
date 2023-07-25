import { IonSelect, IonSelectOption } from '@ionic/react'
import { useContext, useEffect } from 'react'
import { PlayerContext } from 'react-wavesurfer-provider'
import { AppStateContext } from '../AppStateProvider'

const Speed = () => {
	const { methods: playerMethods } = useContext(PlayerContext)
	const {
		methods: { updateSetting, getSetting }
	} = useContext(AppStateContext)
	const options = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]
	const value = getSetting('player/playbackRate') as number
	const updatePlaybackRate = (value: number) => {
		playerMethods.setPlaybackRate(value)
		updateSetting({ path: 'player/playbackRate', value })
	}
	useEffect(() => {
		updatePlaybackRate(value)
	}, [value])
	return (
		<div className='playbackRate'>
			<IonSelect
				value={value}
				interface='popover'
				onIonChange={event => {
					const { value } = event.target
					updatePlaybackRate(value)
				}}
			>
				{options.map(elem => (
					<IonSelectOption
						key={`speed-option-${elem}`}
						value={elem}
					>{`x${elem}`}</IonSelectOption>
				))}
			</IonSelect>
		</div>
	)
}

export default Speed
