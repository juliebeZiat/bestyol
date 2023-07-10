import { useMutation, useQueryClient } from '@tanstack/react-query'
import yolService from '../yolService'

export const useMutationCreateYol = () => {
	return useMutation(
		async (values: { name: string; userId: number; speciesId: number }) =>
			await yolService.createYol({
				name: values.name,
				userId: values.userId,
				speciesId: values.speciesId,
			}),
	)
}

export const useMutationEvolveYol = () => {
	const queryClient = useQueryClient()
	return useMutation(
		async ({ yolId }: { yolId: number }) => {
			return await yolService.evolveYol(yolId)
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['yol'])
			},
		},
	)
}
