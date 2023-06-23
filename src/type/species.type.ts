import { Theme } from './type'

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

export interface Species {
	id: number
	name: SpeciesNames
	image: string
	gif: string
	stage: SpeciesStages
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
