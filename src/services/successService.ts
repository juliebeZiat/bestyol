import { Success, UserSuccess } from '@/type/success.type'
import axios from 'axios'

const fetchAllUserSuccess = async (userId: number) => {
	const response = await axios.get<{ userSuccess: UserSuccess[] }>(`${process.env.NEXT_PUBLIC_API_URL}/api/user-success/${userId}`)
	return response
}

const successService = {
	fetchAllUserSuccess,
}

export default successService
