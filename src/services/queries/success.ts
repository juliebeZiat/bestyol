import { useQuery } from '@tanstack/react-query'
import successService from '../successService'

export const useFetchAllSuccessQuery = () => {
	return useQuery(
		['success'],
		async () => await successService.fetchAllSuccess(),
	)
}

export const useFetchAllUserSuccessQuery = () => {
	return useQuery(
		['userSuccess'],
		async () => await successService.fetchAllUserSuccess(),
	)
}
