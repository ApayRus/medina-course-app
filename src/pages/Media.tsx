import { IonContent, IonFooter, IonPage, IonToolbar } from '@ionic/react'
import { useEffect, useContext } from 'react'
import { useParams } from 'react-router'
import { PlayerContext } from '../components/Player/Provider'
import Header from './Header'
import Player from '../components/Player'
import PhrasesBlock from '../components/Phrases'
import { PhrasesContext } from '../components/Phrases/Provider'
import { parseSubs } from 'frazy-parser'
import { Phrase, PhraseTr } from '../components/Phrases/types'
import { AppStateContext } from '../components/AppStateProvider'
import { NavigationContext } from '../components/Navigation/NavigationProvider'
import { getSubs, getTranslation } from '../api'
import { getNavItemInfo } from '../utils/utils'

const MediaPage: React.FC = () => {
	const { path = '' } = useParams<{ path: string }>()

	const {
		methods: { setMediaLink }
	} = useContext(PlayerContext)

	const {
		state: { flatTableOfContent, flatTableOfContentTr }
	} = useContext(NavigationContext)

	const {
		methods: { setPhrases, setPhrasesTr },
		phrasesContainerRef
	} = useContext(PhrasesContext)

	const {
		state: { trLang, layers }
	} = useContext(AppStateContext)

	const navItemInfo = getNavItemInfo(flatTableOfContent, path)
	const navItemInfoTr = getNavItemInfo(flatTableOfContentTr, path)

	const { mediaLink = '', title = '' } = navItemInfo || {}
	const { title: titleTr = '' } = navItemInfoTr || {}

	useEffect(() => {
		const loadAndParseSubs = async () => {
			let subsText = ''

			try {
				subsText = await getSubs(path, layers)
			} catch (e) {
				console.log(e)
			}

			let translationText = ''

			try {
				translationText = await getTranslation(path, trLang)
			} catch (e) {
				console.log(e)
			}

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
			console.log(phrases)
			setPhrases([zeroPhrase, ...phrases])
			setPhrasesTr([zeroPhraseTr, ...phrasesTr])
		}

		if (layers.length > 0) {
			loadAndParseSubs()
		}
	}, [path, layers])

	useEffect(() => {
		setMediaLink(mediaLink)
	}, [flatTableOfContent, path])

	return (
		<IonPage>
			<Header title={title} titleTr={titleTr} />
			<IonContent fullscreen ref={phrasesContainerRef}>
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

export default MediaPage
