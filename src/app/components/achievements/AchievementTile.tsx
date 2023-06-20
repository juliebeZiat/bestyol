'use client'

import Image from 'next/image'
import { useIsMobile } from '@/hooks/useWindowSize'
import { useTheme } from '@/contexts/ThemeContext'
import Button, { ButtonSize } from '../ui/Button'
import { useState } from 'react'
import ConfettiExplosion from 'react-confetti-explosion'
import { useAppSelector } from '@/state/hooks'
import { RootState } from '@/state/store'

interface achievementTileProps {
	title: string
	description: string
	xp: number
	goal: number
	progress: number
	isCompleted: boolean
}

const AchievementTile = ({
	title,
	description,
	xp,
	goal,
	progress,
	isCompleted,
}: achievementTileProps) => {
	const theme = useAppSelector((state: RootState) => state.user.theme)
	const [validateSuccess, setValidateSuccess] = useState(false)
	const [isExploding, setIsExploding] = useState(false)

	const handleValidateSuccess = () => {
		setValidateSuccess(true)

		setTimeout(() => {
			setIsExploding(true)
		}, 1000)
	}

	return (
		<div
			className={`${
				progress < goal ? 'bg-lowOpacity' : `${theme.vibrantBackgroundColor}`
			} h-[15vh] p-8 w-[80%] flex ${
				useIsMobile() ? 'h-full flex-col gap-y-[1rem]' : ''
			} items-center relative text-white gap-x-[1rem] pixel-corners-items`}
			// style={{textShadow: '-0.5px -0.5px 2px black'}}
		>
			<Image
				src={'/assets/tempAchievement.png'}
				alt='achievement logo'
				width={useIsMobile() ? 40 : 50}
				height={useIsMobile() ? 40 : 50}
				className='h-[80%] w-auto'
			/>
			<div>
				<p className='text-2xl'>{title}</p>
				<p className='text-lg'>{description}</p>
			</div>
			<div className='absolute top-[1rem] right-[1rem] text-end text-2xl'>
				{isExploding && <ConfettiExplosion colors={['#FFF']} />}
				{progress < goal && (
					<p>
						{progress}/{goal}
					</p>
				)}
				<p>+{xp}xp</p>
			</div>
			{progress === goal && !isCompleted && (
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
			{progress < goal && (
				<div
					className={`absolute -bottom-1 left-0 h-[7px] customWidth ${theme.vibrantBackgroundColor}`}
				/>
			)}
			<style jsx>
				{`
					.customWidth {
						width: ${Math.round((progress / goal) * 100)}%;
					}
				`}
			</style>
		</div>
	)
}

export default AchievementTile
