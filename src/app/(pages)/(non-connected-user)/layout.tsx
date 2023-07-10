'use client'
import Loader from '@/app/components/ui/Loader'
import { useAppSelector } from '@/state/hooks'
import { RootState } from '@/state/store'
import { redirect, useRouter } from 'next/navigation'
import { Suspense } from 'react'

const NavLayout = ({ children }: { children: React.ReactNode }) => {
	const isLogged = useAppSelector((state: RootState) => state.user.isLogged)

	if (!isLogged) {
		return (
			<>
				<Suspense fallback={<Loader />}>{children}</Suspense>
			</>
		)
	}
	return redirect('/game')
}

export default NavLayout
