import { IonText } from '@ionic/react'
import CheckboxesTree from './CheckboxesTree'
import { useContext } from 'react'
import { AppStateContext } from '../AppStateProvider'

const Config: React.FC = () => {
	const {
		state: { config, loading }
	} = useContext(AppStateContext)

	return (
		<div>
			<IonText>
				<h3>Layers to display: </h3>
			</IonText>
			{!loading && <CheckboxesTree content={config.layers} parentIds={[]} />}
		</div>
	)
}

export default Config
