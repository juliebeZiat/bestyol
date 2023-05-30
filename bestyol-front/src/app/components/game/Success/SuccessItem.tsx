import ProgressBar from '@/app/components/ui/ProgressBar'
import Image from 'next/image'

interface SuccessProps {
	title: string
	amount: number
	current_amount: number
}

const SuccessItem = ({ title, amount, current_amount }: SuccessProps) => {
	return (
		<div className='bg-[#9A90AF] p-3 mb-4'>
			<div className='flex content-center'>
				<div className='w-[15%]'>
					<Image
						src='/assets/icons/success-test.png'
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
						color='bg-blue'
					/>
				</div>
			</div>
		</div>
	)
}

export default SuccessItem
