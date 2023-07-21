import {
	IonCheckbox,
	IonInput,
	IonItem,
	IonSelect,
	IonSelectOption,
	IonText
} from '@ionic/react'
import { Config, SelectOption, SettingsItem } from '../AppStateProvider'

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
					const { options = [] } = elem
					const inputElement = () => {
						if (typeof value === 'number') {
							return (
								<NumberInput
									{...{ path, title, description, value, callback }}
								/>
							)
						} else if (options.length > 0 && typeof value === 'string') {
							return (
								<SelectInput
									{...{ path, title, description, value, options, callback }}
								/>
							)
						} else if (
							typeof value === 'boolean' ||
							typeof value === 'undefined'
						) {
							return (
								<CheckboxInput
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

interface InputProps {
	path: string
	title: string
	description?: string
	callback: (event: any) => void
}

interface InputNumberProps extends InputProps {
	value: number
}

interface InputSelectProps extends InputProps {
	value: string
	options: SelectOption[]
}

interface InputCheckboxProps extends InputProps {
	value: boolean
}

const NumberInput: React.FC<InputNumberProps> = ({
	path,
	title,
	description,
	value,
	callback
}) => {
	const pathArray = path.split('/')
	const level = pathArray.length
	const id = pathArray.at(-1)
	const onChange = (props: any) => (event: any) => {
		const {
			target: { id: path, value }
		} = event
		callback({ path, value: +value })
	}
	return (
		<>
			<div className={`settingsLabel level-${level}`}>
				<div className='title'>{title}</div>
				<div className='description'>{description}</div>
			</div>
			<IonInput
				id={path}
				type='number'
				aria-label={title}
				placeholder={id}
				value={value}
				min={1}
				onIonChange={onChange({ path, value })}
				slot='end'
				className='settingsNumberInput ion-text-right'
			/>
		</>
	)
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

const CheckboxInput: React.FC<InputCheckboxProps> = ({
	path,
	title,
	description,
	value,
	callback
}) => {
	const onChange = (props: any) => (event: any) => {
		const {
			target: { id: path, checked: value }
		} = event
		callback({ path, value })
	}
	const pathArray = path.split('/')
	const level = pathArray.length
	return (
		<>
			<div className={`settingsLabel level-${level}`}>
				<div className='title'>{title}</div>
				<div className='description'>{description}</div>
			</div>
			<IonCheckbox
				id={path}
				slot='end'
				aria-label={title}
				checked={Boolean(value)}
				onIonChange={onChange({ path, value })}
			></IonCheckbox>
		</>
	)
}
