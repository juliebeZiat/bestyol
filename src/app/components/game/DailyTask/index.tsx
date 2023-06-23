import DailyTaskItem from './DailyTaskItem'
import { UserTasks } from '@/type/tasks.type'

interface DailyTaskBoxProps {
	dailyTasks: UserTasks[]
}

const DailyTaskBox = ({ dailyTasks }: DailyTaskBoxProps) => {
	if (!dailyTasks) return null
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
			<DailyTaskItem
				title={'task1'}
				xp={10}
				is_completed={false}
				image={'/assets/tasks/1.svg'}
			/>
			<DailyTaskItem
				title={'task2'}
				xp={20}
				is_completed={false}
				image={'/assets/tasks/2.svg'}
			/>
			<DailyTaskItem
				title={'task3'}
				xp={10}
				is_completed={false}
				image={'/assets/tasks/3.svg'}
			/>
			<DailyTaskItem
				title={'task4'}
				xp={10}
				is_completed={false}
				image={'/assets/tasks/4.svg'}
			/>
			<DailyTaskItem
				title={'task5'}
				xp={10}
				is_completed={false}
				image={'/assets/tasks/5.svg'}
			/>
			<DailyTaskItem
				title={'task6'}
				xp={10}
				is_completed={false}
				image={'/assets/tasks/6.svg'}
			/>
		</div>
	)
}

export default DailyTaskBox
