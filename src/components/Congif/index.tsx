import { IonText } from '@ionic/react'
import CheckboxesTree from './CheckboxesTree'
import { useContext, useMemo } from 'react'
import { AppStateContext } from '../AppStateProvider'

const Config: React.FC = () => {
	const {
		state: { config, loading, layers }
	} = useContext(AppStateContext)

	return (
		<div>
			<pre>{JSON.stringify(layers, null, 2)}</pre>
			<IonText>
				<h3>Layers to display: </h3>
			</IonText>
			{!loading && <CheckboxesTree content={config.layers} parentIds={[]} />}
		</div>
	)
}

export default Config
