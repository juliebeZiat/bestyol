import {
	User,
	UserEditCredentialsRequest,
	UserEditPasswordRequest,
} from '@/type/user.type'
import axios from 'axios'

const fetchUserById = async (id: number) => {
	const response = await axios.get<User>(`/api/user/${id}`)
	return response
}

const editUserCredentials = async (
	userId: number,
	{ username, email }: UserEditCredentialsRequest,
) => {
	const response = await axios.patch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/user/edit/credentials/${userId}`,
		{
			username,
			email,
		},
	)
	return response.data
}

const editUserPassword = async (
	userId: number,
	{ password }: UserEditPasswordRequest,
) => {
	const response = await axios.patch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/user/edit/password/${userId}`,
		{
			password,
		},
	)
	return response.data
}

const userService = {
	fetchUserById,
	editUserCredentials,
	editUserPassword,
}

export default userService
