import { useQuery } from '@tanstack/react-query'
import userService from '../userService'

export const useFetchUserById = (id: number) => {
	return useQuery(['user', id], async () => await userService.fetchUserById(id))
}
