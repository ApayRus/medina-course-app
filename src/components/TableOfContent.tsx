import React, { useRef, useEffect, useContext } from 'react'

import {
	IonIcon,
	IonMenuToggle,
	IonAccordion,
	IonAccordionGroup,
	IonItem,
	IonLabel
} from '@ionic/react'

import { bookOutline, documentTextOutline } from 'ionicons/icons'
import { NavigationContext } from './NavigationProvider'

export interface File {
	type: 'file'
	name: string
	title?: string
}

export interface Folder {
	type: 'folder'
	name: string
	title?: string
	content: Array<File | Folder>
}

export type TableOfContentType = Array<File | Folder> | []

interface TableOfContentProps {
	content: TableOfContentType
	parents: string[]
}

const TableOfContentComponent: React.FC<TableOfContentProps> = ({
	content,
	parents
}) => {
	const accordionGroup = useRef<null | HTMLIonAccordionGroupElement>(null)
	useEffect(() => {
		if (!accordionGroup.current) {
			return
		}
		accordionGroup.current.value = ['book1'] // opened accordions
	}, [])

	const { currentPage } = useContext(NavigationContext)

	return (
		<IonAccordionGroup ref={accordionGroup} multiple={true}>
			{content.map(item => {
				const { name, type } = item
				const path = [...parents, name].join('/')
				const isActive = path === currentPage
				if (type === 'file')
					return (
						<IonMenuToggle key={path} autoHide={false}>
							<IonItem
								routerLink={`/page/${path}`}
								color={isActive ? 'secondary' : ''}
							>
								<IonIcon
									slot='start'
									md={documentTextOutline}
									style={{ color: isActive ? 'white' : '' }}
								/>
								<IonLabel>{name}</IonLabel>
							</IonItem>
						</IonMenuToggle>
					)
				if (type === 'folder') {
					const { content } = item
					return (
						<IonAccordion key={path} value={path}>
							<IonItem slot='header' color='light'>
								<IonIcon slot='start' md={bookOutline} />
								<IonLabel>{name}</IonLabel>
							</IonItem>
							<div className='ion-padding' slot='content'>
								<TableOfContentComponent
									content={content}
									parents={[...parents, name]}
								/>
							</div>
						</IonAccordion>
					)
				} else return <></>
			})}
		</IonAccordionGroup>
	)
}

export default TableOfContentComponent
