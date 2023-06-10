import { IonCheckbox, IonItem, IonLabel, IonText } from '@ionic/react'
import { AppState, ConfigLayers, LayerToDisplay } from '../AppStateProvider'

interface Props {
	content: ConfigLayers
	parentIds: string[]
	layers: LayerToDisplay[]
	updateAppState: (state: Partial<AppState>) => void
}

const CheckboxesTree: React.FC<Props> = ({
	content,
	parentIds,
	layers,
	updateAppState
}) => {
	return (
		<div className='checkboxes-tree'>
			{content.map(elem => {
				const path = [...parentIds, elem.id].join('/')
				if ('content' in elem) {
					// it is folder
					const { id, title, content } = elem
					return (
						<div key={`${path}`}>
							<IonText>
								<div className={`config-header-${parentIds.length}`}>
									{title}
								</div>
							</IonText>
							<div className='ion-padding' slot='content'>
								<CheckboxesTree
									content={content}
									parentIds={[...parentIds, id]}
									layers={layers}
									updateAppState={updateAppState}
								/>
							</div>
						</div>
					)
				} else {
					const { id, title } = elem
					return (
						<IonItem key={`${path}`}>
							<IonCheckbox
								id={id}
								slot='start'
								checked={Boolean(
									layers.find(elem => elem.path === path)?.checked
								)}
								onIonChange={event => {
									const {
										target: { checked }
									} = event

									const updatedLayers = [...layers]
									const index = layers.findIndex(elem => elem.path === path)
									updatedLayers[index]['checked'] = checked
									console.log('aaaa')
									console.log('updatedLayers')
									console.log(updatedLayers)
									updateAppState({ layers: [...updatedLayers] })
								}}
							></IonCheckbox>
							<IonLabel>{`${title}`}</IonLabel>
						</IonItem>
					)
				}
			})}
		</div>
	)
}

export default CheckboxesTree
