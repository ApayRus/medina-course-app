import React, { useContext } from 'react'
import { IonPage } from '@ionic/react'
import { useParams } from 'react-router'
import Header from './Header'
import Media from './Media'
import { PlayerProvider } from 'react-wavesurfer-provider'
import { NavigationContext } from '../components/Navigation/NavigationProvider'
import { NavItemType } from '../components/Navigation/types'
import LayersProvider from '../components/Layers/Provider'

export default function PageFrame() {
	const { path = '' } = useParams<{ path: string }>()

	const {
		methods: { getPageInfo }
	} = useContext(NavigationContext)

	const PageInfo = getPageInfo(path)
	const { type, layers } = PageInfo

	const title = layers.filter(elem => elem.layerInfo.checked)[0]?.itemInfo.title

	const contentByType = (type: NavItemType) => {
		switch (type) {
			case 'richMedia':
				return (
					<PlayerProvider peaks={[]}>
						<LayersProvider>
							<Media />
						</LayersProvider>
					</PlayerProvider>
				)

			default:
				return <></>
		}
	}

	return (
		<IonPage>
			<Header title={title} />
			{contentByType(type)}
		</IonPage>
	)
}
