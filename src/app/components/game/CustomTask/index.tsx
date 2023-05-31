'use client'

import { useState } from 'react'
import Box from '../../ui/Box'
import ButtonIcon from '../../ui/ButtonIcon'
import Image from 'next/image'
import TextField from '../../ui/TextField'
import CustomTaskItem from './CustomTaskItem'

export enum TaskType {
	All = 'all',
	Archived = 'archived',
}

const CustomTaskBox = () => {
	const [taskType, setTaskType] = useState<TaskType>(TaskType.All)
	const [createNewTask, setCreateNewTask] = useState<boolean>(false)

	const handleCreateNewTask = () => {
		setCreateNewTask(!createNewTask)
	}

	const customTasks = [
		{
			title: 'intégration front de Bestyol intégration front de Bestyol',
			status: true,
		},
		{
			title: 'intégration front de Bestyol',
			status: true,
		},
		{
			title: 'intégration front de Bestyol',
			status: true,
		},
		{
			title: 'intégration front de Bestyol',
			status: true,
		},
		{
			title: 'intégration front de Bestyol',
			status: true,
		},
		{
			title: 'intégration front de Bestyol',
			status: true,
		},
		{
			title: 'tâche 2',
			status: false,
		},
		{
			title: 'tâche 3',
			status: true,
		},
		{
			title: 'tâche 4',
			status: false,
		},
	]

	const activeTasks = customTasks.filter((task) => task.status)
	const archivedTasks = customTasks.filter((task) => !task.status)
	return (
		<div className='h-full'>
			<div className='flex cursor-pointer'>
				<div
					className={`${
						taskType === TaskType.All ? 'bg-lowOpacity' : 'bg-[#564089]'
					} lg:w-[30%] w-20 py-1`}
					onClick={() => setTaskType(TaskType.All)}
				>
					<p className='text-white text-center'>toutes</p>
				</div>
				<div
					className={`${
						taskType === TaskType.Archived ? 'bg-lowOpacity' : 'bg-[#564089]'
					} lg:w-[30%] w-20 py-1`}
					onClick={() => setTaskType(TaskType.Archived)}
				>
					<p className='text-white text-center'>historique</p>
				</div>
			</div>
			<Box
				additionalStyle='h-full'
				title='Mes tâches'
				isTogglable
				additionalButton={
					<ButtonIcon onClick={handleCreateNewTask} additionalStyle='mr-2'>
						<Image
							src='/assets/icons/add.svg'
							width={8}
							height={8}
							alt='add-icon'
							className='-mt-[2px]'
						/>
					</ButtonIcon>
				}
			>
				{taskType === TaskType.All ? (
					<div className='overflow-y-auto max-h-[80%] mt-4'>
						{createNewTask && <TextField inputFocus />}
						{activeTasks.map((task, index) => (
							<CustomTaskItem
								title={task.title}
								status={task.status}
								key={index}
							/>
						))}
					</div>
				) : (
					<div>
						{archivedTasks.map((task, index) => (
							<CustomTaskItem
								title={task.title}
								status={task.status}
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
