import {
	LoginRequest,
	LoginResponse,
	SignupRequest,
	SignupResponse,
} from '@/type/auth.type'
import axios from 'axios'

const signIn = async ({ username, password }: LoginRequest) => {
	const response = await axios.post<LoginResponse>(
		`${process.env.NEXT_PUBLIC_API_URL}/api/user/login`,
		{
			username,
			password,
		},
	)
	return response.data
}

const signUp = async ({ username, email, password }: SignupRequest) => {
	const response = await axios.post<SignupResponse>(
		`${process.env.NEXT_PUBLIC_API_URL}/api/user/signup`,
		{
			username,
			email,
			password,
		},
	)
	return response.data
}

const authService = {
	signIn,
	signUp,
}

export default authService
