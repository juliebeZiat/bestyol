import { EvolutionAssets } from '@/type/yol.type'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type EvolutionState = {
	isEvolving: boolean
	assets: EvolutionAssets
}

const initialState = {
	isEvolving: false,
	assets: {},
} as EvolutionState

export const evolution = createSlice({
	name: 'evolution',
	initialState,
	reducers: {
		evolveYol: (state, action: PayloadAction<EvolutionState['assets']>) => {
			state.isEvolving = true
			state.assets = action.payload
		},
		endEvolution: () => initialState,
	},
})

export const { evolveYol, endEvolution } = evolution.actions
export default evolution.reducer
