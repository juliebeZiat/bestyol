import Box from '@/app/components/ui/Box'
import DailyTaskItem from './DailyTaskItem'

const DailyTaskBox = () => {
	const dailyTasks = [
		{
			id: 1,
			title: "Boire de l'eau",
			lvl: 10,
			status: true,
		},
		{
			id: 2,
			title: 'Préparer et manger un repas sain',
			lvl: 40,
			status: false,
		},
		{
			id: 3,
			title: "Faire 10 minutes d'activités physique",
			lvl: 40,
			status: false,
		},
		{
			id: 4,
			title: "Lire quelques pages d'un livre",
			lvl: 20,
			status: false,
		},
		{
			id: 5,
			title: 'Méditer pendant 10 minutes',
			lvl: 10,
			status: true,
		},
		{
			id: 6,
			title: 'Contacter un proche',
			lvl: 10,
			status: false,
		},
	]

	return (
		<div className='lg:grid grid-cols-2 gap-8 lg:px-4 mt-4'>
			{dailyTasks.map((task) => (
				<DailyTaskItem
					title={task.title}
					lvl={task.lvl}
					status={task.status}
					key={task.id}
				/>
			))}
		</div>
	)
}

export default DailyTaskBox
