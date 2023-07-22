import { IonInput } from '@ionic/react'
import { InputProps } from './types'

interface InputNumberProps extends InputProps {
	value: number
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

export default NumberInput
