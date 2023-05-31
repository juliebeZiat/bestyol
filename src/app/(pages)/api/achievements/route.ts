import { NextResponse } from 'next/server'
import achievementsData from '../../../../data/achievement.json'

export function GET() {
	return NextResponse.json(achievementsData)
}
