import { IonContent, IonFooter, IonPage, IonToolbar } from '@ionic/react'
import { useEffect, useContext } from 'react'
import { useParams } from 'react-router'
import supabase from '../supabase/client'
import { getTitle } from '../utils/utils'
import { PlayerContext } from '../components/Player/Provider'
import Header from './Header'
import Player from '../components/Player'
import PhrasesBlock from '../components/Phrases'
import { PhrasesContext } from '../components/Phrases/Provider'
import { parseSubs } from 'frazy-parser'
import axios from 'axios'
import { Phrase, PhraseTr } from '../components/Phrases/types'
import { AppStateContext } from '../components/AppStateProvider'

const MediaPage: React.FC = () => {
	const { path = '' } = useParams<{ path: string }>()

	const {
		methods: { setMediaLink }
	} = useContext(PlayerContext)

	const {
		methods: { setPhrases, setPhrasesTr }
	} = useContext(PhrasesContext)

	const {
		state: { translationLanguage }
	} = useContext(AppStateContext)

	useEffect(() => {
		const {
			data: { publicUrl: audioUrl }
		} = supabase.storage.from('audios').getPublicUrl(path)

		const textPath = path.replace(/mp3$/m, 'txt')

		const {
			data: { publicUrl: subsUrl }
		} = supabase.storage.from('subs').getPublicUrl(textPath)

		const {
			data: { publicUrl: translationUrl }
		} = supabase.storage
			.from('translations')
			.getPublicUrl(`${translationLanguage}/${textPath}`)

		const loadAndParseSubs = async () => {
			const subsText = await readFile(subsUrl)
			const translationText = await readFile(translationUrl)
			const phrases: Phrase[] = subsText
				? parseSubs(subsText, false).map(elem => ({
						...elem,
						text: elem.body
				  }))
				: []
			const phrasesTr: PhraseTr[] = translationText
				? parseSubs(translationText, false).map(elem => ({
						...elem,
						text: elem.body
				  }))
				: []
			const zeroPhrase = { start: 0, end: 0, id: 0, text: '' }
			const zeroPhraseTr = { id: 0, text: '' }
			setPhrases([zeroPhrase, ...phrases])
			setPhrasesTr([zeroPhraseTr, ...phrasesTr])
		}

		loadAndParseSubs()

		setMediaLink(audioUrl)
	}, [path])

	return (
		<IonPage>
			<Header title={getTitle(path)} />
			<IonContent fullscreen>
				<PhrasesBlock />
			</IonContent>
			<IonFooter>
				<IonToolbar>
					<Player />
				</IonToolbar>
			</IonFooter>
		</IonPage>
	)
}

async function readFile(fileUrl: string) {
	try {
		const { data } = await axios(fileUrl)
		return data
	} catch (e) {
		// console.log(e)
		return ''
	}
}

export default MediaPage
