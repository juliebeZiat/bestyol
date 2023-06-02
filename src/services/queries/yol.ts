import { useQuery } from '@tanstack/react-query'
import yolServive from '../yolService'

export const useFetchUserYol = (id: number) => {
	return useQuery(['yol', id], async () => await yolServive.fetchUserYol(id))
}
