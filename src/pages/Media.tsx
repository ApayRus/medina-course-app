import {
	IonContent,
	IonFooter,
	IonPage,
	IonText,
	IonToolbar
} from '@ionic/react'
import { useEffect, useContext } from 'react'
import { useParams } from 'react-router'
import supabase from '../supabase/client'
import { getTitle } from '../utils/utils'
import { PlayerContext } from '../components/Player/Provider'
import Header from './Header'
import Player from '../components/Player'

const MediaPage: React.FC = () => {
	const { path = '' } = useParams<{ path: string }>()

	const {
		state: playerState,
		methods: { setMediaLink }
	} = useContext(PlayerContext)

	useEffect(() => {
		const {
			data: { publicUrl }
		} = supabase.storage.from('audios').getPublicUrl(path)

		setMediaLink(publicUrl)
	}, [path])

	return (
		<IonPage>
			<Header title={getTitle(path)} />
			<IonContent fullscreen>
				<pre>{JSON.stringify(playerState, null, 2)}</pre>
				<IonText>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque beatae
					nisi quisquam maxime molestias voluptatum perferendis, dolores qui
					consequuntur sed, numquam, temporibus similique. At, ipsam nemo
					delectus ipsa, magni possimus, hic eveniet laboriosam natus aliquid
					autem.
				</IonText>
			</IonContent>
			<IonFooter>
				<IonToolbar>
					<Player />
				</IonToolbar>
			</IonFooter>
		</IonPage>
	)
}

export default MediaPage
