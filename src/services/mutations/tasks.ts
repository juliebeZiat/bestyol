import { useMutation, useQueryClient } from '@tanstack/react-query'
import userTasksService from '../tasksService'

export const useMutationGenerateDailyTasks = () => {
	const queryClient = useQueryClient()
	return useMutation(
		async (payload: { userId: number }) =>
			await userTasksService.generateDailyTasks(payload.userId),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['userTasks'])
			},
		},
	)
}

export const useMutationValidateDailyTask = () => {
	const queryClient = useQueryClient()
	return useMutation(
		async ({ dailyTaskId, yolId }: { dailyTaskId: number; yolId: number }) => {
			return await userTasksService.validateDailyTask(dailyTaskId, {
				yolId,
			})
		},
		{
			onSuccess: () => {
				setTimeout(() => {
					queryClient.invalidateQueries(['yol'])
					queryClient.invalidateQueries(['userSuccess'])
					queryClient.invalidateQueries(['userTasks'])
				}, 1100)
			},
		},
	)
}

export const useMutationValidateCustomTask = () => {
	const queryClient = useQueryClient()
	return useMutation(
		async ({ customTaskId }: { customTaskId: number }) => {
			return await userTasksService.validateCustomTask(customTaskId)
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['userTasks'])
				queryClient.invalidateQueries(['userSuccess'])
			},
		},
	)
}

export const useMutationCreateNewCustomTask = () => {
	const queryClient = useQueryClient()
	return useMutation(
		async (payload: { userId: number; taskName: string }) => {
			return await userTasksService.createNewCustomTask(
				payload.taskName,
				payload.userId,
			)
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['userTasks'])
			},
		},
	)
}

export const useMutationEditCustomTask = () => {
	const queryClient = useQueryClient()
	return useMutation(
		async (payload: { taskId: number; taskName: string }) =>
			await userTasksService.editCustomTask(payload.taskName, payload.taskId),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['userTasks'])
			},
		},
	)
}

export const useMutationDeleteCustomTask = () => {
	const queryClient = useQueryClient()
	return useMutation(
		async (payload: { taskId: number }) =>
			await userTasksService.deleteCustomTask(payload.taskId),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['userTasks'])
			},
		},
	)
}
