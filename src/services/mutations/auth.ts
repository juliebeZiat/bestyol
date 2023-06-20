import { useMutation } from '@tanstack/react-query'
import authService from '../authService'

export const useMutationSignIn = () => {
	return useMutation(
		async (data: { username: string; password: string }) =>
			await authService.signIn({
				username: data.username,
				password: data.password,
			}),
	)
}
