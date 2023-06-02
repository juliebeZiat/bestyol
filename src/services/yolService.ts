import { Yol } from '@/type/yol.type'
import axios from 'axios'

const fetchUserYol = async (id: number) => {
	const response = await axios.get<Yol>(`api/yol/${id}`)
	return response
}

const yolServive = {
	fetchUserYol,
}

export default yolServive
