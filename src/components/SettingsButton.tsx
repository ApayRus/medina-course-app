import React, { useContext } from 'react'
import { settingsOutline as SettingsIcon } from 'ionicons/icons'
import { IonButton, IonIcon } from '@ionic/react'
import { ModalContext } from './Modals/ModalsProvider'

interface Props {
	color?: string
}

const SettingsButton = (props: Props) => {
	const {
		methods: { openModal }
	} = useContext(ModalContext)

	return (
		<IonButton
			{...props}
			onClick={() =>
				openModal({ contentComponent: 'Config', title: 'Settings' })
			}
		>
			<IonIcon icon={SettingsIcon}></IonIcon>
		</IonButton>
	)
}

export default SettingsButton
