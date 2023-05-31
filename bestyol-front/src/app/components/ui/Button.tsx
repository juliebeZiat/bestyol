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
	type?: 'button' | 'submit' | 'reset' | undefined
}

const Button = ({
	backgroundColor = 'bg-grey',
	textColor,
	size = ButtonSize.Medium,
	content,
	uppercase,
	onClick,
	additionalStyle,
	type = 'button',
}: ButtonProps) => {
	return (
		<button
			className={`${backgroundColor} ${textColor} ${size} ${additionalStyle}`}
			onClick={onClick}
			type={type}
		>
			{uppercase ? content.toUpperCase() : content}
		</button>
	)
}

export default Button
