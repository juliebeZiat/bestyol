export interface Species {
	id: number
	name: string
	image: string
}

export interface Level {
	level: number
	levelMin: number
	levelMax: number
}

export interface Yol {
	id: number
	user_id: number
	species_id: number
	name: string
	xp: number
	level: Level
	species: Species
}

export interface EvolutionAssets {
	previousForm: string
	newForm: string
	animatedNewForm: string
}