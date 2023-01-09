export interface Phrase {
	id: number
	start: number
	end: number
	text: string
}

export interface PhraseTr {
	id: number
	text: string
}

export interface State {
	phrases: Phrase[]
	phrasesTr: PhraseTr[]
	currentPhraseNum: number
}

export interface Methods {
	setPhrases: (phrases: Phrase[]) => void
	setPhrasesTr: (phrasesTr: PhraseTr[]) => void
	playPhrase: (phraseNum: number) => void
	scrollPhrasesBlock: (currentPhraseNum: number, delta: number) => void
}
