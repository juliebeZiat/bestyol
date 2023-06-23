import { useQuery } from '@tanstack/react-query'
import userTasksService from '../tasksService'

export const useFetchAllUserTasks = (id: number) => {
	return useQuery(
		['userTasks', id],
		async () => await userTasksService.fetchAllUserTasks(id),
	)
}
