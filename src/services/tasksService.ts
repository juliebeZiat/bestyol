import { UserTasks } from '@/type/tasks.type'
import axios from 'axios'

const fetchAllUserTasks = async (id: number) => {
	const response = await axios.get<UserTasks[]>(`${process.env.NEXT_PUBLIC_API_URL}/api/user-tasks/${id}`)
	return response
}
const createNewUserTask = async (taskName: string, userId: number, token: string) => {
	const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/user-tasks/${userId}`, {
		title: taskName
	}, {
		headers: { Authorization: `Bearer ${token}` }
	})
	return response
}

const userTasksService = {
	fetchAllUserTasks,
	createNewUserTask,
}

export default userTasksService
