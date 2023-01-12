import { useContext } from 'react'
import { PhrasesContext } from './Provider'
import { playOutline as playIcon } from 'ionicons/icons/'
import { IonButton, IonIcon } from '@ionic/react'

const PhrasesBlock = () => {
	const {
		state: { currentPhraseNum, phrases, phrasesTr },
		phraseRefs,
		methods: { playPhrase }
	} = useContext(PhrasesContext)

	return (
		<div className='phrasesBlock'>
			{phrases.map((elem, index) => {
				const { text, id } = elem
				const isActive = +id === currentPhraseNum
				const { text: textTr } = phrasesTr?.find(elem => elem.id === id) || {}
				return (
					<div
						className='phraseWrapper'
						key={`phrase-${index}`}
						ref={el => {
							if (phraseRefs.current) {
								phraseRefs.current[index] = el!
							}
						}}
					>
						<div className={isActive ? 'phraseBlock active' : 'phraseBlock'}>
							<div className='text'>{text}</div>
							<div className='textTr'>{textTr}</div>
							<div className='phraseNum'>
								<IonButton
									fill='clear'
									size='small'
									onClick={() => playPhrase(+id)}
								>
									<IonIcon icon={playIcon} />
									{id}
								</IonButton>
							</div>
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default PhrasesBlock
