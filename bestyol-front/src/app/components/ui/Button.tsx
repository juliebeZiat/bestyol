'use client'
interface ButtonProps {
	backgroundColor?: string
	content: string
	uppercase?: boolean
	onClick: () => void
}

const Button = ({
	backgroundColor = 'bg-grey',
	content,
	uppercase,
	onClick,
}: ButtonProps) => {
	return (
		<button
			className={`${backgroundColor} py-2 px-4 text-lg`}
			onClick={onClick}
		>
			{uppercase ? content.toUpperCase() : content}
		</button>
	)
}

export default Button
