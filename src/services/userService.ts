import { User } from '@/model/user.model'
import axios from 'axios'

const fetchUserById = async (id: number) => {
	const response = await axios.get<User>(`api/user/${id}`)
	return response
}

const userService = {
	fetchUserById,
}

export default userService
