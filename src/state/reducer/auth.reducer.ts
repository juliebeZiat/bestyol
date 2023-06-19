import { User } from '@/type/user.type'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type AuthState = {
	user: User
	isLogged: boolean
	isInitialized: boolean
}

const initialState = {
	isLogged: false,
	user: {},
} as AuthState

export const auth = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state) => {
			state.isLogged = true
		},
		setUser: (state, action: PayloadAction<User>) => {
			state.user = action.payload
		},
		logout: () => initialState,
	},
})

export const { login, logout, setUser } = auth.actions
export default auth.reducer
