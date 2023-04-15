import React, { useRef, useEffect, useContext } from 'react'

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
import { Folder, Page, IconMap, TableOfContentProps } from './types'
import { NavigationContext } from './NavigationProvider'
import { getNavItemInfo } from '../../utils/utils'

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

	const {
		state: { flatTableOfContentTr }
	} = useContext(NavigationContext)

	const { pathname: currentPage } = useLocation()

	return (
		<div className='toc'>
			<IonAccordionGroup ref={accordionGroup} multiple={true}>
				{content.map(item => {
					const { title, id: itemPath, type } = item
					const path = [...parents, itemPath].join('/')
					const { title: titleTr } =
						getNavItemInfo(flatTableOfContentTr, path) || {}

					if (type !== 'folder') {
						const isActive = `/${path}` === currentPage

						return (
							<IonMenuToggle key={path} autoHide={false}>
								<IonItem
									routerLink={'/' + path}
									color={isActive ? 'secondary' : ''}
									className={isActive ? 'activeMenuItem' : ''}
								>
									<IonIcon
										slot='start'
										md={getIcon(item)}
										style={{ color: isActive ? 'white' : '' }}
									/>
									<IonLabel className='ion-text-wrap'>
										<div className='menuMainItem'>{title}</div>
										<div className='menuSubItem'>{titleTr}</div>
									</IonLabel>
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
									<IonLabel className='ion-text-wrap'>
										<div>{title}</div>
										<div className='menuSubItem'>{titleTr}</div>
									</IonLabel>
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
		</div>
	)
}

export default TableOfContentComponent
