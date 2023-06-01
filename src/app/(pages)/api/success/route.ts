import { NextResponse } from 'next/server'
import successData from '../../../../data/success.json'

export function GET() {
	return NextResponse.json(successData)
}
