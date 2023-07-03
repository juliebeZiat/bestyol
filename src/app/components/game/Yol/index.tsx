import { useMutationEvolveYol } from '@/services/mutations/yol'
import { useFetchUserYol } from '@/services/queries/yol'
import { useAppDispatch, useAppSelector } from '@/state/hooks'
import { RootState } from '@/state/store'
import { SpeciesStages } from '@/type/species.type'
import {
	getEvolutionStep,
	getFormattedDate,
	isYolEvolving,
} from '@/utils/utils'
import Image from 'next/image'

const YolBox = () => {
	const dispatch = useAppDispatch()
	const user = useAppSelector((state: RootState) => state.user.user)
	const theme = useAppSelector((state: RootState) => state.user.theme)

	const { mutateAsync: evolveYol } = useMutationEvolveYol()

	const { data: yol } = useFetchUserYol(user.id)
	if (!yol) return null

	const handleEvolveYol = async () => {
		await evolveYol({ yolId: yol.data.id })
	}

	const animation =
		getEvolutionStep(yol.data) === 0
			? 'animate-wiggleInfinite'
			: 'animate-jumpInfinite'

	return (
		<div
			className={`h-full w-full flex flex-col justify-center  ${
				isYolEvolving(yol.data) && 'cursor-pointer'
			}`}
		>
			<div className='flex gap-x-8 w-[65%] justify-between p-10'>
				<div
					className={`p-4 pixel-corners-items ${theme.pixelBorderColor} ${theme.secondaryBackgroundColor} ${theme.borderColor} text-white`}
				>
					<h2 className='uppercase text-lg mb-2'>Informations</h2>
					<p>Nom: ✨ {yol.data.name} ✨</p>
					<p>Né le: {getFormattedDate(yol.data.createdAt)}</p>
					<p>Espèce: {yol.data.species.name}</p>
					<p>Stade d'évolution: {yol.data.species.stage}</p>
				</div>
				<div onClick={handleEvolveYol}>
					<Image
						src={
							yol.data.species.stage === SpeciesStages.EGG
								? yol.data.species.image
								: yol.data.species.gif
						}
						width={150}
						height={150}
						alt='yol'
						className={
							isYolEvolving(yol.data) ? `${animation} origin-bottom` : ''
						}
					/>
				</div>
			</div>
		</div>
	)
}

export default YolBox
