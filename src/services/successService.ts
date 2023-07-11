import { useAppDispatch } from '@/state/hooks'
import { setAccessToken } from '@/state/reducer/user.reducer'
import {
	UserSuccess,
	ValidateSuccessRequest,
	ValidateSuccessResponse,
} from '@/type/success.type'
import axios from 'axios'

const fetchAllUserSuccess = async (userId: number) => {
	const response = await axios.get<{ userSuccess: UserSuccess[] }>(
		`${process.env.NEXT_PUBLIC_API_URL}/api/user-success/${userId}`,
	)
	if (response.status === 403) {
		const dispatch = useAppDispatch()
		const refreshTokenResponse = await axios.post<{ accessToken: string }>(
			`${process.env.NEXT_PUBLIC_API_URL}/api/user/refreshTokens`,
		)
		dispatch(setAccessToken(refreshTokenResponse.data.accessToken))
	}
	return response
}

const validateUserSuccess = async (
	userSuccessId: number,
	{ yolId }: ValidateSuccessRequest,
) => {
	const response = await axios.patch<ValidateSuccessResponse>(
		`${process.env.NEXT_PUBLIC_API_URL}/api/user-success/validate/${userSuccessId}`,
		{
			yolId,
		},
	)
	if (response.status === 403) {
		const dispatch = useAppDispatch()
		const refreshTokenResponse = await axios.post<{ accessToken: string }>(
			`${process.env.NEXT_PUBLIC_API_URL}/api/user/refreshTokens`,
		)
		dispatch(setAccessToken(refreshTokenResponse.data.accessToken))
	}
	return response.data
}

const successService = {
	fetchAllUserSuccess,
	validateUserSuccess,
}

export default successService
