import React, { useRef, useEffect } from 'react'

import {
	IonIcon,
	IonMenuToggle,
	IonAccordion,
	IonAccordionGroup,
	IonItem,
	IonLabel
} from '@ionic/react'

import { bookOutline, documentTextOutline } from 'ionicons/icons'

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

export type TableOfContent = Array<File | Folder> | []

interface TableOfContentProps {
	content: TableOfContent
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

		// accordionGroup.current.value = ['/Book 1', '/Book 2'] -- opened accordions
	}, [])

	return (
		<IonAccordionGroup ref={accordionGroup} multiple={true}>
			{content.map(item => {
				const { name, type } = item
				if (type === 'file')
					return (
						<IonMenuToggle key={`${parents.join('-') + name}`} autoHide={false}>
							<IonItem
								routerLink={`/page/${[...parents, name].join('/')}`}
								title={JSON.stringify(parents)}
							>
								<IonIcon slot='start' md={documentTextOutline} />
								<IonLabel>{name}</IonLabel>
							</IonItem>
						</IonMenuToggle>
					)
				if (type === 'folder') {
					const { content } = item
					return (
						<IonAccordion
							key={`${parents.join('-') + name}`}
							value={`${[parents, name].join('/')}`}
						>
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
