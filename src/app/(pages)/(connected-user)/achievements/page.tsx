'use client'

import Box from '@/app/components/ui/Box'
import achievementsList from './tempAchievements.json'
import AchievementTile from '../../../components/achievements/AchievementTile'
import { useFetchAllUserSuccessQuery } from '@/services/queries/success'
import { UserSuccess } from '@/type/success.type'
import Tabs from '@/app/components/ui/Tabs'
import { useState } from 'react'

export enum AchievementType {
	Pending = 'pending',
	Completed = 'completed',
}

const AchievementsPage = () => {
	const { data: userSuccess, isLoading: userSuccessLoading } =
		useFetchAllUserSuccessQuery()

	const [achievementType, setAchievementType] = useState<AchievementType>(
		AchievementType.Pending,
	)

	achievementsList.sort((a, b) => {
		if (a.progress / a.goal > b.progress / b.goal) return -1
		if (a.progress / a.goal < b.progress / b.goal) return 1
		// A progression égale, on trie alphabétiquement
		if (a.title > b.title) return 1
		if (a.title < b.title) return -1

		return 0
	})

	const pendingAchievements = userSuccess?.filter(
		(achievement) => !achievement.is_completed,
	)
	const completedAchievements = userSuccess?.filter(
		(achievement) => achievement.is_completed,
	)

	return (
		userSuccess && (
			<>
				<h1 className='text-4xl text-white my-[2rem]'>MES SUCCÈS</h1>
				<div className='w-full flex flex-col items-center '>
					<Box centerItems additionalStyle='gap-y-[2rem] lg:w-[65%] mb-[2rem] '>
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
						<div className='lg:w-full lg:max-h-[30rem] lg:overflow-y-auto gap-y-[2rem] flex flex-col items-center mb-8'>
							{(achievementType === AchievementType.Pending
								? pendingAchievements
								: completedAchievements
							)?.map((achievement) => (
								<AchievementTile
									title={achievement.success.title}
									description={achievement.success.description}
									xp={achievement.success.success_xp}
									goal={achievement.success.amount_needed}
									progress={achievement.actual_amount}
									isCompleted={achievement.is_completed}
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
