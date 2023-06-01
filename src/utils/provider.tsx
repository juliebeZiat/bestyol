'use client'

import React from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { store } from '@/state/store'
import { Provider as ReduxProvider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

let persistor = persistStore(store)

function Providers({ children }: React.PropsWithChildren) {
	const [client] = React.useState(
		new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } }),
	)

	return (
		<ReduxProvider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<QueryClientProvider client={client}>
					{children}
					<ReactQueryDevtools initialIsOpen={false} />
				</QueryClientProvider>
			</PersistGate>
		</ReduxProvider>
	)
}

export default Providers
