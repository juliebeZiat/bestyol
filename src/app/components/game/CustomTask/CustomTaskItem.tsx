import Image from 'next/image'
import { useState } from 'react'
import Button from '@/app/components/ui/Button'
import ButtonIcon from '../../ui/ButtonIcon'

interface CustomTaskProps {
	title: string
	is_completed: boolean
}

const CustomTaskItem = ({ title, is_completed }: CustomTaskProps) => {
	const [taskIsDone, setTaskIsDone] = useState<boolean>(false)
	const [taskIsArchived, setTaskIsArchived] = useState<boolean>(false)
	const [editTask, setEditTask] = useState<boolean>(false)
	const [newTitle, setNewTitle] = useState<string>(title)

	const handleClick = () => {
		setTaskIsDone(true)

		setTimeout(() => {
			setTaskIsArchived(true)
		}, 1500)
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

	return (
		<>
			{!taskIsArchived && !is_completed ? (
				<div
					className={`w-full p-2 flex justify-between items-center mb-3 mt-1 transition-all ${
						taskIsDone
							? 'bg-orange ease-in-out duration-1000 opacity-0'
							: 'bg-white'
					}`}
				>
					<div>
						{!editTask ? (
							<div className='flex items-center'>
								<div>
									<div
										className={`cursor-pointer w-[15px] h-[15px] mr-2 border-2  ${
											taskIsDone
												? 'ease-in-out duration-1000 after:content-["x"] after:relative after:bottom-2 after:left-0.5'
												: 'border-orange'
										}`}
										onClick={handleClick}
									/>
								</div>
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

					{!editTask ? (
						<div className='cursor-pointer' onClick={handleEdit}>
							<Image
								src='/assets/icons/edit.svg'
								width={15}
								height={15}
								alt='edit-icon'
							/>
						</div>
					) : (
						<div className='cursor-pointer' onClick={handleSave}>
							<Image
								src='/assets/icons/ok.svg'
								width={15}
								height={15}
								alt='ok-icon'
							/>
						</div>
					)}
				</div>
			) : (
				<div>
					<div className='flex justify-between items-center'>
						<p className='text-lg'>{title}</p>
						<div className='cursor-pointer'>x</div>
					</div>
				</div>
			)}
		</>
	)
}

export default CustomTaskItem
