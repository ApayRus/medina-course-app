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
import { Folder, Page, IconMap, TableOfContentProps } from './types'
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
	tocs,
	flatTocs,
	settings,
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

	const valueLayerPaths = settings
		.filter(elem => elem.path.match('toc/') && elem.value)
		.map(elem => elem.path)

	return (
		<div className='toc'>
			<IonAccordionGroup ref={accordionGroup} multiple={true}>
				{content.map(item => {
					const { id: itemPath, type } = item
					const path = [...parents, itemPath].join('/')

					const titles = flatTocs.map(flatToc => {
						const { info: layerInfo, data } = flatToc
						const itemInfo = getNavItemInfo(data, path)
						return { layerInfo, itemInfo }
					})

					const titlesJSX = titles.map((elem, index) => {
						const { itemInfo } = elem
						const {
							layerInfo: { path: layerPath }
						} = elem
						const layerName = layerPath
							.replace('layers/toc/', '')
							.replace(/\//g, '-')

						const { title = '' } = itemInfo || {}
						return (
							valueLayerPaths.includes(layerPath) && (
								<div
									key={`title-${index}`}
									className={`tocLayer layer-${index} ${layerName}`}
								>
									{title}
								</div>
							)
						)
					})

					if (type !== 'folder') {
						const isActive = `/${path}` === currentPage

						return (
							<IonMenuToggle key={path} autoHide={false}>
								<IonItem
									routerLink={'/' + path}
									color={isActive ? 'secondary' : ''}
									className={`tocItem depth-${parents.length} ${
										isActive ? 'activeMenuItem' : ''
									}`}
								>
									<IonIcon
										slot='start'
										md={getIcon(item)}
										style={{ color: isActive ? 'white' : '' }}
									/>
									<IonLabel className={`ion-text-wrap`}>{titlesJSX}</IonLabel>
								</IonItem>
							</IonMenuToggle>
						)
					}
					if (type === 'folder') {
						const { content } = item
						return (
							<IonAccordion key={path} value={path}>
								<IonItem
									slot='header'
									color='light'
									className={`tocFolder depth-${parents.length}`}
								>
									<IonIcon slot='start' md={getIcon(item)} />
									<IonLabel className={`ion-text-wrap`}>{titlesJSX}</IonLabel>
								</IonItem>
								<div className='ion-padding' slot='content'>
									<TableOfContentComponent
										content={content}
										tocs={tocs}
										flatTocs={flatTocs}
										settings={settings}
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
