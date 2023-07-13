import { useFetchAllUserSuccessQuery } from '@/services/queries/success'
import { useAppSelector } from '@/state/hooks'
import { RootState } from '@/state/store'
import { useFetchAllUserTasks } from '@/services/queries/tasks'
import { useFetchUserYol } from '@/services/queries/yol'
import { getFormattedDate, getNumberOfYolEvolution } from '@/utils/utils'

const ProfileStatistics = () => {
	const { user, theme } = useAppSelector((state: RootState) => state.user)

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
		<div
			className={`pixel-corners h-4/6 w-full ${theme.secondaryBackgroundColor} ${theme.pixelBorderColor} mt-10 text-white p-5`}
		>
			<h2 className='md:text-4xl text-xl tracking-wider mb-4'>
				ACCOMPLISSEMENTS
			</h2>
			<div>
				<ul className='text-xl'>
					<li>Succès complétés : {completedUserSuccess?.length}</li>
					<li>Tâches quotidiennes achevées : {completedDailyTasks?.length}</li>
					<li>Évolutions de Yol : {numberOfYolEvolution}</li>
					<li>Points d'expériences acquis : {yolData?.data.xp}</li>
					<li>Membre depuis le {getFormattedDate(user.createdAt)}</li>
				</ul>
			</div>
		</div>
	)
}

export default ProfileStatistics
