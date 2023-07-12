import { useMutationEvolveYol } from '@/services/mutations/yol'
import { useFetchUserYol } from '@/services/queries/yol'
import { useAppDispatch, useAppSelector } from '@/state/hooks'
import { evolveYol } from '@/state/reducer/evolution.reducer'
import { setNotification } from '@/state/reducer/notification.reducer'
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

	const { mutateAsync: evolveYolMutation } = useMutationEvolveYol()

	const { data: yol } = useFetchUserYol(user.id)
	if (!yol) return null

	const handleEvolveYol = async () => {
		if (isYolEvolving(yol.data)) {
			dispatch(
				setNotification({
					title: "Je crois qu'il se passe quelque chose avec ton Yol...",
					link: '',
				}),
			)
		}
		if (!isYolEvolving(yol.data)) return
		const evolutionStep = getEvolutionStep(yol.data)
		const previousForm = yol.data.species.gif
		const {
			data: { newSpecies },
		} = await evolveYolMutation({ yolId: yol.data.id })
		const newForm = newSpecies.image
		const animatedNewForm = newSpecies.gif
		dispatch(
			evolveYol({ previousForm, newForm, animatedNewForm, evolutionStep }),
		)
	}

	const getYolHeight = () => {
		if (yol.data.species.stage === SpeciesStages.ADO)
			return 'h-[80px] lg:h-[70%]'
		if (yol.data.species.stage === SpeciesStages.FINAL)
			return 'h-[80px] lg:h-full'
		return 'h-[80px] lg:h-[50%]'
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
			<div className='h-full w-full flex gap-x-8 lg:gap-x-16 justify-center flex-wrap lg:flex-nowrap items-center'>
				<div
					className={`p-4 pixel-corners-items ${theme.pixelBorderColor} ${theme.secondaryBackgroundColor} ${theme.borderColor} text-white`}
				>
					<h2 className='uppercase text-lg mb-2'>Informations</h2>
					<p>Nom: ✨ {yol.data.name} ✨</p>
					<p>Né le: {getFormattedDate(yol.data.createdAt)}</p>
					<p>Espèce: {yol.data.species.name}</p>
					<p>Stade d'évolution: {yol.data.species.stage}</p>
				</div>
				<div
					onClick={handleEvolveYol}
					className='h-full flex items-center justify-center'
				>
					<Image
						src={
							yol.data.species.stage === SpeciesStages.EGG
								? yol.data.species.image
								: yol.data.species.gif
						}
						width={150}
						height={150}
						alt='yol'
						className={`${getYolHeight()} w-auto ${
							isYolEvolving(yol.data) ? `${animation} origin-bottom` : ''
						}`}
					/>
				</div>
			</div>
		</div>
	)
}

export default YolBox
