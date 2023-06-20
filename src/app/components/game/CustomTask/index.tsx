'use client'
import { useState } from 'react'
import Box from '../../ui/Box'
import TextField from '../../ui/TextField'
import CustomTaskItem from './CustomTaskItem'
import { UserTasks } from '@/type/tasks.type'
import { useIsMobile } from '@/hooks/useWindowSize'
import Tabs from '../../ui/Tabs'
import { useAppSelector } from '@/state/hooks'
import { RootState } from '@/state/store'

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
		if (createNewTask) setNewTask('')
		setCreateNewTask(!createNewTask)
	}
	const [newTask, setNewTask] = useState<string>('')

	const theme = useAppSelector((state: RootState) => state.user.theme)

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
						{createNewTask && (
							<TextField
								inputFocus
								needsSaving
								onValidate={() => console.log(newTask)}
								onCancel={handleCreateNewTask}
								value={newTask}
								onChange={(e) => setNewTask(e.target.value)}
							/>
						)}
						{activeTasks.map((task, index) => (
							<CustomTaskItem
								title={task.title || ''}
								is_completed={task.is_completed}
								key={index}
								is_archieved={false}
							/>
						))}
					</div>
				) : (
					<div className='overflow-y-auto max-h-[80%] mt-4'>
						{archivedTasks.map((task, index) => (
							<CustomTaskItem
								title={task.title || ''}
								is_completed={task.is_completed}
								key={index}
								is_archieved={true}
							/>
						))}
					</div>
				)}
				<button
					className={`flex justify-center items-center cursor-pointer h-[50px] aspect-square !absolute bottom-0 right-0 rounded-tl-lg overflow-hidden ${theme.vibrantBackgroundColor} text-2xl text-white`}
					onClick={handleCreateNewTask}
				>
					&#10010;
				</button>
			</Box>
		</div>
	)
}

export default CustomTaskBox
