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
		async ({
			userId,
			formerPassword,
			newPassword,
		}: {
			userId: number
			formerPassword: string
			newPassword: string
		}) => {
			return await userService.editUserPassword(userId, {
				formerPassword,
				newPassword,
			})
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['user'])
			},
		},
	)
}

export const useMutationEditUserAvatar = () => {
	const queryClient = useQueryClient()
	return useMutation(
		async ({ userId, pp }: { userId: number; pp: string }) => {
			return await userService.editUserAvatar(userId, {
				pp,
			})
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['user'])
			},
		},
	)
}
