import { LoginRequest, LoginResponse } from '@/type/auth.type'
import axios from 'axios'

const signIn = async ({ username, password }: LoginRequest) => {
	const response = await axios.post<LoginResponse>('/api/user/login', {
		username,
		password,
	})
	return response.data
}

const authService = {
	signIn,
}

export default authService
