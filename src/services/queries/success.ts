import { useQuery } from '@tanstack/react-query'
import successService from '../successService'

// export const useFetchAllUserSuccessQuery = (userId: number) => {
// 	return {
// 		...useQuery(
// 			['userSuccess'],
// 			async () => await successService.fetchAllUserSuccess(userId),
// 		),
// 		data: useQuery(
// 			['success'],
// 			async () => await successService.fetchAllUserSuccess(userId),
// 		).data?.data.sort((a, b) => {
// 			if (
// 				a.actual_amount / a.success.amount_needed >
// 				b.actual_amount / b.success.amount_needed
// 			)
// 				return -1
// 			if (
// 				a.actual_amount / a.success.amount_needed <
// 				b.actual_amount / b.success.amount_needed
// 			)
// 				return 1
// 			// A progression égale, on trie alphabétiquement
// 			if (a.success.title > b.success.title) return 1
// 			if (a.success.title < b.success.title) return -1

// 			return 0
// 		})
// 	}
// }

export const useFetchAllUserSuccessQuery = (userId: number) => {
	return useQuery(
		['userSuccess'],
		async () => await successService.fetchAllUserSuccess(userId),
	)
}
