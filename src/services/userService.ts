import {
	User,
	UserEditPictureRequest,
	UserEditUsernameEmailRequest,
	UserEditPasswordRequest,
	UserEditUsernameEmailResponse,
	UserEditPictureResponse,
	UserDeleteAccountRequest,
} from '@/type/user.type'
import axios from 'axios'

const fetchUserById = async (id: number) => {
	const response = await axios.get<User>(`/api/user/${id}`)
	return response
}

const editUserUsernamePassword = async (
	userId: number,
	{ username, email }: UserEditUsernameEmailRequest,
) => {
	const response = await axios.patch<UserEditUsernameEmailResponse>(
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

const editUserPicture = async (
	userId: number,
	{ pictureNumber }: UserEditPictureRequest,
) => {
	const response = await axios.patch<UserEditPictureResponse>(
		`${process.env.NEXT_PUBLIC_API_URL}/api/user/edit/picture/${userId}`,
		{
			pictureNumber,
		},
	)
	return response.data
}

const deleteUser = async (
	userId: number,
	{ password }: UserDeleteAccountRequest,
) => {
	const response = await axios.delete(
		`${process.env.NEXT_PUBLIC_API_URL}/api/user/delete/${userId}`,
		{
			data: {
				password,
			},
		},
	)
	return response.data
}

const userService = {
	fetchUserById,
	editUserUsernamePassword,
	editUserPassword,
	editUserPicture,
	deleteUser,
}

export default userService
