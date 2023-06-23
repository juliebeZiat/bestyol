import { Yol } from './yol.type'

export enum SuccessType {
	DAILY = 'Daily',
	UNIQUE = 'Unique',
	YOL = 'Yol',
}
export interface Success {
	id: number
	title: string
	description: string
	amountNeeded: number
	successXp: number
	type: SuccessType
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
