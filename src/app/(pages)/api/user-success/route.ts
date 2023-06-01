import { NextResponse } from 'next/server'
import userSuccessData from '../../../../data/user-success.json'

export function GET() {
	return NextResponse.json(userSuccessData)
}
