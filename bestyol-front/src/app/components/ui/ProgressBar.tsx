interface ProgressBarProps {
	progress: number
	total: number
	width?: string
	margin?: string
	color?: string
}

const ProgressBar = ({
	progress,
	total,
	width = 'sm:w-[150px]',
	margin = 'mt-2',
	color = 'bg-orange',
}: ProgressBarProps) => {
	const progressPercentage = `${Math.round((progress / total) * 100)}%`

	return (
		<div className='flex flex-col'>
			<div className={`w-[75px] ${width}`}>
				<div className={`h-[10px] bg-[#FFFFFF] ${margin}`}>
					<div
						className={`h-full ${color}`}
						style={{ width: progressPercentage }}
					/>
				</div>
			</div>
		</div>
	)
}

export default ProgressBar
