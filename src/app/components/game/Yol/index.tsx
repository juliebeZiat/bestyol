import { useAuth } from '@/contexts/AuthContext'
import { useEvolution } from '@/contexts/EvolutionContext'
import { useFetchUserYol } from '@/services/queries/yol'
import { evolutionLevels } from '@/utils/utils'
import Image from 'next/image'

const YolBox = () => {
	const { user } = useAuth()
	if (!user) return null

	const { data: yol } = useFetchUserYol(user.id)
	if (!yol) return null

	const { evolveYol } = useEvolution()

	const isEvolving = evolutionLevels.some((level) => level === yol.data.xp)

	return (
		<div
			className={`mt-8 flex flex-col items-center gap-y-10 ${
				isEvolving && 'cursor-pointer'
			}`}
		>
			<div
				onClick={() => {
					if (isEvolving) {
						evolveYol(
							'/assets/yols/eggs/eclosion-feuille.gif',
							'/assets/yols/base/feuille.png',
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

			<p className='text-white'>✨ {yol.data.name} ✨</p>
		</div>
	)
}

export default YolBox
