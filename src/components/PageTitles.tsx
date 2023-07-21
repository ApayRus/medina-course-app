import React, { useContext } from 'react'
import { NavigationContext } from './Navigation/NavigationProvider'
import { AppStateContext } from './AppStateProvider'

interface Props {
	path: string
}

const PageTitles = ({ path }: Props) => {
	const {
		state: { settings },
		methods: { getSetting }
	} = useContext(AppStateContext)

	const {
		methods: { getPageInfo }
	} = useContext(NavigationContext)
	const pageInfo = getPageInfo(path)
	const { layers: pageInfoLayers } = pageInfo

	const titles = pageInfoLayers
		.filter(
			elem => settings.find(elem2 => elem2.path === elem.layerInfo.path)?.value
		)
		.map(elem => {
			const { title } = elem?.itemInfo || {}
			const { path } = elem?.layerInfo || {}
			return { title, path }
		})

	const showLayerName = getSetting('phrases/showLayerName')

	return (
		<div className='pageTitleBlock'>
			{titles.map((elem, index) => {
				const { path: layerPath } = elem
				const layerName = layerPath.replace('layers/toc/', '').replace('/', '-')
				const showLayer = getSetting(layerPath)
				return showLayer ? (
					<div
						className={`pageTitleLayer ${layerName} layer-${index}`}
						key={`title-${index}`}
					>
						{showLayerName && <div className='layerName'>{layerName}</div>}

						<div className='text'>{elem.title}</div>
					</div>
				) : (
					<></>
				)
			})}
		</div>
	)
}

export default PageTitles
