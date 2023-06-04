'use client'

import { useState } from 'react'
import Box from '../../ui/Box'
import ButtonIcon from '../../ui/ButtonIcon'
import Image from 'next/image'
import TextField from '../../ui/TextField'
import CustomTaskItem from './CustomTaskItem'
import { UserTasks } from '@/type/tasks.type'
import { useTheme } from '@/contexts/ThemeContext'

export enum TaskType {
	All = 'all',
	Archived = 'archived',
}

interface CustomTaskProps {
	customTasks?: UserTasks[]
}

const CustomTaskBox = ({ customTasks }: CustomTaskProps) => {
	const [taskType, setTaskType] = useState<TaskType>(TaskType.All)
	const [createNewTask, setCreateNewTask] = useState<boolean>(false)

	const handleCreateNewTask = () => {
		setCreateNewTask(!createNewTask)
	}

	const { theme } = useTheme()

	if (!customTasks) return null

	const activeTasks = customTasks.filter((task) => !task.is_completed)
	const archivedTasks = customTasks.filter((task) => task.is_completed)
	return (
		<div className='h-full'>
			<Box additionalStyle='h-full' title='Mes tâches' isTogglable>
				<div className='flex justify-end cursor-pointer h-[10%] !absolute top-0 right-0 w-[40%] rounded-bl-lg overflow-hidden'>
					<div
						className={`py-1 w-[50%] flex justify-center items-center ${
							taskType === TaskType.All
								? theme.vibrantBackgroundColor
								: 'bg-lowOpacity'
						}`}
						onClick={() => setTaskType(TaskType.All)}
					>
						<p className='text-white text-center'>Actives</p>
					</div>
					<div
						className={`w-[50%] flex justify-center items-center  ${
							taskType === TaskType.Archived
								? theme.vibrantBackgroundColor
								: 'bg-lowOpacity'
						} py-1`}
						onClick={() => setTaskType(TaskType.Archived)}
					>
						<p className='text-white text-center'>Complétées</p>
					</div>
				</div>
				{taskType === TaskType.All ? (
					<div className='overflow-y-auto max-h-[80%] mt-4'>
						{createNewTask && <TextField inputFocus />}
						{activeTasks.map((task, index) => (
							<CustomTaskItem
								title={task.title || ''}
								is_completed={task.is_completed}
								key={index}
							/>
						))}
					</div>
				) : (
					<div>
						{archivedTasks.map((task, index) => (
							<CustomTaskItem
								title={task.title || ''}
								is_completed={task.is_completed}
								key={index}
							/>
						))}
					</div>
				)}
			</Box>
		</div>
	)
}

export default CustomTaskBox
