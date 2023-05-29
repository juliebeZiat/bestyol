'use client'
interface ButtonProps {
	backgroundColor?: string
	textColor?: string
	content: string
	uppercase?: boolean
	onClick?: () => void
	additionalStyle?: string
}

const Button = ({
	backgroundColor = 'bg-grey',
	textColor,
	content,
	uppercase,
	onClick,
	additionalStyle,
}: ButtonProps) => {
	return (
		<button
			className={`${backgroundColor} ${textColor} ${additionalStyle} py-2 px-4 text-lg`}
			onClick={onClick}
		>
			{uppercase ? content.toUpperCase() : content}
		</button>
	)
}

export default Button
