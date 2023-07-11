import { useMutation, useQueryClient } from '@tanstack/react-query'
import userService from '../userService'

export const useMutationEditUserCredentials = () => {
	const queryClient = useQueryClient()
	return useMutation(
		async ({
			userId,
			username,
			email,
		}: {
			userId: number
			username?: string
			email?: string
		}) => {
			return await userService.editUserCredentials(userId, {
				username,
				email,
			})
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['user'])
			},
		},
	)
}

export const useMutationEditUserPassword = () => {
	const queryClient = useQueryClient()
	return useMutation(
		async ({ userId, password }: { userId: number; password: string }) => {
			return await userService.editUserPassword(userId, {
				password,
			})
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['user'])
			},
		},
	)
}
