import {
	IonButton,
	IonButtons,
	IonFooter,
	IonIcon,
	IonMenuButton,
	IonToolbar,
	useIonRouter
} from '@ionic/react'
import {
	chevronBack as PreviousChapterIcon,
	chevronForward as NextChapterIcon
} from 'ionicons/icons'
import { useContext } from 'react'
import { FlatTableOfContentType, NavigationContext } from './NavigationProvider'
import styles from '../pages/Page.module.css'

const getNextPagePath = (
	flatTableOfContent: FlatTableOfContentType,
	currentPage: string
) => {
	const index = flatTableOfContent.findIndex(elem => elem.path === currentPage)
	return flatTableOfContent[index + 1]?.path || ''
}

const getPrevPagePath = (
	flatTableOfContent: FlatTableOfContentType,
	currentPage: string
) => {
	const index = flatTableOfContent.findIndex(elem => elem.path === currentPage)
	return flatTableOfContent[index - 1]?.path || ''
}

const Footer = () => {
	const { flatTableOfContent, currentPage } = useContext(NavigationContext)
	const router = useIonRouter()

	const goNext = () => {
		const path = getNextPagePath(flatTableOfContent, currentPage)
		router.push(`/page/${path}`)
	}

	const goPrev = () => {
		const path = getPrevPagePath(flatTableOfContent, currentPage)
		router.push(`/page/${path}`)
	}

	return (
		<IonFooter>
			<IonToolbar>
				<IonButtons slot='start'>
					<IonButton onClick={goPrev}>
						<IonIcon size='large' color='primary' icon={PreviousChapterIcon} />
					</IonButton>
				</IonButtons>
				<IonButtons className={styles.menuButtonContainer}>
					<IonMenuButton color='primary' />
				</IonButtons>
				<IonButtons slot='end'>
					<IonButton onClick={goNext}>
						<IonIcon size='large' color='primary' icon={NextChapterIcon} />
					</IonButton>
				</IonButtons>
			</IonToolbar>
		</IonFooter>
	)
}

export default Footer
