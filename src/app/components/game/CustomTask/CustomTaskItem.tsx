import Image from 'next/image'
import { useState } from 'react'
import Button from '@/app/components/ui/Button'
import ButtonIcon from '../../ui/ButtonIcon'
import { useTheme } from '@/contexts/ThemeContext'

interface CustomTaskProps {
	title: string
	is_completed: boolean
	is_archieved: boolean
}

const CustomTaskItem = ({ title, is_archieved }: CustomTaskProps) => {
	const [taskIsDone, setTaskIsDone] = useState<boolean>(is_archieved)
	const [editTask, setEditTask] = useState<boolean>(false)
	const [newTitle, setNewTitle] = useState<string>(title)

	const handleClick = () => {
		setTaskIsDone(!taskIsDone)
	}

	const handleEdit = () => {
		setEditTask(true)
	}

	const handleEditTask = (event: React.ChangeEvent<HTMLInputElement>) => {
		setNewTitle(event.target.value)
	}

	const handleSave = () => {
		setEditTask(false)
	}

	const { theme } = useTheme()

	return (
		<div
			className={`h-[4rem] p-3 mb-4 pixel-corners-items text-white flex justify-between items-center ${
				theme.pixelBorderColor
			} transition-all ease-in-out duration-1000 ${
				taskIsDone || is_archieved
					? `${theme.primaryBackgroundColor}`
					: theme.secondaryBackgroundColor
			}`}
		>
			<div>
				{!editTask ? (
					<div className='flex items-center'>
						{!is_archieved && (
							<div
								className={`cursor-pointer w-[15px] h-[15px] mr-2 border-2  ${
									taskIsDone
										? 'ease-in-out duration-1000 after:content-["x"] after:relative after:bottom-2 after:left-0.5'
										: 'border-orange'
								}`}
								onClick={handleClick}
							/>
						)}
						<div className='text-lg'>{title}</div>
					</div>
				) : (
					<div>
						<input
							type='text'
							value={newTitle}
							onChange={handleEditTask}
							className='text-lg border-2 px-2 border-grey'
						/>
					</div>
				)}
			</div>
			{!is_archieved &&
				(!editTask ? (
					<div className='cursor-pointer' onClick={handleEdit}>
						<Image
							src='/assets/icons/clip-edit.svg'
							width={20}
							height={20}
							alt='edit-icon'
							className='invert'
						/>
					</div>
				) : (
					<div className='cursor-pointer' onClick={handleSave}>
						<Image
							src='/assets/icons/ok.svg'
							width={25}
							height={25}
							alt='ok-icon'
							className='invert'
						/>
					</div>
				))}
		</div>
	)
}

export default CustomTaskItem
