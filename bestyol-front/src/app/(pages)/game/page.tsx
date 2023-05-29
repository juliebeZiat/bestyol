import CustomTaskBox from '@/app/components/game/Customtask'
import DailyTaskBox from '@/app/components/game/DailyTask'
import SuccessBox from '@/app/components/game/Success'
import YolBox from '@/app/components/game/Yol'
import Navbar from '@/app/components/layout/navbar'
import Box from '@/app/components/ui/Box'

const GamePage = () => {
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
				>
					<DailyTaskBox />
				</Box>
				<Box additionalStyle='h-[20rem] mb-12 lg:mb-0' title='Mes tâches'>
					<CustomTaskBox />
				</Box>
				<Box title='Mes succès'>
					<SuccessBox />
				</Box>
			</div>
		</div>
	)
}

export default GamePage
