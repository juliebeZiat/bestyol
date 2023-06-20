import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './reducer/user.reducer'
import evolutionReducer from './reducer/evolution.reducer'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
	key: 'root',
	storage: storage,
	whitelist: ['user'],
}

const rootReducer = combineReducers({
	user: userReducer,
	evolution: evolutionReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
