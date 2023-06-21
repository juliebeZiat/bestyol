import { useMutation } from '@tanstack/react-query'
import yolServive from '../yolService'

export const useMutationCreateYol = () => {
	return useMutation(
		async (values: { name: string; userId: number; speciesId: number }) =>
			await yolServive.createYol({
				name: values.name,
				userId: values.userId,
				speciesId: values.speciesId,
			}),
	)
}
