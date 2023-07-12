import { useMutationGenerateDailyTasks } from '@/services/mutations/tasks'
import DailyTaskItem from './DailyTaskItem'
import { useEffect, useState } from 'react'
import { useAppSelector } from '@/state/hooks'
import { RootState } from '@/state/store'
import Loader from '../../ui/Loader'
import { UserTask } from '@/type/tasks.type'

interface DailyTaskBoxProps {
	dailyTasks: UserTask[]
	isLoading: boolean
}

const DailyTaskBox = ({ dailyTasks, isLoading }: DailyTaskBoxProps) => {
	const user = useAppSelector((state: RootState) => state.user.user)
	const { mutateAsync: generateDailyTasks } = useMutationGenerateDailyTasks()

	useEffect(() => {
		if (isLoading) return

		const data = { userId: user.id }
		const sendRequest = async () => {
			await generateDailyTasks(data)
		}

		if (dailyTasks.length == 0) sendRequest()
	}, [dailyTasks])

	if (!dailyTasks) return null
	if (isLoading) return <Loader />

	return (
		<div className='lg:grid grid-cols-2 gap-8 lg:px-4 mt-4 perspective'>
			{dailyTasks.map((task) => (
				<DailyTaskItem
					id={task.id}
					title={task.dailyTask?.title || ''}
					xp={task.dailyTask?.xp || 0}
					is_completed={task.isCompleted}
					image={task.dailyTask?.image}
					key={task.id}
				/>
			))}
		</div>
	)
}

export default DailyTaskBox
