import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type AppState = {
	isLogged: boolean
}

const initialState = {
	isLogged: false,
} as AppState

export const app = createSlice({
	name: 'app',
	initialState,
	reducers: {
		login: (state) => {
			state.isLogged = true
		},
		logout: () => initialState,
	},
})

export const { login, logout } = app.actions
export default app.reducer
