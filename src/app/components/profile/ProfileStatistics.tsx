import { useFetchAllUserSuccessQuery } from '@/services/queries/success'
import Box from '../ui/Box'
import { useAppSelector } from '@/state/hooks'
import { RootState } from '@/state/store'
import { useFetchAllUserTasks } from '@/services/queries/tasks'
import { useFetchUserYol } from '@/services/queries/yol'
import { getFormattedDate, getNumberOfYolEvolution } from '@/utils/utils'

const ProfileStatistics = () => {
	const user = useAppSelector((state: RootState) => state.user.user)

	// Succès complétés
	const { data: userSuccessData } = useFetchAllUserSuccessQuery(user.id)
	const completedUserSuccess = userSuccessData?.data.userSuccess.filter(
		(userSuccess) => userSuccess.isCompleted,
	)

	// Tâches quotidiennes achevées
	const { data: tasksData } = useFetchAllUserTasks(user.id)
	const completedDailyTasks = tasksData?.data.dailyTasks.filter(
		(task) => task.isCompleted,
	)

	// Évolution de Yol
	const { data: yolData } = useFetchUserYol(user.id)
	const numberOfYolEvolution = getNumberOfYolEvolution(yolData?.data)

	return (
		<Box additionalStyle='min-w-[300px] max-w-[300px] min-h-[400px] border-white border-2'>
			<div className='flex flex-col items-center gap-5'>
				<h2 className='text-center text-4xl tracking-wider'>Statistiques</h2>
				<div>
					<ul className='text-xl'>
						<li>• {completedUserSuccess?.length} succès complétés</li>
						<li>
							• {completedDailyTasks?.length} tâches quotidiennes achevées
						</li>
						<li>• {numberOfYolEvolution} évolution de Yol</li>
						<li>• {yolData?.data.xp} points d'expériences acquis</li>
						<li>• Membre depuis le {getFormattedDate(user.createdAt)}</li>
					</ul>
				</div>
			</div>
		</Box>
	)
}

export default ProfileStatistics
