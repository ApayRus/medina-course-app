import React, { useContext } from 'react'
import { NavigationContext } from './Navigation/NavigationProvider'
import { AppStateContext } from './AppStateProvider'

interface Props {
	path: string
}

const PageTitles = ({ path }: Props) => {
	const {
		state: { layers }
	} = useContext(AppStateContext)

	const {
		methods: { getPageInfo }
	} = useContext(NavigationContext)
	const pageInfo = getPageInfo(path)
	const { layers: pageInfoLayers } = pageInfo

	const titles = pageInfoLayers
		.filter(
			elem => layers.find(elem2 => elem2.path === elem.layerInfo.path)?.checked
		)
		.map(elem => {
			const { title } = elem?.itemInfo || {}
			const { path } = elem?.layerInfo || {}
			return { title, path }
		})

	return (
		<div className='pageTitleBlock'>
			{titles.map((elem, index) => {
				const path = elem.path.replace('toc/', '')
				const className = path.replace('/', '-')
				return (
					<div
						className={`pageTitleLayer ${className} index-${index}`}
						key={`title-${index}`}
					>
						<div className={`path ${className}`}>{path}</div>
						<div className={`title ${className}`}>{elem.title}</div>
					</div>
				)
			})}
		</div>
	)
}

export default PageTitles
