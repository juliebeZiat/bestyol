import { Species } from '@/type/species.type'
import { CreateYolReponse, CreateYolRequest, Yol } from '@/type/yol.type'
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

const evolveYol = async (yolId: number) => {
	const response = await axios.patch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/yol/evolve/${yolId}`,
	)
	return response
}

const yolService = {
	createYol,
	fetchUserYol,
	fetchAllYolSpecies,
	evolveYol,
}

export default yolService
