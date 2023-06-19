import { useEvolution } from '@/contexts/EvolutionContext'
import { useIsMobile } from '@/hooks/useWindowSize'
import { useFetchUserYol } from '@/services/queries/yol'
import { useAppSelector } from '@/state/hooks'
import { RootState } from '@/state/store'
import { evolutionLevels } from '@/utils/utils'
import Image from 'next/image'

const YolBox = () => {
	const isMobile = useIsMobile()
	const user = useAppSelector((state: RootState) => state.auth.user)
	if (!user) return null

	const { data: yol } = useFetchUserYol(user.id)
	if (!yol) return null

	const { evolveYol } = useEvolution()

	const isEvolving = evolutionLevels.some((level) => level === yol.data.xp)

	return (
		<div
			className={`h-full w-full flex flex-col justify-center items-center  ${
				isEvolving && 'cursor-pointer'
			}`}
		>
			<div
				onClick={() => {
					if (isEvolving) {
						evolveYol(
							'/assets/yols/eggs/animated/eclosion-feuille.gif',
							'/assets/yols/base/static/FEUILLE2.png',
							'/assets/yols/base/animated/feuille.gif',
						)
					}
				}}
			>
				<Image
					src={yol.data.species.image}
					width={150}
					height={150}
					alt='yol'
					className={isEvolving ? 'animate-wiggleInfinite origin-bottom' : ''}
				/>
			</div>
			<p className={`text-white ${!isMobile ? 'absolute bottom-4' : 'mt-4'}`}>
				✨ {yol.data.name} ✨
			</p>
		</div>
	)
}

export default YolBox
