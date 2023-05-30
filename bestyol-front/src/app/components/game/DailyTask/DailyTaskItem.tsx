interface DailyTaskProps {
	title: string
	lvl: number
	status: boolean
}

const DailyTaskItem = ({ title, lvl, status }: DailyTaskProps) => {
	return (
		<div
			className={`${
				status ? 'bg-orange' : 'bg-blue cursor-pointer'
			} p-4 relative overflow-hidden flex flex-col items-center text-center justify-around text-white mb-12 lg:mb-0`}
		>
			{status && (
				<div className='absolute left-0 top-0 h-16 w-16'>
					<div className='absolute left-[-34px] top-0 w-[100px] transform -rotate-45 bg-green py-1'></div>
				</div>
			)}
			<div className='mb-2'>
				<h1>{title}</h1>
			</div>
			<div className='w-10 h-10 bg-grey mb-2' />
			<div>
				<h2 className='text-2xl uppercase'>{lvl}px</h2>
			</div>
		</div>
	)
}

export default DailyTaskItem
