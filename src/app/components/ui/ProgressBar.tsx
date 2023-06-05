import { useTheme } from '@/contexts/ThemeContext'

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

	const { theme } = useTheme()
	console.log

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
