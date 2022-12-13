import { IonContent, IonHeader, IonImg, IonPage, IonText } from '@ionic/react'
import Footer from '../components/PageFooter'
import styles from './Main.module.css'

const AboutPage: React.FC = () => {
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
						<h1>О нас!</h1>
					</IonText>
					<IonText>
						<p>
							Это приложение написано с целью облегчить для вас изучение книги
							"Мединский курс".
						</p>
						<p>
							Отзывы и предложения присылайте на телеграм <a>@ismailAbu</a>
						</p>
					</IonText>
				</div>
			</IonContent>
			<Footer />
		</IonPage>
	)
}

export default AboutPage
