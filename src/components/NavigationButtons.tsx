import { IonButton, IonIcon, IonMenuButton } from '@ionic/react'
import {
	chevronBack as PreviousChapterIcon,
	chevronForward as NextChapterIcon
} from 'ionicons/icons'
import { useContext, useEffect, useState } from 'react'
import { FlatNavItem, NavigationContext } from './NavigationProvider'
import { useIonRouter } from '@ionic/react'
import { useLocation } from 'react-router'
import { getPageNeighbors } from '../utils/utils'

interface State {
	prevItem: FlatNavItem
	nextItem: FlatNavItem
}

const NavigationButtons = () => {
	const {
		state: { flatTableOfContent }
	} = useContext(NavigationContext)

	const { pathname: currentPage } = useLocation()

	const router = useIonRouter()

	const [state, setState] = useState({} as State)

	useEffect(() => {
		if (currentPage) {
			const neighbors = getPageNeighbors(flatTableOfContent, currentPage)
			setState(neighbors)
		}
	}, [currentPage, flatTableOfContent])

	const goNext = () => {
		router.push(state.nextItem.path)
	}

	const goPrev = () => {
		router.push(state.prevItem.path)
	}

	return (
		<>
			{state.prevItem && (
				<IonButton onClick={goPrev}>
					<IonIcon size='large' color='primary' icon={PreviousChapterIcon} />
				</IonButton>
			)}
			<IonMenuButton color='primary' />
			{state.nextItem && (
				<IonButton onClick={goNext}>
					<IonIcon size='large' color='primary' icon={NextChapterIcon} />
				</IonButton>
			)}
		</>
	)
}

export default NavigationButtons
