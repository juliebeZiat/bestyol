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
	userId: number
	speciesId: number
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

export interface CreateYolRequest {
	name: string
	userId: number
	speciesId: number
}

export interface CreateYolReponse {
	yol: Yol
}
