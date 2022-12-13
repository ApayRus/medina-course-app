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
import { getTitle } from '../utils/utils'

export type NavItemType = 'folder' | 'page' | 'file'

type IconName =
	| 'bookOutline'
	| 'homeOutline'
	| 'documentTextOutline'
	| 'musicalNoteOutline'
	| 'informationCircleOutline'

export interface Page {
	type: Exclude<NavItemType, 'folder'>
	title: string
	path: string
	icon?: IconName
}

type IconMap = {
	[key in NavItemType]: IconName
}

export interface Folder {
	type: 'folder'
	title: string
	path: string
	icon?: IconName
	content: Array<Page | Folder>
}

const getIcon = (item: Folder | Page) => {
	const { type, icon } = item
	const iconMap: IconMap = {
		folder: 'bookOutline',
		file: 'musicalNoteOutline',
		page: 'documentTextOutline'
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
				const { title, path: itemPath, type } = item
				const path = [...parents, itemPath].join('/')

				if (type === 'file' || type === 'page') {
					const basePath = type === 'file' ? '/media' : ''
					const pagePath = `${basePath}/${path}`
					const goodTitle = type === 'file' ? getTitle(title) : title
					const isActive = pagePath === currentPage

					return (
						<IonMenuToggle key={path} autoHide={false}>
							<IonItem
								routerLink={pagePath}
								color={isActive ? 'secondary' : ''}
							>
								<IonIcon
									slot='start'
									md={getIcon(item)}
									style={{ color: isActive ? 'white' : '' }}
								/>
								<IonLabel>{goodTitle}</IonLabel>
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
								<IonLabel>{title}</IonLabel>
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
