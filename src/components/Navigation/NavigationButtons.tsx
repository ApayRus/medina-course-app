import { IonButton, IonIcon, IonMenuButton, IonSpinner } from '@ionic/react'
import {
	chevronBack as PreviousChapterIcon,
	chevronForward as NextChapterIcon
} from 'ionicons/icons'
import { useContext, useEffect, useState } from 'react'
import { useIonRouter } from '@ionic/react'
import { useLocation } from 'react-router'
import { getPageNeighbors } from '../../utils/utils'
import { NavigationContext } from './NavigationProvider'
import { FlatNavItem } from './types'

interface State {
	prevItem: FlatNavItem
	nextItem: FlatNavItem
}

const NavigationButtons = () => {
	const {
		state: { flatTocs }
	} = useContext(NavigationContext)

	const { pathname: currentPage } = useLocation()

	const router = useIonRouter()

	const [state, setState] = useState({} as State)

	const flatTableOfContent = flatTocs?.[0]?.data

	useEffect(() => {
		if (currentPage && flatTableOfContent) {
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

	return flatTableOfContent ? (
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
	) : (
		<IonSpinner name='dots' />
	)
}

export default NavigationButtons
