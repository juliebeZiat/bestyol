import { useAppSelector } from '@/state/hooks'
import { RootState } from '@/state/store'
import { ReactNode } from 'react'

interface ButtonIconProps {
	children: ReactNode
	isOpen: boolean
	onClick?: () => void
}

const ButtonIcon = ({ children, isOpen, onClick }: ButtonIconProps) => {
	const theme = useAppSelector((state: RootState) => state.user.theme)
	return (
		<button
			className={`pixel-corners-items rounded-full w-[2rem] h-[2rem] ${
				theme.pixelBorderColor
			} ${theme.secondaryBackgroundColor} flex justify-center items-center ${
				!isOpen && '!absolute right-4 top-[50%] translate-y-[-50%]'
			}`}
			onClick={onClick}
		>
			{children}
		</button>
	)
}

export default ButtonIcon
