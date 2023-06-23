'use client'

import CustomTaskBox from '@/app/components/game/CustomTask/CustomTask'
import DailyTaskBox from '@/app/components/game/DailyTask'
import SuccessBox from '@/app/components/game/Success'
import YolBox from '@/app/components/game/Yol'
import Box from '@/app/components/ui/Box'
import { useIsMobile } from '@/hooks/useWindowSize'
import { useFetchAllUserTasks } from '@/services/queries/tasks'
import { useAppSelector } from '@/state/hooks'
import { RootState } from '@/state/store'
import Link from 'next/link'

const GamePage = () => {
	const user = useAppSelector((state: RootState) => state.user.user)
	const { data: tasks, isLoading } = useFetchAllUserTasks(user.id)

	const dailyTasks = tasks?.data.dailyTasks
	const customTasks = tasks?.data.customTasks

	const isMobile = useIsMobile()
	return (
		<div className='lg:grid grid-cols-[30%_30%_35%] grid-rows-[40vh_40vh] grid-flow-row gap-8 p-6 lg:w-[90vw] h-full'>
			<Box additionalStyle='col-span-2 mb-12 lg:mb-0 relative'>
				<YolBox />
			</Box>
			<Box
				additionalStyle='row-span-2 mb-12 lg:mb-0'
				title='Tâches quotidiennes'
				isTogglable
			>
				{dailyTasks && (
					<DailyTaskBox dailyTasks={dailyTasks} isLoading={isLoading} />
				)}
			</Box>
			<CustomTaskBox customTasks={customTasks} />
			<Box
				title='Mes succès'
				isTogglable
				additionalButton={
					!isMobile && (
						<Link href='/achievements'>
							<p className='text-white underline'>Voir tous mes succès</p>
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
