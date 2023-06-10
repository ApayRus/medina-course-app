import CheckboxesTree from './CheckboxesTree'
import { useContext } from 'react'
import { AppStateContext } from '../AppStateProvider'

const Config: React.FC = () => {
	const {
		state: { layers, config, loading },
		methods: { update: updateAppState }
	} = useContext(AppStateContext)

	return (
		<div>
			{!loading && (
				<CheckboxesTree
					content={config.layers}
					layers={layers}
					updateAppState={updateAppState}
					parentIds={[]}
				/>
			)}
		</div>
	)
}

export default Config
