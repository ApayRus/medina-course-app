import { IonContent, /* IonImg, */ IonPage, IonText } from '@ionic/react'
import Header from './Header'
import styles from './Main.module.css'

const MainPage: React.FC = () => {
	return (
		<IonPage>
			<Header />
			<IonContent fullscreen>
				<div className={styles.container}>
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
