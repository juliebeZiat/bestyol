'use client'

import Image from 'next/image'
import { useIsMobile } from '@/hooks/useWindowSize'

interface achievementTileProps {
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
}: achievementTileProps) => {

	return (
		<div
			className={`${
				progress < goal ? 'bg-lowOpacity' : 'bg-orange'
			} h-[15vh] p-8 w-[80%] flex ${
				useIsMobile() ? 'flex-col text-center' : ''
			} items-center relative text-white gap-x-[1rem]`}
			 style={{textShadow: '-0.5px -0.5px 2px black'}}
		>
			<Image
				src={'/assets/tempAchievement.png'}
				alt='achievement logo'
				width={50}
				height={50}
				className='h-[80%] w-auto'
			/>
			<div>
				<p className='text-3xl'>{title}</p>
				<p className='text-xl'>{description}</p>
			</div>
			<div className='absolute top-[1rem] right-[1rem] text-end text-2xl'>
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
