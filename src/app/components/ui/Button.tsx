'use client'
import { useAppSelector } from '@/state/hooks'
import { RootState } from '@/state/store'

export enum ButtonSize {
	Small = 'py-2 px-4 text-lg',
	Medium = 'py-3 px-5 text-xl',
	Large = 'py-5 px-7 text-4xl',
}

interface ButtonProps {
	backgroundColor?: string
	textColor?: string
	size?: ButtonSize
	content: string
	uppercase?: boolean
	onClick?: () => void
	additionalStyle?: string
	type?: 'button' | 'submit' | 'reset' | undefined
}

const Button = ({
	backgroundColor,
	textColor,
	size = ButtonSize.Medium,
	content,
	uppercase,
	onClick,
	additionalStyle,
	type = 'button',
}: ButtonProps) => {
	const theme = useAppSelector((state: RootState) => state.user.theme)
	return (
		<button
			className={`${
				backgroundColor || theme.vibrantBackgroundColor
			} ${textColor} ${size} ${additionalStyle} pixel-corners-items`}
			onClick={onClick}
			type={type}
		>
			{uppercase ? content.toUpperCase() : content}
		</button>
	)
}

export default Button
