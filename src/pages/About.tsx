import { IonContent, IonPage, IonText } from '@ionic/react'
import Header from './Header'
import styles from './Main.module.css'

const AboutPage: React.FC = () => {
	return (
		<IonPage>
			<Header />
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
		</IonPage>
	)
}

export default AboutPage
