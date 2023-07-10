export interface DailyTasks {
	id: number
	title: string
	category: string
	difficulty: number
	xp: number
	image: string
}

export interface UserTask {
	id: number
	title: string
	isDaily: boolean
	isCompleted: boolean
	completedAt: Date
	userId: number
	dailyTaskId: number
	dailyTask?: DailyTasks
	createdAt: string
}

export interface TasksResponse {
	customTasks: UserTask[]
	dailyTasks: UserTask[]
}

export interface ValidateDailyTaskRequest {
	yolId: number
}

export interface ValidateDailyTaskResponse {
	message: string
	yolXpGain: number
	updatedTask: UserTask
}
