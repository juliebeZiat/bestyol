'use client'

import { useFetchUserById } from '@/services/queries/user'
import { User } from '@/type/user.type'
import {
	ReactNode,
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react'

interface AuthContextProps {
	user: User | undefined
	isLogged: boolean
	isInitialized: boolean
}

interface AuthProviderProps {
	children: ReactNode
}

const AuthContext = createContext({} as AuthContextProps)

const AuthProvider = ({ children }: AuthProviderProps) => {
	const userId = 1
	const { data: userData } = useFetchUserById(userId)

	const [user, setUser] = useState<User | undefined>(undefined)
	const [isLogged, setIsLogged] = useState<boolean>(false)
	const [isInitialized, setIsInitialized] = useState<boolean>(false)

	const init = useCallback(() => {
		// if token
		const data = userData?.data

		if (data) {
			setIsLogged(true)
			setUser(data)
		}
		setIsInitialized(true)
	}, [userData])

	useEffect(() => {
		init()
	}, [init])

	const value: AuthContextProps = {
		user,
		isLogged,
		isInitialized,
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

export default AuthProvider
