import {
	IonButton,
	IonContent,
	/* IonImg, */ IonPage,
	IonText
} from '@ionic/react'
import Header from './Header'
import styles from './Main.module.css'
import { useContext } from 'react'
import { ModalContext } from '../components/Modals/ModalsProvider'
// import Config from '../components/Config'

const MainPage: React.FC = () => {
	const {
		methods: { openModal }
	} = useContext(ModalContext)

	return (
		<IonPage>
			<Header />
			<IonContent fullscreen>
				<div className={styles.container}>
					<IonButton onClick={() => openModal({ contentComponent: 'Config' })}>
						Open modal
					</IonButton>
					<IonText color='primary'>
						<h1 className={styles.h1}>اللغة العربية لغير ناطقين بها</h1>
					</IonText>
					{/* <IonImg
						style={{ marginTop: 20 }}
						src='/assets/images/arabic_letters.jpg'
					/> */}
					<IonText color='primary'>
						<h2 className={styles.h2}>كتاب صوتي</h2>
					</IonText>
				</div>
			</IonContent>
		</IonPage>
	)
}

export default MainPage
