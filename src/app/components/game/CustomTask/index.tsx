'use client'

import { useState } from 'react'
import Box from '../../ui/Box'
import ButtonIcon from '../../ui/ButtonIcon'
import Image from 'next/image'
import TextField from '../../ui/TextField'
import CustomTaskItem from './CustomTaskItem'
import { UserTasks } from '@/type/tasks.type'
import { useTheme } from '@/contexts/ThemeContext'
import { useIsMobile } from '@/hooks/useWindowSize'
import Tabs from '../../ui/Tabs'

export enum TaskType {
	All = 'all',
	Archived = 'archived',
}

interface CustomTaskProps {
	customTasks?: UserTasks[]
}

const CustomTaskBox = ({ customTasks }: CustomTaskProps) => {
	const isMobile = useIsMobile()
	const [taskType, setTaskType] = useState<TaskType>(TaskType.All)
	const [createNewTask, setCreateNewTask] = useState<boolean>(false)

	const handleCreateNewTask = () => {
		setCreateNewTask(!createNewTask)
	}

	if (!customTasks) return null

	const activeTasks = customTasks.filter((task) => !task.is_completed)
	const archivedTasks = customTasks.filter((task) => task.is_completed)
	return (
		<div className={`h-full ${isMobile && 'mb-12'}`}>
			<Box additionalStyle='h-full' title='Mes tâches' isTogglable>
				<Tabs
					activeItemsTitle='Actives'
					archivedItemsTitle='Complétées'
					activeItemsCondition={taskType === TaskType.All}
					archivedItemsCondition={taskType === TaskType.Archived}
					setActiveItems={() => setTaskType(TaskType.All)}
					setArchivedItems={() => setTaskType(TaskType.Archived)}
				/>
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
