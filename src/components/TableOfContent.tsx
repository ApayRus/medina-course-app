import React, { useRef, useEffect } from 'react'

import {
	IonIcon,
	IonMenuToggle,
	IonAccordion,
	IonAccordionGroup,
	IonItem,
	IonLabel
} from '@ionic/react'

import * as icons from 'ionicons/icons'

import { useLocation } from 'react-router-dom'

export type NavItemType = 'folder' | 'html' | 'richMedia'

type IconName =
	| 'bookOutline'
	| 'homeOutline'
	| 'documentTextOutline'
	| 'musicalNoteOutline'
	| 'informationCircleOutline'

export interface Page {
	id: string
	type: Exclude<NavItemType, 'folder'>
	title: string
	mediaLink?: string
	icon?: IconName
}

type IconMap = {
	[key in NavItemType]: IconName
}

export interface Folder {
	id: string
	type: 'folder'
	title: string
	icon?: IconName
	content: Array<Page | Folder>
}

const getIcon = (item: Folder | Page) => {
	const { type, icon } = item
	const iconMap: IconMap = {
		folder: 'bookOutline',
		richMedia: 'musicalNoteOutline',
		html: 'documentTextOutline'
	}
	const iconName = icon || iconMap[type]
	return icons[iconName]
}

export type TableOfContentType = Array<Page | Folder> | []

interface TableOfContentProps {
	content: TableOfContentType
	parents: string[]
	openedFolders: string[]
}

const TableOfContentComponent: React.FC<TableOfContentProps> = ({
	content,
	parents,
	openedFolders
}) => {
	const accordionGroup = useRef<null | HTMLIonAccordionGroupElement>(null)

	useEffect(() => {
		if (!accordionGroup.current) {
			return
		}
		accordionGroup.current.value = openedFolders // opened accordions
	}, [])

	const { pathname: currentPage } = useLocation()

	return (
		<IonAccordionGroup ref={accordionGroup} multiple={true}>
			{content.map(item => {
				const { title, id: itemPath, type } = item
				const path = [...parents, itemPath].join('/')

				if (type !== 'folder') {
					const isActive = `/${path}` === currentPage

					return (
						<IonMenuToggle key={path} autoHide={false}>
							<IonItem
								routerLink={'/' + path}
								color={isActive ? 'secondary' : ''}
							>
								<IonIcon
									slot='start'
									md={getIcon(item)}
									style={{ color: isActive ? 'white' : '' }}
								/>
								<IonLabel className='ion-text-wrap'>{title}</IonLabel>
							</IonItem>
						</IonMenuToggle>
					)
				}
				if (type === 'folder') {
					const { content } = item
					return (
						<IonAccordion key={path} value={path}>
							<IonItem slot='header' color='light'>
								<IonIcon slot='start' md={getIcon(item)} />
								<IonLabel className='ion-text-wrap'>{title}</IonLabel>
							</IonItem>
							<div className='ion-padding' slot='content'>
								<TableOfContentComponent
									content={content}
									parents={[...parents, path]}
									openedFolders={openedFolders}
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
