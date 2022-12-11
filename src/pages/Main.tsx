import { IonContent, IonHeader, IonImg, IonPage, IonText } from '@ionic/react'
import Footer from '../components/PageFooter'
import styles from './Main.module.css'

const MainPage: React.FC = () => {
	return (
		<IonPage>
			<IonHeader>
				{/* <IonToolbar>
					<IonTitle>Book</IonTitle>
				</IonToolbar> */}
			</IonHeader>
			<IonContent fullscreen>
				<div className={styles.container}>
					<IonText color='primary'>
						<h1>اللغة العربية لغير ناطقين بها</h1>
					</IonText>
					<IonImg
						style={{ marginTop: 20 }}
						src='/assets/images/arabic_letters.jpg'
					/>
					<IonText color='primary'>
						<h2>كتاب صوتي</h2>
					</IonText>
				</div>
			</IonContent>
			<Footer />
		</IonPage>
	)
}

export default MainPage
