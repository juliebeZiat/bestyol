import { Yol } from './yol.type'

export interface Success {
	id: number
	title: string
	description: string
	amountNeeded: number
	successXp: number
	image: string
}

export interface UserSuccess {
	id: number
	userId: number
	actualAmount: number
	isCompleted: boolean
	successId: number
	success: Success
}

export interface ValidateSuccessRequest {
	yolId: number
}

export interface ValidateSuccessResponse {
	message: string
	yol: Yol
}
