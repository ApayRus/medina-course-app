import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar
} from '@ionic/react'
import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router'
import ExploreContainer from '../components/ExploreContainer'
import Player from '../components/Player'
import supabase from '../supabase/client'
import Footer from '../components/PageFooter'
import './Page.css'
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
				<ExploreContainer path={path}>
					<Player mediaLink={mediaLink} />
				</ExploreContainer>
			</IonContent>
			<Footer />
		</IonPage>
	)
}

export default Page
