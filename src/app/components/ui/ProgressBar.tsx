interface ProgressBarProps {
	progress: number
	total: number | undefined
	width?: string
	margin?: string
	color?: string
}

const ProgressBar = ({
	progress,
	total,
	width = 'sm:w-[150px]',
	margin = 'mt-2',
	color,
}: ProgressBarProps) => {
	if (!total) return null

	const progressPercentage = `${Math.round((progress / total) * 100)}%`

	return (
		<div className='flex flex-col'>
			<div className={`w-[75px] ${width}`}>
				<div className={`h-[10px] bg-[#FFFFFF] ${margin} pixel-corners-bar`}>
					<div
						className={`h-full ${color} transition-all duration-1000 ease-in-out`}
						style={{ width: progressPercentage }}
					/>
				</div>
			</div>
		</div>
	)
}

export default ProgressBar
