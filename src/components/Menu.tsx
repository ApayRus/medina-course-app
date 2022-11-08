import React, { useContext, useEffect, useState } from 'react'
import { IonLoading, IonMenu, IonContent } from '@ionic/react'
// import { useLocation } from 'react-router-dom'

import './Menu.css'

import TableOfContent from './TableOfContent'

import { NavigationContext } from './NavigationProvider'

const Menu: React.FC = () => {
	// const location = useLocation()

	const { tableOfContent, loaded } = useContext(NavigationContext)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		if (loaded) setIsLoading(false)
		if (!loaded) setIsLoading(true)
	}, [loaded])

	return (
		<IonMenu contentId='main' type='overlay'>
			<IonLoading isOpen={isLoading} />
			<IonContent>
				<TableOfContent content={tableOfContent} parents={[]} />
			</IonContent>
		</IonMenu>
	)
}

export default Menu
