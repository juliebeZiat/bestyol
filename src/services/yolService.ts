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

const fetchUserYol = async (id: number) => {
	const response = await axios.get<Yol>(`api/yol/${id}`)
	return response
}

const yolServive = {
	createYol,
	fetchUserYol,
}

export default yolServive
