'use client'

import Navbar from '@/app/components/layout/navbar'
import { useAppSelector } from '@/state/hooks'
import { RootState } from '@/state/store'
import { redirect } from 'next/navigation'

const NavLayout = ({ children }: { children: React.ReactNode }) => {
	const isLogged = useAppSelector((state: RootState) => state.app.isLogged)

	if (isLogged) {
		return (
			<>
				<Navbar />
				{children}
			</>
		)
	}
	return redirect('/')
}

export default NavLayout
