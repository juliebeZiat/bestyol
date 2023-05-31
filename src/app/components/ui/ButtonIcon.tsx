import { ReactNode } from 'react'

interface ButtonIconProps {
	children: ReactNode
	additionalStyle?: string
	backgroundColor?: string
	onClick?: () => void
}

const ButtonIcon = ({
	children,
	additionalStyle,
	backgroundColor = 'bg-grey',
	onClick,
}: ButtonIconProps) => {
	return (
		<button
			className={`${backgroundColor} ${additionalStyle} py-2 px-4 lg:h-10 h-5 w-10`}
			onClick={onClick}
		>
			{children}
		</button>
	)
}

export default ButtonIcon
