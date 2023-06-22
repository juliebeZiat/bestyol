import { Theme } from '@/state/reducer/user.reducer'

export interface Species {
	id: number
	name: SpeciesNames
	image: string
	gif: string
	stage: SpeciesStages
}

export interface Level {
	level: number
	levelMin: number
	levelMax: number
}

export interface Yol {
	id: number
	userId: number
	speciesId: number
	name: string
	xp: number
	level: Level
	species: Species
}

export interface SpeciesModifiedData {
	id: number
	name: SpeciesNames
	image: string
	gif: string
	stage: SpeciesStages
	pos: number
	theme: Theme
}

export interface EvolutionAssets {
	previousForm: string
	newForm: string
	animatedNewForm: string
}

export interface CreateYolRequest {
	name: string
	userId: number
	speciesId: number
}

export interface CreateYolReponse {
	yol: Yol
}

export enum SpeciesStages {
	EGG = 'Egg',
	BABY = 'Baby',
	ADO = 'Adolescent',
	FINAL = 'Final',
}

export enum SpeciesNames {
	GRUMPFISH = 'Grumpfish',
	BUMBLEBLINK = 'Bumbleblink',
	GREENBELLY = 'Greenbelly',
}
