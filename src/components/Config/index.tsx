import CheckboxesTree from './CheckboxesTree'
import { useContext } from 'react'
import { AppStateContext } from '../AppStateProvider'
import { IonSpinner } from '@ionic/react'

const Config: React.FC = () => {
	const {
		state: { layers, config, configLoaded },
		methods: { update: updateAppState }
	} = useContext(AppStateContext)

	return (
		<div>
			{configLoaded ? (
				<CheckboxesTree
					content={config.layers}
					layers={layers}
					updateAppState={updateAppState}
					parentIds={[]}
				/>
			) : (
				<div style={{ textAlign: 'center', marginTop: 20 }}>
					<IonSpinner name='circles' />
				</div>
			)}
		</div>
	)
}

export default Config
