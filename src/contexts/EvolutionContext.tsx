'use client'

import { ReactNode, createContext, useContext, useState } from 'react'

interface EvolutionProviderProps {
	children: ReactNode
}

interface Evolution {
	isEvolving: boolean
	previousForm?: string
	newForm?: string
	animatedNewForm?: string
}

interface EvolutionContextProps {
	evolution: Evolution
	evolveYol: (
		previousForm: string,
		newForm: string,
		animatedNewForm: string,
	) => void
	endEvolution: () => void
}

const EvolutionContext = createContext({} as EvolutionContextProps)

const EvolutionProvider = ({ children }: EvolutionProviderProps) => {
	const [evolution, setEvolution] = useState<Evolution>({ isEvolving: false })

	const evolveYol = (
		previousForm: string,
		newForm: string,
		animatedNewForm: string,
	) => {
		setEvolution({
			isEvolving: true,
			previousForm,
			newForm,
			animatedNewForm,
		})
	}
	const endEvolution = () => {
		setEvolution({ isEvolving: false })
	}

	const value: EvolutionContextProps = {
		evolution,
		evolveYol,
		endEvolution,
	}

	return (
		<EvolutionContext.Provider value={value}>
			{children}
		</EvolutionContext.Provider>
	)
}

export const useEvolution = () => useContext(EvolutionContext)

export default EvolutionProvider
