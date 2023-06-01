'use client'

import Navbar from '@/app/components/layout/navbar'
import AuthProvider, { useAuth } from '@/contexts/AuthContext'
import { redirect } from 'next/navigation'

const NavLayout = ({ children }: { children: React.ReactNode }) => {
	const isLogged = true
	// const { isLogged } = useAuth()

	if (isLogged) {
		return (
			<AuthProvider>
				<Navbar />
				{children}
			</AuthProvider>
		)
	}
	return redirect('/')
}

export default NavLayout
