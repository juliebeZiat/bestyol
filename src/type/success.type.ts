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
