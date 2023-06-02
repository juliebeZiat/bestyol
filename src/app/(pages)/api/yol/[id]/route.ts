import { NextResponse } from 'next/server'
import userYol from '../../../../../data/yol.json'

export function GET(request: Request, { params }: { params: { id: string } }) {
	const userId = params.id
	return NextResponse.json(
		userYol.find((userYol) => userYol.user_id === Number(userId)),
	)
}
