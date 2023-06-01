import Box from '@/app/components/ui/Box'
import DailyTaskItem from './DailyTaskItem'
import { DailyTasks, UserTasks } from '@/type/tasks.type'

interface DailyTaskBoxProps {
	dailyTasks: UserTasks[]
}

const DailyTaskBox = ({ dailyTasks }: DailyTaskBoxProps) => {
	if (!dailyTasks) return null
	return (
		<div className='lg:grid grid-cols-2 gap-8 lg:px-4 mt-4'>
			{dailyTasks.map((task) => (
				<DailyTaskItem
					title={task.dailyTask?.title || ''}
					xp={task.dailyTask?.xp || 0}
					is_completed={task.is_completed}
					key={task.id}
				/>
			))}
		</div>
	)
}

export default DailyTaskBox
