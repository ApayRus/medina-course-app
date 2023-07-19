import { IonToolbar, IonButtons, IonHeader, IonTitle } from '@ionic/react'
import NavigationButtons from '../components/Navigation/NavigationButtons'

interface Props {
	title?: string
	layerName?: string
}

const Header: React.FC<Props> = ({ title, layerName }) => {
	return (
		<>
			<IonHeader>
				<IonToolbar>
					{title && (
						<IonTitle>
							<div className={`pageHeaderTitle ${layerName}`}>{title}</div>
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
