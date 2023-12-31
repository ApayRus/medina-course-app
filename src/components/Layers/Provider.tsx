import React, { createContext, useState } from 'react'
import { ContentLayer } from '../../api'
import { SettingsItem } from '../AppStateProvider'
import { Phrase } from 'react-wavesurfer-provider'

// rename Context and Provider to smth meaningful, they will be imported in other components

interface Props {
	children: JSX.Element | JSX.Element[]
	contentLayersProp?: ContentLayer[]
}

interface Layer {
	info: SettingsItem
	phrases: Phrase[]
}

interface MixedPhrase {
	layerInfo: SettingsItem
	phrase: Phrase
}

interface State {
	layers: Layer[]
}

interface Methods {
	setLayers: (layers: Layer[]) => void
	updatePhrase: (props: UpdatePhraseProps) => void
	mixPhrases: () => MixedPhrase[][]
}

interface UpdatePhraseProps {
	layer: Layer
	phrase: Phrase
	phraseIndex: number
}

interface ContextType {
	state: State
	methods: Methods
}

const defaultContextValue = {} as ContextType

export const LayersContext = createContext<ContextType>(defaultContextValue)

const defaultState = { layers: [] }

const LayersProvider: React.FC<Props> = ({ children }) => {
	const [state, setState] = useState<State>(defaultState)

	const setLayers = (layers: Layer[]) => {
		setState(oldState => ({ ...oldState, layers }))
	}

	const updatePhrase = ({ layer, phraseIndex, phrase }: UpdatePhraseProps) => {
		console.log({ layer, phraseIndex, phrase })
	}

	const mixPhrases = () => {
		const allPhrases = state.layers.map(elem => elem.phrases)
		const allInfo = state.layers.map(elem => elem.info)
		const mainPhrasesIndex = allInfo.findIndex(elem => elem.main)
		const mainPhrases = allPhrases[mainPhrasesIndex]
		const mixedPhrases = mainPhrases?.map((elem, phraseIndex) => {
			return allInfo.map((layerInfo, layerIndex) => {
				const phrase = allPhrases[layerIndex][phraseIndex]
				return { layerInfo, phrase }
			})
		})
		return mixedPhrases as MixedPhrase[][]
	}

	const methods = { setLayers, updatePhrase, mixPhrases }

	const contextValue = { state, methods }

	return (
		<LayersContext.Provider value={contextValue}>
			{children}
		</LayersContext.Provider>
	)
}

export default LayersProvider
