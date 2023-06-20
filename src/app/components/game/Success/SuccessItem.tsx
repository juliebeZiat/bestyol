import ProgressBar from '@/app/components/ui/ProgressBar'
import { useIsMobile } from '@/hooks/useWindowSize'
import { useAppSelector } from '@/state/hooks'
import { RootState } from '@/state/store'
import SuccessAsset from '../../ui/SuccessAsset'

interface SuccessProps {
	title: string
	amount: number
	current_amount: number
	image: string
}

const SuccessItem = ({
	title,
	amount,
	current_amount,
	image,
}: SuccessProps) => {
	const isMobile = useIsMobile()
	const theme = useAppSelector((state: RootState) => state.user.theme)

	return (
		<div
			className={`h-[30%] p-2 mb-3 pixel-corners-items ${theme.pixelBorderColor} ${theme.secondaryBackgroundColor}`}
		>
			<div className='flex content-center'>
				<div className='w-[15%]'>
					<SuccessAsset image={image} size={40} amount={amount} />
				</div>
				<div className='w-[85%]'>
					<div className='flex justify-between'>
						<h1 className='text-white w-[70%]'>{title}</h1>
						<div className='text-white'>
							{current_amount} / {amount}
						</div>
					</div>
					<ProgressBar
						progress={current_amount}
						total={amount}
						width={isMobile ? 'w-[60%]' : 'w-[80%]'}
						margin='mt-1'
						color={theme.vibrantBackgroundColor}
					/>
				</div>
			</div>
		</div>
	)
}

export default SuccessItem
