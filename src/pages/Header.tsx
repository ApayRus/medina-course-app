import { IonToolbar, IonButtons, IonHeader, IonTitle } from '@ionic/react'
import NavigationButtons from '../components/Navigation/NavigationButtons'

interface Props {
	title?: string
	titleTr?: string
}

const Header: React.FC<Props> = ({ title, titleTr }) => {
	return (
		<>
			<IonHeader>
				<IonToolbar>
					{title && (
						<IonTitle>
							<div className='pageTitle'>{title}</div>
							<div className='pageSubtitle'>{titleTr}</div>
						</IonTitle>
					)}

					<IonButtons slot='end'>
						<NavigationButtons />
					</IonButtons>
				</IonToolbar>
			</IonHeader>
		</>
	)
}

export default Header
