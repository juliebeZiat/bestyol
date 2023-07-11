import { useAppDispatch } from '@/state/hooks'
import { setAccessToken } from '@/state/reducer/user.reducer'
import { User } from '@/type/user.type'
import axios from 'axios'

const fetchUserById = async (id: number) => {
	const response = await axios.get<User>(`/api/user/${id}`)
	if (response.status === 403) {
		const dispatch = useAppDispatch()
		const refreshTokenResponse = await axios.post<{ accessToken: string }>(
			`${process.env.NEXT_PUBLIC_API_URL}/api/user/refreshTokens`,
		)
		dispatch(setAccessToken(refreshTokenResponse.data.accessToken))
	}
	return response
}

const userService = {
	fetchUserById,
}

export default userService
