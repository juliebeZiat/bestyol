import { useMutation } from "@tanstack/react-query"
import userTasksService from "../tasksService"


export const useMutationNewTask = () => {
    return useMutation(
        async (payload: { userId: number, taskName: string }) => await userTasksService.createNewUserTask(payload.taskName, payload.userId),
    )
}

export const useMutationEditTask = () => {
    return useMutation(
        async (payload: { taskId: number, taskName: string }) => await userTasksService.editUserTask(payload.taskName, payload.taskId),
    )
}

export const useMutationDeleteTask = () => {
    return useMutation(
        async (payload: { taskId: number }) => await userTasksService.deleteUserTask(payload.taskId),
    )
}