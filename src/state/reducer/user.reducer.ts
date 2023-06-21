import { User } from '@/type/user.type'
import { themes } from '@/utils/themes'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

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
	token: string | undefined
}

const initialState = {
	isLogged: false,
	user: {},
	theme: themes[7],
	token: undefined,
} as UserState

export const user = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state, { payload }) => {
			state.isLogged = true
			state.token = payload
			axios.defaults.headers.common = { Authorization: `Bearer ${state.token}` }
		},
		setUser: (state, action: PayloadAction<User>) => {
			state.user = action.payload
		},
		setTheme: (state, action: PayloadAction<Theme>) => {
			state.theme = action.payload
		},
		resetTheme: (state) => {
			state.theme = initialState.theme
		},
		logout: () => initialState,
	},
})

export const { login, logout, setUser, setTheme, resetTheme } = user.actions
export default user.reducer
