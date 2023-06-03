import ProgressBar from '@/app/components/ui/ProgressBar'
import { useTheme } from '@/contexts/ThemeContext'
import Image from 'next/image'

interface SuccessProps {
	title: string
	amount: number
	current_amount: number
}

const SuccessItem = ({ title, amount, current_amount }: SuccessProps) => {
	const { theme } = useTheme()

	return (
		<div
			className={`${theme.secondaryBackgroundColor} p-3 mb-4 rounded-xl border-[4px] ${theme.primaryBorderColor}`}
		>
			<div className='flex content-center'>
				<div className='w-[15%]'>
					<Image
						src='/assets/tempAchievement.png'
						alt='cloud'
						width={40}
						height={40}
					/>
				</div>
				<div className='w-[85%]'>
					<div className='flex justify-between'>
						<h1 className='text-white w-[80%]'>{title}</h1>
						<div className='text-white'>
							{current_amount} / {amount}
						</div>
					</div>
					<ProgressBar
						progress={current_amount}
						total={amount}
						width='w-[80%]'
						margin='mt-1'
						color={theme.vibrantBackgroundColor}
					/>
				</div>
			</div>
		</div>
	)
}

export default SuccessItem
