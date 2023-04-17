import { useContext } from 'react'
import { AppStateContext } from '../AppStateProvider'
import { IonCheckbox, IonItem, IonLabel, IonText } from '@ionic/react'

const Config: React.FC = () => {
	const {
		state: { layers },
		methods: { update: updateAppState }
	} = useContext(AppStateContext)

	return (
		<div>
			<IonText>
				<h3>Layers to display: </h3>
			</IonText>
			{layers.map((layer, index) => {
				const { langTitle, layerTitle, path, checked } = layer
				return (
					<IonItem key={`layer-${index}`}>
						<IonCheckbox
							id={path}
							slot='start'
							checked={checked}
							onIonChange={event => {
								const {
									target: { id, checked }
								} = event
								const updatedLayers = [...layers]
								const layerIndex = updatedLayers.findIndex(
									elem => elem.path === id
								)
								updatedLayers[layerIndex]['checked'] = checked
								updateAppState({ layers: updatedLayers })
							}}
						></IonCheckbox>
						<IonLabel>{`${langTitle}, ${layerTitle}`}</IonLabel>
					</IonItem>
				)
			})}
		</div>
	)
}

export default Config
