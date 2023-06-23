import { useAppSelector } from '@/state/hooks'
import { RootState } from '@/state/store'
import Image from 'next/image'
import { useState } from 'react'

interface DailyTaskItemProps {
	title: string
	xp: number
	is_completed: boolean
	image: string | undefined
}

const DailyTaskItem = ({
	title,
	xp,
	is_completed,
	image,
}: DailyTaskItemProps) => {
	const theme = useAppSelector((state: RootState) => state.user.theme)
	const [confirmValidation, setConfirmValidation] = useState(false)

	return (
		<div
			className={`dailyCard relative h-[20vh] w-full cursor-pointer ${
				confirmValidation && 'flip'
			}`}
			onClick={() => setConfirmValidation(!confirmValidation)}
		>
			<div
				className={`frontFace !absolute top-0 left-0 h-[20vh] w-full p-4 flex flex-col items-center text-center justify-around text-white mb-12 lg:mb-0 pixel-corners ${
					theme.pixelBorderColor
				} ${
					is_completed
						? theme.primaryBackgroundColor + ' shadow-white/25 shadow-lg'
						: theme.secondaryBackgroundColor + ' cursor-pointer'
				}`}
			>
				<div className='h-[40%]'>
					<h1>{title}</h1>
				</div>
				{image && (
					<Image
						src={image}
						alt='daily task asset'
						width={60}
						height={60}
						className={`transition-all duration-[1s] ${
							confirmValidation && 'opacity-25'
						}`}
					/>
				)}
				<div>
					<h2 className='text-2xl uppercase'>{xp}xp</h2>
				</div>
			</div>
			<div
				className={`backFace !absolute top-0 left-0 h-[20vh] w-full flex flex-col items-center text-center justify-around text-white mb-12 lg:mb-0 pixel-corners ${
					theme.pixelBorderColor
				} ${theme.primaryBackgroundColor + ' shadow-white/25 shadow-lg'}`}
			>
				<div className={`w-full h-full flex justify-center items-center`}>
					<button
						className={`pixel-corners-items p-2 ${theme.pixelBorderColor} ${theme.vibrantBackgroundColor}`}
					>
						Valider la tâche ?
					</button>
				</div>
			</div>
		</div>
	)
}

export default DailyTaskItem
