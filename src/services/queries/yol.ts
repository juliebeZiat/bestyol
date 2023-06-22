import { useQuery } from '@tanstack/react-query'
import yolService from '../yolService'

export const useFetchUserYol = (id: number) => {
	return useQuery(['yol', id], async () => await yolService.fetchUserYol(id))
}

export const useFetchAllYolSpecies = () => {
	return useQuery(
		['species'],
		async () => await yolService.fetchAllYolSpecies(),
	)
}
