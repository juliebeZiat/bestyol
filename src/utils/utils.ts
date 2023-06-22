import { UserSuccess } from '@/type/success.type'
import { EvolutionAssets, Yol } from '@/type/yol.type'
import { themes } from './themes'
import { SpeciesNames } from '@/type/species.type'

export const evolutionLevels = [100, 700, 1750]

export const isYolEvolving = (yol: Yol) => {
	return evolutionLevels.includes(yol.xp)
}

export const getEvolutionStep = (yol: Yol) => {
	if (yol) return evolutionLevels.indexOf(yol.xp)
	else return undefined
}

export const getEvolutionAssets = (yol: Yol) => {
	if (yol) {
		let evolutionAssets: EvolutionAssets
		switch (getEvolutionStep(yol)) {
			case 0:
				evolutionAssets = {
					previousForm: `/assets/yols/egg/animated/${yol.species.name}.gif`,
					newForm: `/assets/yols/base/static/${yol.species.name}.png`,
					animatedNewForm: `/assets/yols/base/animated/${yol.species.name}.gif`,
				}
				break

			case 1:
				evolutionAssets = {
					previousForm: `/assets/yols/base/static/${yol.species.name}.png`,
					newForm: `/assets/yols/second/static/${yol.species.name}.png`,
					animatedNewForm: `/assets/yols/second/animated/${yol.species.name}.gif`,
				}
				break

			case 2:
				evolutionAssets = {
					previousForm: `/assets/yols/second/static/${yol.species.name}.png`,
					newForm: `/assets/yols/third/static/${yol.species.name}.png`,
					animatedNewForm: `/assets/yols/third/animated/${yol.species.name}.gif`,
				}
				break

			default:
				evolutionAssets = {
					previousForm: `/assets/yols/egg/animated/${yol.species.name}.gif`,
					newForm: `/assets/yols/base/static/${yol.species.name}.png`,
					animatedNewForm: `/assets/yols/base/animated/${yol.species.name}.gif`,
				}
				break
		}
		return evolutionAssets
	} else return undefined
}

export const sortUserSuccess = (data: UserSuccess[]) => {
	data.sort((a, b) => {
		if (
			a.actualAmount / a.success.amountNeeded >
			b.actualAmount / b.success.amountNeeded
		)
			return -1
		if (
			a.actualAmount / a.success.amountNeeded <
			b.actualAmount / b.success.amountNeeded
		)
			return 1
		// A progression égale, on trie alphabétiquement
		if (a.success.title > b.success.title) return 1
		if (a.success.title < b.success.title) return -1

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
					return themes[0]
				case SpeciesNames.BUMBLEBLINK:
					return themes[2]
				case SpeciesNames.GREENBELLY:
					return themes[4]
			}

		case 'dark':
			switch (speciesName) {
				case SpeciesNames.GRUMPFISH:
					return themes[1]
				case SpeciesNames.BUMBLEBLINK:
					return themes[3]
				case SpeciesNames.GREENBELLY:
					return themes[5]
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
		if (xp > level.levelMin && xp <= level.levelMax) {
			return level
		}
	}

	return levels[0]
}
