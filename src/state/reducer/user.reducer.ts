import { User } from '@/type/user.type'
import { themes } from '@/utils/themes'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Theme {
	[key: string]: string

	name: string
	pixelBorderColor: string
	borderColor: string
	gradientFrom: string
	gradientTo: string
	primaryBackgroundColor: string
	secondaryBackgroundColor: string
	vibrantBackgroundColor: string
}

type UserState = {
	user: User
	isLogged: boolean
	theme: Theme
}

const initialState = {
	isLogged: false,
	user: {},
	theme: themes[1],
} as UserState

export const user = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state) => {
			state.isLogged = true
		},
		setUser: (state, action: PayloadAction<User>) => {
			state.user = action.payload
		},
		setTheme: (state, action: PayloadAction<Theme>) => {
			state.theme = action.payload
		},
		logout: () => initialState,
	},
})

export const { login, logout, setUser, setTheme } = user.actions
export default user.reducer
