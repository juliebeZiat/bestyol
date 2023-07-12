export interface User {
	id: number
	pp: string
	banner: string
	username: string
	email: string
	password: string
	createdAt: string
}

export interface UserEditUsernameEmailRequest {
	username?: string
	email?: string
}

export interface UserEditUsernameEmailResponse {
	updatedUser: {
		username: string
		email: string
	}
}

export interface UserEditPasswordRequest {
	formerPassword: string
	newPassword: string
}

export interface UserEditPictureRequest {
	pictureNumber: number
}

export interface UserEditPictureResponse {
	updatedUser: {
		pp: string
	}
}

export interface UserDeleteAccountRequest {
	password: string
}
