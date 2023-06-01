'use client'

import CustomTaskBox from '@/app/components/game/CustomTask'
import DailyTaskBox from '@/app/components/game/DailyTask'
import SuccessBox from '@/app/components/game/Success'
import YolBox from '@/app/components/game/Yol'
import Box from '@/app/components/ui/Box'
import Button, { ButtonSize } from '@/app/components/ui/Button'
import { useAuth } from '@/contexts/AuthContext'
import { useIsMobile } from '@/hooks/useWindowSize'
import { useFetchAllUserTasks } from '@/services/queries/tasks'
import Link from 'next/link'

const GamePage = () => {
	const { user } = useAuth()
	if (!user) return null
	const { data: tasks } = useFetchAllUserTasks(user.id)

	const dailyTasks = tasks?.data.filter((task) => task.is_daily === true)
	const customTasks = tasks?.data.filter((task) => task.is_daily === false)

	const isMobile = useIsMobile()
	return (
		<div className='lg:grid grid-cols-[30%_30%_35%] grid-flow-row gap-8 p-10 lg:w-[90vw]'>
			<Box additionalStyle='col-span-2 h-[20rem] mb-12 lg:mb-0'>
				<YolBox yolName='bonjour' />
			</Box>
			<Box
				additionalStyle='row-span-2 mb-12 lg:mb-0'
				title='Tâches quotidiennes'
				isTogglable
			>
				{dailyTasks && <DailyTaskBox dailyTasks={dailyTasks} />}
			</Box>
			<div className='lg:h-[21rem] mb-12 lg:mb-0'>
				<CustomTaskBox customTasks={customTasks} />
			</div>
			<Box
				additionalStyle='mt-[32px] lg:h-[21rem]'
				title='Mes succès'
				isTogglable
				additionalButton={
					!isMobile && (
						<Link href='/achievements'>
							<Button
								content='Voir tous mes succès'
								uppercase
								size={ButtonSize.Small}
							/>
						</Link>
					)
				}
			>
				<SuccessBox />
			</Box>
		</div>
	)
}

export default GamePage
