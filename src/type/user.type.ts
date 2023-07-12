export interface User {
	id: number
	pp: string
	banner: string
	username: string
	email: string
	password: string
	createdAt: string
}

export interface UserEditCredentialsRequest {
	username?: string
	email?: string
}

export interface UserEditPasswordRequest {
	formerPassword: string
	newPassword: string
}

export interface UserEditAvatarRequest {
	pp: string
}
