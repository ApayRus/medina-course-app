import React, { useContext } from 'react'
import { IonMenu, IonContent } from '@ionic/react'

import './Menu.css'

import TableOfContent from './TableOfContent'

import { NavigationContext } from './NavigationProvider'

const Menu: React.FC = () => {
	const {
		state: { tableOfContent }
	} = useContext(NavigationContext)

	return (
		<IonMenu contentId='main' type='overlay'>
			<IonContent>
				<TableOfContent
					content={tableOfContent}
					parents={[]}
					openedFolders={['book1']}
				/>
			</IonContent>
		</IonMenu>
	)
}

export default Menu
