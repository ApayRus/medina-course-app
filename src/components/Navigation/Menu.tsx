import React, { useContext } from 'react'
import { IonMenu, IonContent, IonSpinner } from '@ionic/react'

import TableOfContent from './TableOfContent'

import { NavigationContext } from './NavigationProvider'
import { AppStateContext } from '../AppStateProvider'

const Menu: React.FC = () => {
	const {
		state: { tocs, flatTocs }
	} = useContext(NavigationContext)

	const {
		state: { settings }
	} = useContext(AppStateContext)

	const content = tocs?.[0]?.data

	return (
		<IonMenu contentId='main' type='overlay'>
			<IonContent>
				{content ? (
					<TableOfContent
						{...{ content, flatTocs, tocs, settings }}
						parents={[]}
						openedFolders={['book1']}
					/>
				) : (
					<div style={{ textAlign: 'center', marginTop: 20 }}>
						<IonSpinner name='circles' />
					</div>
				)}
			</IonContent>
		</IonMenu>
	)
}

export default Menu
