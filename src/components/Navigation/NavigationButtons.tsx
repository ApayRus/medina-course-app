import { IonButton, IonIcon, IonMenuButton, IonSpinner } from '@ionic/react'
import {
	chevronBack as PreviousChapterIcon,
	chevronForward as NextChapterIcon
} from 'ionicons/icons'
import { useContext } from 'react'
import { NavigationContext } from './NavigationProvider'
import SettingsButton from '../SettingsButton'

const NavigationButtons = () => {
	const {
		state: { flatTocs, prevItem, nextItem },
		methods: { goNext, goPrev }
	} = useContext(NavigationContext)

	const flatTableOfContent = flatTocs?.[0]?.data

	return flatTableOfContent ? (
		<>
			{prevItem && (
				<IonButton onClick={goPrev}>
					<IonIcon size='large' color='primary' icon={PreviousChapterIcon} />
				</IonButton>
			)}
			<SettingsButton color='primary' />
			<IonMenuButton color='primary' />
			{nextItem && (
				<IonButton onClick={goNext}>
					<IonIcon size='large' color='primary' icon={NextChapterIcon} />
				</IonButton>
			)}
		</>
	) : (
		<IonSpinner name='dots' />
	)
}

export default NavigationButtons
