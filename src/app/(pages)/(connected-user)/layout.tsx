'use client'

import Navbar from '@/app/components/layout/navbar'
import EvolutionCinematic from '@/app/components/ui/EvolutionCinematic'
import Loader from '@/app/components/ui/Loader'
import { useEvolution } from '@/contexts/EvolutionContext'
import { useAppSelector } from '@/state/hooks'
import { RootState } from '@/state/store'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

const NavLayout = ({ children }: { children: React.ReactNode }) => {
	const isLogged = useAppSelector((state: RootState) => state.auth.isLogged)
	const { evolution } = useEvolution()

	if (isLogged) {
		return (
			<>
				{!evolution.isEvolving ? (
					<>
						<Navbar />
						<Suspense fallback={<Loader />}>{children}</Suspense>
					</>
				) : (
					<EvolutionCinematic
						previousForm={evolution.previousForm!}
						newForm={evolution.newForm!}
						animatedNewForm={evolution.animatedNewForm!}
					/>
				)}
			</>
		)
	}
	return redirect('/')
}

export default NavLayout
