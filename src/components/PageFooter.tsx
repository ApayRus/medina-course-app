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
import { useContext, useEffect, useState } from 'react'
import {
	FlatNavItem,
	FlatTableOfContentType,
	NavigationContext
} from './NavigationProvider'
import styles from './PageFooter.module.css'
import { useLocation } from 'react-router'

const getCurrentPageIndex = (
	flatTableOfContent: FlatTableOfContentType,
	currentPage: string
) => {
	const index = flatTableOfContent.findIndex(elem => elem.path === currentPage)
	return index
}

const getItemByIndex = (
	flatTableOfContent: FlatTableOfContentType,
	index: number
) => {
	const navItem = flatTableOfContent[index]
	return navItem
}

interface NavState {
	prevItem: FlatNavItem
	nextItem: FlatNavItem
	index: number
}

const Footer = () => {
	const { flatTableOfContent } = useContext(NavigationContext)
	const { pathname: currentPage } = useLocation()
	const router = useIonRouter()
	const [navState, setNavState] = useState<NavState>()

	const pages = flatTableOfContent.filter(elem => elem.type !== 'folder')

	useEffect(() => {
		const index = getCurrentPageIndex(pages, currentPage)
		const prevItem = getItemByIndex(pages, index - 1)
		const nextItem = getItemByIndex(pages, index + 1)
		setNavState({ prevItem, nextItem, index })
	}, [currentPage, flatTableOfContent])

	const goNext = () => {
		if (navState) {
			router.push(navState.nextItem.path)
		}
	}

	const goPrev = () => {
		if (navState) {
			router.push(navState.prevItem.path)
		}
	}

	return (
		<IonFooter>
			<IonToolbar>
				{navState?.prevItem && (
					<IonButtons slot='start'>
						<IonButton onClick={goPrev}>
							<IonIcon
								size='large'
								color='primary'
								icon={PreviousChapterIcon}
							/>
						</IonButton>
					</IonButtons>
				)}
				<IonButtons className={styles.menuButtonContainer}>
					<IonMenuButton color='primary' />
				</IonButtons>
				{navState?.nextItem && (
					<IonButtons slot='end'>
						<IonButton onClick={goNext}>
							<IonIcon size='large' color='primary' icon={NextChapterIcon} />
						</IonButton>
					</IonButtons>
				)}
			</IonToolbar>
		</IonFooter>
	)
}

export default Footer
