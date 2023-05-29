'use client'

import CustomTaskBox from '@/app/components/game/Customtask'
import DailyTaskBox from '@/app/components/game/DailyTask'
import SuccessBox from '@/app/components/game/Success'
import YolBox from '@/app/components/game/Yol'
import Navbar from '@/app/components/layout/navbar'
import Box from '@/app/components/ui/Box'
import Button from '@/app/components/ui/Button'
import { useIsMobile } from '@/hooks/useWindowSize'
import Link from 'next/link'

const GamePage = () => {
	const isMobile = useIsMobile()
	return (
		<div className='w-full'>
			<Navbar />
			<div className='lg:grid grid-cols-[30%_30%_35%] grid-flow-row gap-8 p-10'>
				<Box additionalStyle='col-span-2 h-[20rem] mb-12 lg:mb-0'>
					<YolBox yolName='bonjour' />
				</Box>
				<Box
					additionalStyle='row-span-2 mb-12 lg:mb-0'
					title='Tâches quotidiennes'
					isToggle
				>
					<DailyTaskBox />
				</Box>
				<div className='lg:h-[21rem] mb-12 lg:mb-0'>
					<CustomTaskBox />
				</div>
				<Box
					additionalStyle='mt-[32px] lg:h-[21rem]'
					title='Mes succès'
					isToggle
					additionalButton={
						!isMobile && (
							<Link href='/success'>
								<Button content='Voir tous mes succès' uppercase />
							</Link>
						)
					}
				>
					<SuccessBox />
				</Box>
			</div>
		</div>
	)
}

export default GamePage
