import {
	CreateYolReponse,
	CreateYolRequest,
	Species,
	Yol,
} from '@/type/yol.type'
import axios from 'axios'

const createYol = async ({ name, userId, speciesId }: CreateYolRequest) => {
	const response = await axios.post<CreateYolReponse>(
		`${process.env.NEXT_PUBLIC_API_URL}/api/yol/create`,
		{
			name,
			userId,
			speciesId,
		},
	)
	return response.data
}

const fetchUserYol = async (userId: number) => {
	const response = await axios.get<Yol>(
		`${process.env.NEXT_PUBLIC_API_URL}/api/yol/user/${userId}`,
	)
	return response
}

const fetchAllYolSpecies = async () => {
	const response = await axios.get<{ species: Species[] }>(
		`${process.env.NEXT_PUBLIC_API_URL}/api/species`,
	)
	return response
}

const yolService = {
	createYol,
	fetchUserYol,
	fetchAllYolSpecies,
}

export default yolService
