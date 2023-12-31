'use client'
import Box from '@/app/components/ui/Box'
import AchievementTile from '../../../components/achievements/AchievementTile'
import { useFetchAllUserSuccessQuery } from '@/services/queries/success'
import Tabs from '@/app/components/ui/Tabs'
import { useState } from 'react'
import { useAppSelector } from '@/state/hooks'
import { RootState } from '@/state/store'

enum AchievementType {
	Pending = 'pending',
	Completed = 'completed',
}

const AchievementsPage = () => {
	const userId = useAppSelector((state: RootState) => state.user.user.id)

	const { data: userSuccess } = useFetchAllUserSuccessQuery(userId)

	const [achievementType, setAchievementType] = useState<AchievementType>(
		AchievementType.Pending,
	)

	const pendingAchievements = userSuccess?.data.userSuccess.filter(
		(achievement) => !achievement.isCompleted,
	)
	const completedAchievements = userSuccess?.data.userSuccess.filter(
		(achievement) => achievement.isCompleted,
	)

	return (
		userSuccess && (
			<>
				<h1 className='text-4xl text-white my-[2rem] mt-40 md:mt-0'>
					MES SUCCÈS
				</h1>
				<div className='w-full flex flex-col items-center h-[80vh]'>
					<Box
						centerItems
						additionalStyle='gap-y-[2rem] lg:w-[65%] w-[90%] mb-[2rem] py-[50px] grow h-full justify-center'
					>
						<div>
							<Tabs
								activeItemsTitle='En cours'
								archivedItemsTitle='Terminés'
								activeItemsCondition={
									achievementType === AchievementType.Pending
								}
								archivedItemsCondition={
									achievementType === AchievementType.Completed
								}
								setActiveItems={() =>
									setAchievementType(AchievementType.Pending)
								}
								setArchivedItems={() =>
									setAchievementType(AchievementType.Completed)
								}
							/>
						</div>
						<div className='w-full lg:max-h-[80%] overflow-y-auto gap-y-[2rem] flex flex-col items-center mb-8 h-full'>
							{(achievementType === AchievementType.Pending
								? pendingAchievements
								: completedAchievements
							)?.map((achievement) => (
								<AchievementTile
									achievement={achievement}
									key={achievement.id}
								/>
							))}
						</div>
					</Box>
				</div>
			</>
		)
	)
}

export default AchievementsPage
