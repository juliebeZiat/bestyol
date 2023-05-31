import { UserData } from '@/data/type/user'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type AuthState = {
	isLogged: boolean
	accessToken: string
	user: UserData
}

const initialState = {
	isLogged: false,
	accessToken: '',
	user: {},
} as AuthState

export const auth = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state, { payload }: PayloadAction<AuthState['user']>) => {
			state.isLogged = true
			state.user.banner = payload.banner
			state.user.pp = payload.pp
			state.user.name = payload.name
			state.user.email = payload.email
		},
		logout: () => initialState,
	},
})

export const { login, logout } = auth.actions
export default auth.reducer
