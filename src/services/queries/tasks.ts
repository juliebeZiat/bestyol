import { useQuery } from '@tanstack/react-query'
import userTasksService from '../tasksService'

export const useFetchAllUserTasks = (id: number) => {
	return useQuery(
		['userTasks', id],
		async () => await userTasksService.fetchAllUserTasks(id),
	)
}

export const usePostNewUserTask = (id: number, taskName: string, token: string) => {
	return useQuery(
		['newUserTask', taskName, id],
		async () => await userTasksService.createNewUserTask(taskName, id, token),
	)
}
