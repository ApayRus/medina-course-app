import CheckboxesTree from './CheckboxesTree'
import { useContext } from 'react'
import { AppStateContext, SettingsItemValue } from '../AppStateProvider'
import { IonSpinner } from '@ionic/react'

const Config: React.FC = () => {
	const {
		state: { settings, config, configLoaded },
		methods: { updateSettings }
	} = useContext(AppStateContext)

	interface CallbackProps {
		path: string
		value: SettingsItemValue
	}

	const callback = ({ path, value }: CallbackProps) => {
		updateSettings({ path, value })
	}

	return (
		<div>
			{configLoaded ? (
				<CheckboxesTree
					content={config}
					settings={settings}
					callback={callback}
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
