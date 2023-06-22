export interface DailyTasks {
	id: number
	title: string
	category: string
	difficulty: number
	xp: number
	image: string
}

export interface UserTasks {
	id: number
	user_id: number
	title?: string
	is_daily: boolean
	is_completed: boolean
	completed_at: Date
	dailyTask?: DailyTasks
}

export interface TasksResponse {
	customTasks: UserTasks[]
	dailyTasks: UserTasks[]
}