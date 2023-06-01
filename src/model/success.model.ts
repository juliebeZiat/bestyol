export interface Success {
	id: number
	title: string
	description: string
	amount_needed: string
	success_xp: number
}

export interface UserSuccess {
	id: number
	user_id: number
	actual_amount: number
	is_completed: boolean
	success_id: number
}
