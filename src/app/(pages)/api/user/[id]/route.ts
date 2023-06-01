import { NextResponse } from 'next/server'
import userData from '../../../../../data/user.json'

export function GET(request: Request, { params }: { params: { id: string } }) {
	const userId = params.id
	return NextResponse.json(userData.find((user) => user.id === Number(userId)))
}
