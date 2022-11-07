import React, { useRef, useEffect } from 'react'

import {
	IonContent,
	IonIcon,
	IonList,
	IonListHeader,
	IonMenu,
	IonMenuToggle,
	IonNote,
	IonAccordion,
	IonAccordionGroup,
	IonItem,
	IonLabel
} from '@ionic/react'

import { bookOutline, documentTextOutline } from 'ionicons/icons'

import { useLocation } from 'react-router-dom'

import './Menu.css'

import tableOfContent from '../content/table-of-content'
import { TableOfContent as TableOfContentType } from '../content/table-of-content'

interface TableOfContentProps {
	content: TableOfContentType
	parents: string[]
}

const TableOfContent: React.FC<TableOfContentProps> = ({
	content,
	parents
}) => {
	const accordionGroup = useRef<null | HTMLIonAccordionGroupElement>(null)

	useEffect(() => {
		if (!accordionGroup.current) {
			return
		}

		// accordionGroup.current.value = ['first', 'third']
	}, [])

	return (
		<IonAccordionGroup ref={accordionGroup} multiple={true}>
			{content.map(item => {
				const { title, type } = item
				if (type === 'page')
					return (
						<IonMenuToggle
							key={`${parents.join('-') + title}`}
							autoHide={false}
						>
							<IonItem routerLink='/bjbjbj' title={JSON.stringify(parents)}>
								<IonIcon slot='start' md={documentTextOutline} />
								<IonLabel>{title}</IonLabel>
							</IonItem>
						</IonMenuToggle>
					)
				if (type === 'folder') {
					const { content } = item
					return (
						<IonAccordion
							key={`${parents.join('-') + title}`}
							value={Date.now() + Math.random() + ''}
						>
							<IonItem slot='header' color='light'>
								<IonIcon slot='start' md={bookOutline} />
								<IonLabel>{title}</IonLabel>
							</IonItem>
							<div className='ion-padding' slot='content'>
								<TableOfContent
									content={content}
									parents={[...parents, title]}
								/>
							</div>
						</IonAccordion>
					)
				} else return <></>
			})}
		</IonAccordionGroup>
	)
}

const Menu: React.FC = () => {
	const location = useLocation()

	return (
		<IonMenu contentId='main' type='overlay'>
			<IonContent>
				<TableOfContent content={tableOfContent} parents={[]} />
			</IonContent>
		</IonMenu>
	)
}

export default Menu
