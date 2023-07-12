import {
	User,
	UserEditAvatarRequest,
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
		`${process.env.NEXT_PUBLIC_API_URL}/api/user/edit/username_email/${userId}`,
		{
			username,
			email,
		},
	)
	return response.data
}

const editUserPassword = async (
	userId: number,
	{ formerPassword, newPassword }: UserEditPasswordRequest,
) => {
	const response = await axios.patch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/user/edit/password/${userId}`,
		{
			formerPassword,
			newPassword,
		},
	)
	return response.data
}

const editUserAvatar = async (
	userId: number,
	{ pp }: UserEditAvatarRequest,
) => {
	const response = await axios.patch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/user/edit/pp/${userId}`,
		{
			pp,
		},
	)
	return response.data
}

const userService = {
	fetchUserById,
	editUserCredentials,
	editUserPassword,
	editUserAvatar,
}

export default userService
