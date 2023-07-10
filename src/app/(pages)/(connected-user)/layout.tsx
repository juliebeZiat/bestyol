'use client'

import Navbar from '@/app/components/layout/Navbar'
import EvolutionCinematic from '@/app/components/ui/EvolutionCinematic'
import Loader from '@/app/components/ui/Loader'
import { useFetchUserYol } from '@/services/queries/yol'
import { useAppSelector } from '@/state/hooks'
import { RootState } from '@/state/store'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

const NavLayout = ({ children }: { children: React.ReactNode }) => {
	const { isLogged, user } = useAppSelector((state: RootState) => state.user)
	const isEvolving = useAppSelector(
		(state: RootState) => state.evolution.isEvolving,
	)
	const evolutionAssets = useAppSelector(
		(state: RootState) => state.evolution.assets,
	)

	const { data: yolData } = useFetchUserYol(user.id)

	if (isLogged) {
		if (yolData) {
			return (
				<>
					{!isEvolving ? (
						<>
							<div className='h-[8svh] w-full'>
								<Navbar />
							</div>
							<div className='h-[92svh] w-full flex flex-col items-center justify-center'>
								<Suspense fallback={<Loader />}>{children}</Suspense>
							</div>
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
		} else return redirect('/choose-your-yol')
	}
	return redirect('/')
}

export default NavLayout
