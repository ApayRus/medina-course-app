import { IonSelect, IonSelectOption } from '@ionic/react'
import { SelectOption } from '../AppStateProvider'
import { InputProps } from './types'

interface InputSelectProps extends InputProps {
	value: string
	options: SelectOption[]
}

const SelectInput: React.FC<InputSelectProps> = ({
	path,
	title,
	value,
	description,
	options,
	callback
}) => {
	const pathArray = path.split('/')
	const level = pathArray.length
	const id = pathArray.at(-1)

	const onChange = (props: any) => (event: any) => {
		const {
			target: { id: path, value }
		} = event
		callback({ path, value })
	}

	return (
		<>
			<div className={`settingsLabel level-${level}`}>
				<div className='title'>{title}</div>
				<div className='description'>{description}</div>
			</div>
			<IonSelect
				id={path}
				interface='popover'
				placeholder={id}
				onIonChange={onChange({ path, value })}
				value={value}
				// defaultValue={options[0]['id']}
				slot='end'
				aria-label={title}
			>
				{options.map((option, index) => {
					const { id, title } = option
					return (
						<IonSelectOption
							aria-label={title}
							key={`option-${index}`}
							value={id}
						>
							{title}
						</IonSelectOption>
					)
				})}
			</IonSelect>
		</>
	)
}

export default SelectInput
