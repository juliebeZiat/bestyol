import { useAppSelector } from '@/state/hooks'
import { RootState } from '@/state/store'
import { BaseSyntheticEvent } from 'react'

interface ModalProps {
	children: React.ReactNode
	isOpen?: boolean
	title?: string
	bgColor?: string
	onClose?: () => void
}

export default function Modal({
	children,
	isOpen,
	title,
	onClose,
	bgColor = 'bg-purple',
}: ModalProps) {
	const handleOutsideModalClick = (e: BaseSyntheticEvent) => {
		if (e.target === e.currentTarget) {
			if (onClose) onClose()
		}
	}

	const theme = useAppSelector((state: RootState) => state.user.theme)

	return isOpen === true ? (
		<div className='w-[100vw] h-[100vh] fixed top-0 left-0 z-[60] bg-darkLowOpacity'>
			<div
				className='w-full h-full flex justify-center items-center'
				onClick={handleOutsideModalClick}
			>
				<div
					className={`${theme.vibrantBackgroundColor} ${theme.pixelBorderColor} pixel-corners shadow-xl mx-2`}
				>
					<div className='flex flex-col'>
						<div className={`pl-4 sm:pl-8 flex justify-between items-center`}>
							<div
								className={`h-fit overflow-hidden whitespace-nowrap text-ellipsis text-xl sm:text-2xl lg:text-3xl text-center w-full text-white`}
							>
								{title ?? ''}
							</div>
							<div
								onClick={() => {
									if (onClose !== undefined) onClose()
								}}
								className='p-4 cursor-pointer text-2xl sm:text-4xl font-bold text-white select-none'
							>
								X
							</div>
						</div>
						<div className={`flex flex-col pb-4`}>
							<div className='pr-4 pl-4 sm:pl-8 sm:pr-8'>{children}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	) : (
		<></>
	)
}
