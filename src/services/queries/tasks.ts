import { useQuery } from '@tanstack/react-query'
import userTasksService from '../tasksService'

export const useFetchAllUserTasks = (id: number) => {
	return useQuery(
		['userTasks', id],
		async () => await userTasksService.fetchAllUserTasks(id),
	)
}

export const usePostNewUserTask = (id: number, taskName: string) => {
	return useQuery(
		['newUserTask', taskName, id],
		async () => await userTasksService.createNewUserTask(taskName, id),
	)
}

export const useEditUserTask = (taskId: number, taskName: string) => {
	return useQuery(
		['editUserTask', taskName, taskId],
		async () => await userTasksService.editUserTask(taskName, taskId),
	)
}
