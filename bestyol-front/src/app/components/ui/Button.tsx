'use client'

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
}

const Button = ({
	backgroundColor = 'bg-grey',
	textColor,
	size = ButtonSize.Medium,
	content,
	uppercase,
	onClick,
	additionalStyle,
}: ButtonProps) => {
	return (
		<button
			className={`${backgroundColor} ${textColor} ${size}`}
			onClick={onClick}
		>
			{uppercase ? content.toUpperCase() : content}
		</button>
	)
}

export default Button
