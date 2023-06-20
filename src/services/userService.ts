import { User } from '@/type/user.type'
import axios from 'axios'

const fetchUserById = async (id: number) => {
	const response = await axios.get<User>(`/api/user/${id}`)
	return response
}

const userService = {
	fetchUserById,
}

export default userService
