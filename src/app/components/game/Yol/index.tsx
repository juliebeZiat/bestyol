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
		<div className='mt-8 flex flex-col items-center cursor-pointer gap-y-10'>
			{isEvolving && yol.data.level.level === 1 ? (
				<div
					onClick={() =>
						evolveYol(
							'/assets/yols/eggs/eclosion-feuille.gif',
							'/assets/yols/base/feuille.png',
						)
					}
				>
					<Image
						src='/assets/yols/eggs/eclosion-feuille.gif'
						width={150}
						height={150}
						alt='yol'
						className='animate-wiggleInfinite'
					/>
				</div>
			) : (
				<Image
					src={yol.data.species.image}
					width={150}
					height={150}
					alt='yol'
				/>
			)}
			<p className='text-white'>✨ {yol.data.name} ✨</p>
		</div>
	)
}

export default YolBox
