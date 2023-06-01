import { Success, UserSuccess } from '@/model/success.model'
import axios from 'axios'

const fetchAllSuccess = async () => {
	const response = await axios.get<Success[]>('api/success')
	return response
}

const fetchAllUserSuccess = async () => {
	const response = await axios.get<UserSuccess[]>('api/user-success')
	return response
}

const successService = {
	fetchAllSuccess,
	fetchAllUserSuccess,
}

export default successService
