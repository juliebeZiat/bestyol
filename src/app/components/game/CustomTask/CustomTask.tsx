'use client'
import { useState } from 'react'
import Box from '../../ui/Box'
import TextField from '../../ui/TextField'
import CustomTaskItem from './CustomTaskItem'
import { UserTask } from '@/type/tasks.type'
import { useIsMobile } from '@/hooks/useWindowSize'
import Tabs from '../../ui/Tabs'
import { useAppSelector } from '@/state/hooks'
import { RootState } from '@/state/store'
import { useQueryClient } from '@tanstack/react-query'
import { useMutationCreateNewCustomTask } from '@/services/mutations/tasks'

export enum TaskType {
	All = 'all',
	Archived = 'archived',
}

interface CustomTaskProps {
	customTasks?: UserTask[]
}

const CustomTaskBox = ({ customTasks }: CustomTaskProps) => {
	const isMobile = useIsMobile()
	const [taskType, setTaskType] = useState<TaskType>(TaskType.All)
	const [taskCreation, setTaskCreation] = useState<boolean>(false)
	const [newTask, setNewTask] = useState<string>('')
	const { user } = useAppSelector((state: RootState) => state.user)
	const queryClient = useQueryClient()
	const { mutateAsync: mutateAsyncNewTask } = useMutationCreateNewCustomTask()

	const toggleTaskCreation = () => {
		if (taskCreation) setNewTask('')
		setTaskCreation(!taskCreation)
	}
	const validateTaskCreation = async () => {
		await mutateAsyncNewTask(
			{ userId: user.id, taskName: newTask },
			{
				onSuccess() {
					queryClient.invalidateQueries({ queryKey: ['userTasks'] })
					toggleTaskCreation()
				},
			},
		)
	}

	const theme = useAppSelector((state: RootState) => state.user.theme)

	if (!customTasks) return null

	const activeTasks = customTasks.filter((task) => !task.isCompleted)
	console.log(activeTasks)
	const archivedTasks = customTasks.filter((task) => task.isCompleted)
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
						{taskCreation && (
							<form
								onSubmit={(e) => {
									e.preventDefault()
									validateTaskCreation
								}}
							>
								<TextField
									inputFocus
									needsSaving
									onValidate={validateTaskCreation}
									onCancel={toggleTaskCreation}
									value={newTask}
									onChange={(e) => setNewTask(e.target.value)}
								/>
							</form>
						)}
						{activeTasks.map((task, index) => (
							<CustomTaskItem
								id={task.id}
								title={task.title || ''}
								is_completed={task.isCompleted}
								key={task.id}
								is_archieved={false}
								taskId={task.id}
							/>
						))}
					</div>
				) : (
					<div className='overflow-y-auto max-h-[80%] mt-4'>
						{archivedTasks.map((task, index) => (
							<CustomTaskItem
								id={task.id}
								title={task.title || ''}
								is_completed={task.isCompleted}
								key={task.id}
								is_archieved={true}
								taskId={task.id}
							/>
						))}
					</div>
				)}
				<button
					className={`flex justify-center items-center cursor-pointer h-[50px] aspect-square !absolute -bottom-1 -right-1 rounded-tl-lg overflow-hidden ${theme.vibrantBackgroundColor} text-2xl text-white`}
					onClick={toggleTaskCreation}
				>
					&#10010;
				</button>
			</Box>
		</div>
	)
}

export default CustomTaskBox
