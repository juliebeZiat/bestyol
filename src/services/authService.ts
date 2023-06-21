import { LoginRequest, LoginResponse } from '@/type/auth.type'
import axios from 'axios'

const signIn = async ({ username, password }: LoginRequest) => {
	console.log(process.env.NEXT_PUBLIC_API_URL);
	const response = await axios.post<LoginResponse>(`${process.env.NEXT_PUBLIC_API_URL}/api/user/login`, {
		username,
		password,
	})
	return response.data
}

const authService = {
	signIn,
}

export default authService
