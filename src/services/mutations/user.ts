import { useMutation, useQueryClient } from '@tanstack/react-query'
import userService from '../userService'

export const useMutationEditUserUsernamePassword = () => {
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
			return await userService.editUserUsernamePassword(userId, {
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

export const useMutationEditUserPicture = () => {
	const queryClient = useQueryClient()
	return useMutation(
		async ({
			userId,
			pictureNumber,
		}: {
			userId: number
			pictureNumber: number
		}) => {
			return await userService.editUserPicture(userId, {
				pictureNumber,
			})
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['user'])
			},
		},
	)
}
