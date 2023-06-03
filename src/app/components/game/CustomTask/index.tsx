'use client'

import { useState } from 'react'
import Box from '../../ui/Box'
import ButtonIcon from '../../ui/ButtonIcon'
import Image from 'next/image'
import TextField from '../../ui/TextField'
import CustomTaskItem from './CustomTaskItem'
import { UserTasks } from '@/type/tasks.type'

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

	if (!customTasks) return null

	const activeTasks = customTasks.filter((task) => !task.is_completed)
	const archivedTasks = customTasks.filter((task) => task.is_completed)
	return (
		<div className='h-full'>
			<div className='flex cursor-pointer h-[10%]'>
				<div
					className={` h-full rounded-xl border-[4px] shadow-white/25 shadow-lg border-blue ${
						taskType === TaskType.All ? 'bg-lowOpacity' : 'bg-[#564089]'
					} lg:w-[30%] w-20 py-1`}
					onClick={() => setTaskType(TaskType.All)}
				>
					<p className='text-white text-center'>toutes</p>
				</div>
				<div
					className={` h-full rounded-xl border-[4px] shadow-white/25 shadow-lg border-blue ${
						taskType === TaskType.Archived ? 'bg-lowOpacity' : 'bg-[#564089]'
					} lg:w-[30%] w-20 py-1`}
					onClick={() => setTaskType(TaskType.Archived)}
				>
					<p className='text-white text-center'>historique</p>
				</div>
			</div>
			<Box additionalStyle='h-[90%]' title='Mes tâches' isTogglable>
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
