'use client'

import Navbar from '@/app/components/layout/Navbar'
import EvolutionCinematic from '@/app/components/ui/EvolutionCinematic'
import Loader from '@/app/components/ui/Loader'
import { useAppSelector } from '@/state/hooks'
import { RootState } from '@/state/store'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

const NavLayout = ({ children }: { children: React.ReactNode }) => {
	const isLogged = useAppSelector((state: RootState) => state.user.isLogged)
	const isEvolving = useAppSelector(
		(state: RootState) => state.evolution.isEvolving,
	)
	const evolutionAssets = useAppSelector(
		(state: RootState) => state.evolution.assets,
	)

	if (isLogged) {
		return (
			<>
				{!isEvolving ? (
					<>
						<Navbar />
						<Suspense fallback={<Loader />}>{children}</Suspense>
					</>
				) : (
					<EvolutionCinematic
						previousForm={evolutionAssets.previousForm!}
						newForm={evolutionAssets.newForm!}
						animatedNewForm={evolutionAssets.animatedNewForm!}
					/>
				)}
			</>
		)
	}
	return redirect('/')
}

export default NavLayout
