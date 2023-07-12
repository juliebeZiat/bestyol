import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type SoundState = {
    muted: boolean
}

const initialState = {
    muted: true
} as SoundState

export const sound = createSlice({
    name: 'sound',
    initialState,
    reducers: {
        toggleMute: (
            state,
            action: PayloadAction<{ muted: boolean }>,
        ) => {
            state.muted = action.payload.muted
        },
    },
})

export const { toggleMute } = sound.actions
export default sound.reducer
