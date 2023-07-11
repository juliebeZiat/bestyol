import { useMutation, useQueryClient } from '@tanstack/react-query'
import successService from '../successService'

export const useMutationValidateUserSuccess = () => {
	const queryClient = useQueryClient()
	return useMutation(
		async ({
			userSuccessId,
			yolId,
		}: {
			userSuccessId: number
			yolId: number
		}) => {
			return await successService.validateUserSuccess(userSuccessId, {
				yolId,
			})
		},
		{
			onSuccess: () => {
				setTimeout(() => {
					queryClient.invalidateQueries(['yol'])
					queryClient.invalidateQueries(['userSuccess'])
				}, 3300)
			},
		},
	)
}
