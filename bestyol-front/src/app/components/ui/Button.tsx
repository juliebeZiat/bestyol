'use client'
interface ButtonProps {
	backgroundColor?: string
	textColor?: string
	content: string
	uppercase?: boolean
	onClick: () => void
}

const Button = ({
	backgroundColor = 'bg-grey',
	textColor,
	content,
	uppercase,
	onClick,
}: ButtonProps) => {
	return (
		<button
			className={`${backgroundColor} ${textColor} py-2 px-4 text-lg`}
			onClick={onClick}
		>
			{uppercase ? content.toUpperCase() : content}
		</button>
	)
}

export default Button
