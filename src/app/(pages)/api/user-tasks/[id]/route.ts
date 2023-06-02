import { NextResponse } from 'next/server'
import userTasksData from '../../../../../data/user-tasks.json'

export function GET(request: Request, { params }: { params: { id: string } }) {
	const userId = params.id
	return NextResponse.json(
		userTasksData.filter((userTask) => userTask.user_id === Number(userId)),
	)
}
