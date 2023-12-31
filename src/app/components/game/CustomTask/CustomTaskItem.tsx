import Image from 'next/image'
import { useState } from 'react'
import { useAppSelector } from '@/state/hooks'
import { RootState } from '@/state/store'
import TextField from '../../ui/TextField'
import {
	useMutationDeleteCustomTask,
	useMutationEditCustomTask,
	useMutationValidateCustomTask,
} from '@/services/mutations/tasks'
import AudioPlayer from '../../layout/AudioPlayer'

interface CustomTaskProps {
	id: number
	title: string
	is_completed: boolean
	is_archieved: boolean
	taskId: number
}

const CustomTaskItem = ({
	id,
	title,
	is_archieved,
	taskId,
}: CustomTaskProps) => {
	const [taskIsDone, setTaskIsDone] = useState<boolean>(is_archieved)
	const [validateTask, setValidateTask] = useState<boolean>(false)
	const [editTask, setEditTask] = useState<boolean>(false)
	const [newTitle, setNewTitle] = useState<string>(title)
	const { mutateAsync: mutateAsyncEditTask } = useMutationEditCustomTask()
	const { mutateAsync: mutateAsyncDeleteTask } = useMutationDeleteCustomTask()
	const { mutateAsync: validateCustomTask } = useMutationValidateCustomTask()

	const handleValidateCustomTask = async () => {
		const data = { customTaskId: id }
		await validateCustomTask(data, {
			onSuccess: async () => {
				setTaskIsDone(true)
			},
		})
		setValidateTask(true)
	}

	const toggleEdit = () => {
		setNewTitle(title)
		setEditTask(!editTask)
	}

	const handleEditTask = async () => {
		await mutateAsyncEditTask(
			{ taskId, taskName: newTitle },
			{
				onSuccess: async () => {
					toggleEdit()
				},
			},
		)
	}

	const deleteTask = async () => {
		await mutateAsyncDeleteTask({ taskId })
	}

	const theme = useAppSelector((state: RootState) => state.user.theme)

	return (
		<>
			<div
				onClick={(e) => e.stopPropagation()}
				className={`h-[4rem] p-3 mb-4 pixel-corners-items text-white flex justify-between items-center ${
					theme.pixelBorderColor
				} transition-all ease-in-out duration-1000 
			${
				taskIsDone || is_archieved
					? theme.primaryBackgroundColor
					: theme.secondaryBackgroundColor
			}
			`}
			>
				<div className='w-full'>
					{!editTask ? (
						<div className='flex items-center'>
							{!is_archieved && (
								<div
									className={`cursor-pointer w-[15px] h-[15px] mr-2 border-2  ${
										taskIsDone
											? 'ease-in-out duration-1000 after:content-["x"] after:relative after:bottom-2 after:left-0.5'
											: ''
									}`}
									onClick={handleValidateCustomTask}
								/>
							)}
							<div className='text-lg'>{title}</div>
						</div>
					) : (
						<div className='w-full'>
							<TextField
								inputFocus
								needsSaving
								onChange={(e) => setNewTitle(e.target.value)}
								onCancel={toggleEdit}
								onValidate={handleEditTask}
								value={newTitle}
							/>
						</div>
					)}
				</div>
				{!is_archieved && !editTask && (
					<div className='cursor-pointer flex gap-x-2'>
						<Image
							src='/assets/icons/clip-edit.svg'
							width={20}
							height={20}
							alt='edit-icon'
							className='invert'
							onClick={toggleEdit}
						/>
						<Image
							src='/assets/icons/trash.png'
							width={20}
							height={20}
							alt='edit-icon'
							className='invert'
							onClick={deleteTask}
						/>
					</div>
				)}
			</div>
			{validateTask && <AudioPlayer source='/audio/beep.mp3' autoPlay />}
		</>
	)
}

export default CustomTaskItem
