import { SuccessType, UserSuccess } from '@/type/success.type'
import { EvolutionAssets, Yol } from '@/type/yol.type'
import { themes } from './themes'
import { SpeciesNames, SpeciesStages } from '@/type/species.type'

export const evolutionLevels = [100, 700, 1750]

export const isYolEvolving = (yol: Yol) => {
	// return evolutionLevels.includes(yol.xp)
	return (
		(yol.species.stage == SpeciesStages.EGG && yol.xp >= 100) ||
		(yol.species.stage == SpeciesStages.BABY && yol.xp >= 700) ||
		(yol.species.stage == SpeciesStages.ADO && yol.xp >= 1750)
	)
}

export const getEvolutionStep = (yol: Yol) => {
	if (yol.species.stage == SpeciesStages.EGG && yol.xp >= 100) return 0
	if (yol.species.stage == SpeciesStages.BABY && yol.xp >= 700) return 1
	if (yol.species.stage == SpeciesStages.ADO && yol.xp >= 1750) return 2
	return undefined
}

export const sortUserSuccess = (data: UserSuccess[]) => {
	data.sort((a, b) => {

		const ratioA = a.actualAmount / a.success.amountNeeded
		const ratioB = b.actualAmount / b.success.amountNeeded

		if (ratioA >= 1 && ratioB < 1) {
			return -1
		}
		if (ratioA < 1 && ratioB >= 1) {
			return 1
		}
		// Vérifier si a et b sont de type "Daily"
		const isADaily = a.success.type === SuccessType.DAILY
		const isBDaily = b.success.type === SuccessType.DAILY

		// Placer les succès de type "Daily" en premier
		if (isADaily && !isBDaily) {
			return -1
		}
		if (!isADaily && isBDaily) {
			return 1
		}

		// Comparaison basée sur le ratio de progression
		if (ratioA > ratioB) {
			return -1
		}
		if (ratioA < ratioB) {
			return 1
		}

		// A progression égale, on trie alphabétiquement
		if (a.success.title > b.success.title) {
			return 1
		}
		if (a.success.title < b.success.title) {
			return -1
		}

		return 0
	})
}

export const getThemeBySpecies = (
	speciesName: SpeciesNames,
	mode: 'light' | 'dark',
) => {
	switch (mode) {
		case 'light':
			switch (speciesName) {
				case SpeciesNames.GRUMPFISH:
					return themes.find((theme) => theme.name == 'lightBlue') ?? themes[7]
				case SpeciesNames.BUMBLEBLINK:
					return (
						themes.find((theme) => theme.name == 'lightYellow') ?? themes[7]
					)
				case SpeciesNames.GREENBELLY:
					return themes.find((theme) => theme.name == 'lightGreen') ?? themes[7]
			}

		case 'dark':
			switch (speciesName) {
				case SpeciesNames.GRUMPFISH:
					return themes.find((theme) => theme.name == 'darkBlue') ?? themes[7]
				case SpeciesNames.BUMBLEBLINK:
					return themes.find((theme) => theme.name == 'darkYellow') ?? themes[7]
				case SpeciesNames.GREENBELLY:
					return themes.find((theme) => theme.name == 'darkGreen') ?? themes[7]
			}
	}
}

const levels = [
	{ level: 1, levelMin: 0, levelMax: 100 },
	{ level: 2, levelMin: 100, levelMax: 250 },
	{ level: 3, levelMin: 250, levelMax: 450 },
	{ level: 4, levelMin: 450, levelMax: 700 },
	{ level: 5, levelMin: 700, levelMax: 1000 },
	{ level: 6, levelMin: 1000, levelMax: 1350 },
	{ level: 7, levelMin: 1350, levelMax: 1750 },
	{ level: 8, levelMin: 1750, levelMax: 2200 },
	{ level: 9, levelMin: 2200, levelMax: 2700 },
	{ level: 10, levelMin: 2700, levelMax: 3250 },
	{ level: 11, levelMin: 3250, levelMax: 3850 },
	{ level: 12, levelMin: 3850, levelMax: 4500 },
	{ level: 13, levelMin: 4500, levelMax: 5200 },
	{ level: 14, levelMin: 5200, levelMax: 5950 },
	{ level: 15, levelMin: 5950, levelMax: 6750 },
	{ level: 16, levelMin: 6750, levelMax: 7600 },
	{ level: 17, levelMin: 7600, levelMax: 8500 },
	{ level: 18, levelMin: 8500, levelMax: 9450 },
	{ level: 19, levelMin: 9450, levelMax: 10450 },
	{ level: 20, levelMin: 10450, levelMax: 10450 },
]

export const getYolCurrentLevel = (xp: number) => {
	for (const level of levels) {
		if (xp >= level.levelMin && xp < level.levelMax) {
			return level
		}
	}

	return levels[0]
}

export const getNumberOfYolEvolution = (yol: Yol | undefined) => {
	switch (yol?.species.stage) {
		case SpeciesStages.EGG:
			return 0
		case SpeciesStages.BABY:
			return 1
		case SpeciesStages.ADO:
			return 2
		case SpeciesStages.FINAL:
			return 3
		default:
			return 0
	}
}

export const getFormattedDate = (dateString: string) => {
	const date = new Date(dateString)
	const options = {
		day: '2-digit' as const,
		month: '2-digit' as const,
		year: 'numeric' as const,
		timeZone: 'Europe/Paris',
	}
	const formattedDate = new Intl.DateTimeFormat('fr-FR', options).format(date)
	return formattedDate
}
