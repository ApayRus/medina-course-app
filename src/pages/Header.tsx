import { IonToolbar, IonButtons, IonHeader, IonTitle } from '@ionic/react'
import NavigationButtons from '../components/NavigationButtons'

interface Props {
	title?: string
}

const Header: React.FC<Props> = ({ title }) => {
	return (
		<>
			<IonHeader>
				<IonToolbar>
					{title && <IonTitle>{title}</IonTitle>}
					<IonButtons slot='end'>
						<NavigationButtons />
					</IonButtons>
				</IonToolbar>
			</IonHeader>
		</>
	)
}

export default Header
