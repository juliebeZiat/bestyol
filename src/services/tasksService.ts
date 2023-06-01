import { UserTasks } from '@/type/tasks.type'
import axios from 'axios'

const fetchAllUserTasks = async (id: number) => {
	const response = await axios.get<UserTasks[]>(`api/user-tasks/${id}`)
	return response
}

const userTasksService = {
	fetchAllUserTasks,
}

export default userTasksService
