import { User } from './user.type'

export type LoginRequest = {
	username: string
	password: string
}

export type LoginResponse = {
	token: string
	message: string
	user: User
}

export type SignupRequest = {
	username: string
	email: string
	password: string
}

export type SignupResponse = LoginResponse
