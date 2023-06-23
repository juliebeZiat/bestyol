import {
	TasksResponse,
	ValidateDailyTaskRequest,
	ValidateDailyTaskResponse,
} from '@/type/tasks.type'
import axios from 'axios'

const fetchAllUserTasks = async (userId: number) => {
	const response = await axios.get<TasksResponse>(
		`${process.env.NEXT_PUBLIC_API_URL}/api/user-tasks/${userId}`,
	)
	return response
}

const generateDailyTasks = async (userId: number) => {
	const response = await axios.post<TasksResponse>(
		`${process.env.NEXT_PUBLIC_API_URL}/api/user-tasks/daily/${userId}`,
	)
	return response
}

const validateDailyTask = async (
	dailyTaskId: number,
	{ yolId }: ValidateDailyTaskRequest,
) => {
	const response = await axios.patch<ValidateDailyTaskResponse>(
		`${process.env.NEXT_PUBLIC_API_URL}/api/user-tasks/daily/${dailyTaskId}`,
		{
			yolId,
		},
	)
	return response.data
}

const validateCustomTask = async (customTaskId: number) => {
	const response = await axios.patch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/user-tasks/custom/${customTaskId}`,
	)
	return response.data
}

const createNewCustomTask = async (taskName: string, userId: number) => {
	const response = await axios.post(
		`${process.env.NEXT_PUBLIC_API_URL}/api/user-tasks/${userId}`,
		{
			title: taskName,
		},
	)
	return response
}

const editCustomTask = async (newTaskName: string, taskId: number) => {
	const response = await axios.put(
		`${process.env.NEXT_PUBLIC_API_URL}/api/user-tasks/${taskId}`,
		{
			title: newTaskName,
		},
	)
	return response
}

const deleteCustomTask = async (taskId: number) => {
	const response = await axios.delete(
		`${process.env.NEXT_PUBLIC_API_URL}/api/user-tasks/${taskId}`,
	)
	return response
}

const userTasksService = {
	fetchAllUserTasks,
	generateDailyTasks,
	validateDailyTask,
	validateCustomTask,
	createNewCustomTask,
	editCustomTask,
	deleteCustomTask,
}

export default userTasksService
