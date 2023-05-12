'use client'

import Image from 'next/image'
import { useIsMobile } from '@/hooks/useWindowSize'

interface achievement {
	title: string
	description: string
	xp: number
	goal: number
	progress: number
}

const AchievementTile = ({
	title,
	description,
	xp,
	goal,
	progress,
}: achievement) => {
	// const progressPercent = Math.round((progress / goal) * 100)
	// const widthClass = `w-[${progressPercent}%]`

	return (
		<div
			className={`${
				progress < goal ? 'bg-lowOpacity' : 'bg-orange'
			} p-8 w-[80%] flex ${
				useIsMobile() ? 'flex-col text-center' : ''
			} items-center relative text-white gap-x-[1rem]`}
		>
			<Image
				src={'/assets/tempAchievement.png'}
				alt='achievement logo'
				width={50}
				height={50}
			/>
			<div>
				<p className='text-2xl'>{title}</p>
				<p>{description}</p>
			</div>
			<div className='absolute top-[1rem] right-[1rem] text-end'>
				{progress < goal && (
					<p>
						{progress}/{goal}
					</p>
				)}
				<p>+{xp}xp</p>
			</div>
			{progress < goal && (
				<div className='absolute bottom-0 left-0 bg-blue h-[7px] customWidth'></div>
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
