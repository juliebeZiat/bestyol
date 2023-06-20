import { useIsMobile } from '@/hooks/useWindowSize'
import { useFetchUserYol } from '@/services/queries/yol'
import { useAppDispatch, useAppSelector } from '@/state/hooks'
import { evolveYol } from '@/state/reducer/evolution.reducer'
import { RootState } from '@/state/store'
import { EvolutionAssets } from '@/type/yol.type'
import {
	evolutionLevels,
	getEvolutionAssets,
	getEvolutionStep,
	isYolEvolving,
} from '@/utils/utils'
import Image from 'next/image'

const YolBox = () => {
	const dispatch = useAppDispatch()
	const isMobile = useIsMobile()
	const user = useAppSelector((state: RootState) => state.user.user)
	if (!user) return null

	const { data: yol } = useFetchUserYol(user.id)
	if (!yol) return null

	const animation =
		getEvolutionStep(yol.data) === 0
			? 'animate-wiggleInfinite'
			: 'animate-jumpInfinite'

	return (
		<div
			className={`h-full w-full flex flex-col justify-center items-center  ${
				isYolEvolving(yol.data) && 'cursor-pointer'
			}`}
		>
			<div
				onClick={() => {
					if (isYolEvolving(yol.data)) {
						dispatch(evolveYol(getEvolutionAssets(yol.data)!))
					}
				}}
			>
				<Image
					src={yol.data.species.image}
					width={150}
					height={150}
					alt='yol'
					className={
						isYolEvolving(yol.data) ? `${animation} origin-bottom` : ''
					}
				/>
			</div>
			<p className={`text-white ${!isMobile ? 'absolute bottom-4' : 'mt-4'}`}>
				✨ {yol.data.name} ✨
			</p>
		</div>
	)
}

export default YolBox
