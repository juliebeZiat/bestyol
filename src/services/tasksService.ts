import { TasksResponse } from '@/type/tasks.type'
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

const createNewUserTask = async (taskName: string, userId: number) => {
	const response = await axios.post(
		`${process.env.NEXT_PUBLIC_API_URL}/api/user-tasks/${userId}`,
		{
			title: taskName,
		},
	)
	return response
}

const editUserTask = async (newTaskName: string, taskId: number) => {
	const response = await axios.put(
		`${process.env.NEXT_PUBLIC_API_URL}/api/user-tasks/${taskId}`,
		{
			title: newTaskName,
		},
	)
	return response
}

const deleteUserTask = async (taskId: number) => {
	const response = await axios.delete(
		`${process.env.NEXT_PUBLIC_API_URL}/api/user-tasks/${taskId}`,
	)
	return response
}

const userTasksService = {
	fetchAllUserTasks,
	generateDailyTasks,
	createNewUserTask,
	editUserTask,
	deleteUserTask,
}

export default userTasksService
