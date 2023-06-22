import { useQuery } from '@tanstack/react-query'
import successService from '../successService'
import { sortUserSuccess } from '@/utils/utils'

export const useFetchAllUserSuccessQuery = (userId: number) => {
	return useQuery(
		['userSuccess'],
		async () => await successService.fetchAllUserSuccess(userId),
		{
			onSuccess(data) {
				return sortUserSuccess(data.data.userSuccess)
			},
		},
	)
}
