import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type NotificationState = {
	isNotified: boolean
	title: string
	link: string
}

const initialState = {
	isNotified: false,
	title: '',
	link: '',
} as NotificationState

export const notification = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		setNotification: (
			state,
			action: PayloadAction<{ title: string; link: string }>,
		) => {
			state.isNotified = true
			state.title = action.payload.title
			state.link = action.payload.link
		},
		unsetNotification: () => initialState,
	},
})

export const { setNotification, unsetNotification } = notification.actions
export default notification.reducer
