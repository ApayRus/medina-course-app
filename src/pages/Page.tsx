import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar
} from '@ionic/react'
import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router'
import Player from '../components/Player'
import supabase from '../supabase/client'
import Footer from '../components/PageFooter'
import styles from './Page.module.css'
import { NavigationContext } from '../components/NavigationProvider'

const Page: React.FC = () => {
	const { path } = useParams<{ path: string }>()

	const [mediaLink, setMediaLink] = useState('')

	const { setCurrentPage } = useContext(NavigationContext)

	useEffect(() => {
		const {
			data: { publicUrl }
		} = supabase.storage.from('audios').getPublicUrl(path)

		setMediaLink(publicUrl)
		setCurrentPage(path)
	}, [path, setCurrentPage])

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>{path}</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<div className={styles.container}>
					<Player mediaLink={mediaLink} />
				</div>
			</IonContent>
			<Footer />
		</IonPage>
	)
}

export default Page
