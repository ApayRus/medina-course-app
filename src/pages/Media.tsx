import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar
} from '@ionic/react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import Player from '../components/Player'
import supabase from '../supabase/client'
import Footer from '../components/PageFooter'
import styles from './Media.module.css'
import { getTitle } from '../utils/utils'

const MediaPage: React.FC = () => {
	const { path } = useParams<{ path: string }>()

	const [mediaLink, setMediaLink] = useState('')

	useEffect(() => {
		const {
			data: { publicUrl }
		} = supabase.storage.from('audios').getPublicUrl(path)

		setMediaLink(publicUrl)
	}, [path])

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>{getTitle(path)}</IonTitle>
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

export default MediaPage
