import { NextResponse } from 'next/server'
import userData from '../../../../data/user.json'

export function GET() {
	return NextResponse.json(userData)
}
