'use client'
import { useIsMobile } from '@/hooks/useWindowSize'
import Button, { ButtonSize } from '../ui/Button'
import { useState } from 'react'
import ConfettiExplosion from 'react-confetti-explosion'
import { useAppSelector } from '@/state/hooks'
import { RootState } from '@/state/store'
import SuccessAsset from '../ui/SuccessAsset'
import { useMutationValidateUserSuccess } from '@/services/mutations/success'
import { UserSuccess } from '@/type/success.type'
import { useFetchUserYol } from '@/services/queries/yol'

interface AchievementTileProps {
	achievement: UserSuccess
}

const AchievementTile = ({ achievement }: AchievementTileProps) => {
	const theme = useAppSelector((state: RootState) => state.user.theme)
	const user = useAppSelector((state: RootState) => state.user.user)

	const [validateSuccess, setValidateSuccess] = useState(false)
	const [isExploding, setIsExploding] = useState(false)

	const { id: userSuccessId, actualAmount, isCompleted, success } = achievement

	const { data: yolData } = useFetchUserYol(user.id)

	const { mutateAsync: validateSuccessMutation } =
		useMutationValidateUserSuccess()

	if (!yolData) return null

	const handleValidateSuccess = async () => {
		const data = { userSuccessId, yolId: yolData.data.id }

		await validateSuccessMutation(data, {
			onSuccess: async () => {
				setValidateSuccess(true)
			},
		})

		setTimeout(() => {
			setIsExploding(true)
		}, 1000)
	}

	return (
		<div
			className={`${
				actualAmount < success.amountNeeded
					? 'bg-lowOpacity'
					: `${theme.vibrantBackgroundColor}`
			} h-[15vh] p-8 w-[80%] flex ${
				useIsMobile() ? 'h-full flex-col gap-y-[1rem]' : ''
			} items-center relative text-white gap-x-[1rem] pixel-corners-items`}
		>
			<SuccessAsset
				image={success.image ?? '/assets/yols/egg/static/pouasson.png'}
				amount={success.amountNeeded}
				size={60}
			/>
			<div>
				<p className='text-2xl'>{success.title}</p>
				<p className='text-lg'>{success.description}</p>
			</div>
			<div className='absolute top-[1rem] right-[1rem] text-end text-2xl'>
				{isExploding && <ConfettiExplosion colors={['#FFF']} />}
				{actualAmount < success.amountNeeded && (
					<p>
						{actualAmount}/{success.amountNeeded}
					</p>
				)}
				<p>+{success.successXp}xp</p>
			</div>
			{actualAmount === success.amountNeeded && !isCompleted && (
				<div className='lg:absolute right-[1rem] top-12'>
					<Button
						content='Valider mon succès'
						backgroundColor={theme.secondaryBackgroundColor}
						size={ButtonSize.Small}
						additionalStyle={`mt-1 ${validateSuccess && 'animate-explode'}`}
						onClick={handleValidateSuccess}
					/>
				</div>
			)}
			{actualAmount < success.amountNeeded && (
				<div
					className={`absolute -bottom-1 left-0 h-[7px] customWidth ${theme.vibrantBackgroundColor}`}
				/>
			)}
			<style jsx>
				{`
					.customWidth {
						width: ${Math.round((actualAmount / success.amountNeeded) * 100)}%;
					}
				`}
			</style>
		</div>
	)
}

export default AchievementTile
