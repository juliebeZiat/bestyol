'use client'

import React, { FC, PropsWithChildren, useEffect, useState } from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RootState, store } from '@/state/store'
import { Provider as ReduxProvider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { useAppSelector } from '@/state/hooks'
import axios from 'axios'

let persistor = persistStore(store)

const InitProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
	const [isLoaded, setIsLoaded] = useState<boolean>(false)
	const token = useAppSelector((state: RootState) => state.user.token)

	useEffect(() => {
		// axios.defaults.baseURL = 'http://tristan-derez-server.eddi.cloud:8080'
		if (token) {
			axios.defaults.headers.common = { Authorization: `Bearer ${token}` }
		}
		axios.defaults.headers.post['Content-Type'] = 'application/json'
		setIsLoaded(true)
	}, [])

	if (!isLoaded) {
		return <></>
	}

	return <>{children}</>
}

function Providers({ children }: React.PropsWithChildren) {
	const [client] = React.useState(
		new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } }),
	)

	return (
		<ReduxProvider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<QueryClientProvider client={client}>
					<InitProvider>{children}</InitProvider>
					{/* <ReactQueryDevtools initialIsOpen={false} /> */}
				</QueryClientProvider>
			</PersistGate>
		</ReduxProvider>
	)
}

export default Providers
