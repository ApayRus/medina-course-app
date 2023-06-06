import { IonCheckbox, IonItem, IonLabel, IonText } from '@ionic/react'
import {
	AppStateContext,
	ConfigLayers,
	LayerToDisplay
} from '../AppStateProvider'
import { useContext } from 'react'

interface Props {
	content: ConfigLayers
	parentIds: string[]
}

const CheckboxesTree: React.FC<Props> = ({ content, parentIds }) => {
	const {
		state: { layers },
		methods: { update: updateAppState }
	} = useContext(AppStateContext)

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
								<h3>{title}</h3>
							</IonText>
							<div className='ion-padding' slot='content'>
								<CheckboxesTree
									content={content}
									parentIds={[...parentIds, id]}
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
