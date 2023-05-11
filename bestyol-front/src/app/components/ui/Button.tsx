interface ButtonProps {
	backgroundColor?: string
	content: string
	uppercase?: boolean
}

const Button = ({
	backgroundColor = 'bg-grey',
	content,
	uppercase,
}: ButtonProps) => {
	return (
		<button className={`${backgroundColor} text-white py-2 px-4 text-lg`}>
			{uppercase ? content.toUpperCase() : content}
		</button>
	)
}

export default Button
