import { IonItem, IonText } from '@ionic/react'
import { Config, SettingsItem } from '../AppStateProvider'
import InputCheckbox from './InputCheckbox'
import InputNumber from './InputNumber'
import InputSelect from './InputSelect'

interface Props {
	content: Config
	parentIds: string[]
	settings: SettingsItem[]
	callback: (event: any) => void
}

const CheckboxesTree: React.FC<Props> = ({
	content,
	parentIds,
	settings,
	callback
}) => {
	return (
		<div className='settingsTree'>
			{content.map(elem => {
				const { id, title, description } = elem
				const path = [...parentIds, elem.id].join('/')
				const level = parentIds.length + 1
				if ('content' in elem) {
					// it is folder
					const { content } = elem
					return (
						<div key={`${path}`} className={`level-${level}`}>
							<IonText>
								<div className={`settingsHeader level-${level}`}>
									<div className='title'>{title}</div>
									<div className='description'>{description}</div>
								</div>
							</IonText>
							<CheckboxesTree
								content={content}
								parentIds={[...parentIds, id]}
								settings={settings}
								callback={callback}
							/>
						</div>
					)
				} else {
					const { value } = settings.find(elem => elem.path === path) || {}
					const { options = [], min, max, step } = elem
					const inputElement = () => {
						if (typeof value === 'number') {
							return (
								<InputNumber
									{...{
										path,
										title,
										description,
										value,
										callback,
										min,
										max,
										step
									}}
								/>
							)
						} else if (options.length > 0 && typeof value === 'string') {
							return (
								<InputSelect
									{...{ path, title, description, value, options, callback }}
								/>
							)
						} else if (
							typeof value === 'boolean' ||
							typeof value === 'undefined'
						) {
							return (
								<InputCheckbox
									{...{
										path,
										title,
										description,
										value: Boolean(value),
										callback
									}}
								/>
							)
						}
					}
					return <IonItem key={`${path}`}>{inputElement()}</IonItem>
				}
			})}
		</div>
	)
}

export default CheckboxesTree
