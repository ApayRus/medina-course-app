import { IonCheckbox } from '@ionic/react'
import { InputProps } from './types'

interface InputCheckboxProps extends InputProps {
	value: boolean
}

const InputCheckbox: React.FC<InputCheckboxProps> = ({
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

export default InputCheckbox
