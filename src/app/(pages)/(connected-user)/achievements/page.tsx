'use client'

import Box from '@/app/components/ui/Box'
import achievementsList from './tempAchievements.json'
import AchievementTile from '../../../components/achievements/AchievementTile'
import {
	useFetchAllSuccessQuery,
	useFetchAllUserSuccessQuery,
} from '@/services/queries/success'
import { UserSuccess } from '@/type/success.type'

interface AchievementProps {
	title: string
	description: string
	xp: number
	goal: number
	progress: number
}

const AchievementsPage = () => {
	const { data: userSuccess, isLoading: userSuccessLoading } =
		useFetchAllUserSuccessQuery()
	const { data: success } = useFetchAllSuccessQuery()
	achievementsList.sort((a, b) => {
		if (a.progress / a.goal > b.progress / b.goal) return -1
		if (a.progress / a.goal < b.progress / b.goal) return 1
		// A progression égale, on trie alphabétiquement
		if (a.title > b.title) return 1
		if (a.title < b.title) return -1

		return 0
	})

	return (
		userSuccess && (
			<>
				<h1 className='text-4xl text-white my-[2rem]'>MES SUCCÈS</h1>
				<div className='w-full flex flex-col items-center'>
					<Box centerItems additionalStyle='gap-y-[2rem] lg:w-[65%] mb-[2rem]'>
						{userSuccess.map((achievement: UserSuccess) => {
							return (
								<AchievementTile
									title={achievement.success.title}
									description={achievement.success.description}
									xp={achievement.success.success_xp}
									goal={achievement.success.amount_needed}
									progress={achievement.actual_amount}
								/>
							)
						})}
					</Box>
				</div>
			</>
		)
	)
}

export default AchievementsPage
