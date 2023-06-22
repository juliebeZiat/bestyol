import { useMutation } from '@tanstack/react-query'
import authService from '../authService'

export const useMutationSignIn = () => {
	return useMutation(
		async (values: { username: string; password: string }) =>
			await authService.signIn({
				username: values.username,
				password: values.password,
			}),
	)
}

export const useMutationSignUp = () => {
	return useMutation(
		async (data: { username: string; email: string; password: string }) =>
			await authService.signUp({
				username: data.username,
				email: data.email,
				password: data.password,
			}),
	)
}
