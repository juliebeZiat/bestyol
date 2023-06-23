import {
	UserSuccess,
	ValidateSuccessRequest,
	ValidateSuccessResponse,
} from '@/type/success.type'
import axios from 'axios'

const fetchAllUserSuccess = async (userId: number) => {
	const response = await axios.get<{ userSuccess: UserSuccess[] }>(
		`${process.env.NEXT_PUBLIC_API_URL}/api/user-success/${userId}`,
	)
	return response
}

const validateUserSuccess = async (
	userSuccessId: number,
	{ yolId }: ValidateSuccessRequest,
) => {
	const response = await axios.patch<ValidateSuccessResponse>(
		`${process.env.NEXT_PUBLIC_API_URL}/api/user-success/validate/${userSuccessId}`,
		{
			yolId,
		},
	)
	return response.data
}

const successService = {
	fetchAllUserSuccess,
	validateUserSuccess,
}

export default successService
