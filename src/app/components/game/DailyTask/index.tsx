import { useMutationGenerateDailyTasks } from '@/services/mutations/tasks'
import DailyTaskItem from './DailyTaskItem'
import { UserTasks } from '@/type/tasks.type'
import { useEffect, useState } from 'react'
import { useAppSelector } from '@/state/hooks'
import { RootState } from '@/state/store'
import Loader from '../../ui/Loader'

interface DailyTaskBoxProps {
	dailyTasks: UserTasks[]
	isLoading: boolean
}

const DailyTaskBox = ({ dailyTasks, isLoading }: DailyTaskBoxProps) => {
	const user = useAppSelector((state: RootState) => state.user.user)
	const { mutateAsync: generateDailyTasks } = useMutationGenerateDailyTasks()
	const [hasSentRequest, setHasSentRequest] = useState(false)

	useEffect(() => {
		const data = { userId: user.id }

		const sendRequest = async () => {
			await generateDailyTasks(data)
			setHasSentRequest(true)
		}

		const currentDate = new Date().toISOString().split('T')[0]
		const storedDate = localStorage.getItem('lastRequestDate')

		if (storedDate !== currentDate) {
			sendRequest()
			localStorage.setItem('lastRequestDate', currentDate)
		}

		const interval = setInterval(() => {
			const date = new Date().toISOString().split('T')[0]
			if (storedDate !== date) {
				setHasSentRequest(false)
			}
		}, 24 * 60 * 60 * 1000)

		return () => {
			clearInterval(interval)
		}
	}, [])

	if (!dailyTasks) return null
	if (isLoading) return <Loader />

	return (
		<div className='lg:grid grid-cols-2 gap-8 lg:px-4 mt-4 perspective'>
			{dailyTasks.map((task) => (
				<DailyTaskItem
					title={task.dailyTask?.title || ''}
					xp={task.dailyTask?.xp || 0}
					is_completed={task.is_completed}
					key={task.id}
					image={task.dailyTask?.image}
				/>
			))}
		</div>
	)
}

export default DailyTaskBox
