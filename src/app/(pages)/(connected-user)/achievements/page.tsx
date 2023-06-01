'use client'

import Box from '@/app/components/ui/Box'
import achievementsList from './tempAchievements.json'
import AchievementTile from '../../../components/achievements/AchievementTile'

interface AchievementProps {
	title: string
	description: string
	xp: number
	goal: number
	progress: number
}

const AchievementsPage = () => {
	achievementsList.sort((a, b) => {
		if (a.progress / a.goal > b.progress / b.goal) return -1
		if (a.progress / a.goal < b.progress / b.goal) return 1
		// A progression égale, on trie alphabétiquement
		if (a.title > b.title) return 1
		if (a.title < b.title) return -1

		return 0
	})

	return (
		<>
			<h1 className='text-4xl text-white my-[2rem]'>MES SUCCÈS</h1>
			<div className='w-full flex flex-col items-center'>
				<Box centerItems additionalStyle='gap-y-[2rem] lg:w-[65%] mb-[2rem]'>
					{achievementsList.map((achievement: AchievementProps) => {
						return (
							<AchievementTile
								title={achievement.title}
								description={achievement.description}
								xp={achievement.xp}
								goal={achievement.goal}
								progress={achievement.progress}
							/>
						)
					})}
				</Box>
			</div>
		</>
	)
}

export default AchievementsPage
