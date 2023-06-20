import { User } from './user.type'

export type LoginRequest = {
	username: string
	password: string
}

export type LoginResponse = {
	userId: number
	token: string
	message: string
	user: User
}
