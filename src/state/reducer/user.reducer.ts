import { Theme } from '@/type/type'
import { User } from '@/type/user.type'
import { themes } from '@/utils/themes'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

type UserState = {
	user: User
	isLogged: boolean
	theme: Theme
	token: string | undefined
}

const initialState = {
	isLogged: false,
	user: {},
	theme: themes.find((theme) => theme.name == 'neutral'),
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
			const selectedTheme = localStorage.getItem('selectedTheme')
			state.theme = selectedTheme
				? JSON.parse(selectedTheme)
				: themes.find((theme) => theme.name == 'neutral')
		},
		setUserUsernameEmail: (
			state,
			action: PayloadAction<{ username: string; email: string }>,
		) => {
			state.user.username = action.payload.username
			state.user.email = action.payload.email
		},
		setUserAvatar: (state, action: PayloadAction<User['pp']>) => {
			state.user.pp = action.payload
		},
		setTheme: (state, action: PayloadAction<Theme>) => {
			state.theme = action.payload
			localStorage.setItem('selectedTheme', JSON.stringify(action.payload))
		},
		logout: (state) => {
			state.isLogged = initialState.isLogged
			state.user = initialState.user
			state.token = initialState.token
			state.theme = initialState.theme
		},
	},
})

export const {
	login,
	logout,
	setUser,
	setTheme,
	setUserUsernameEmail,
	setUserAvatar,
} = user.actions
export default user.reducer
