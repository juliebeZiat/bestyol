'use client'

import useWindowSize from '@/hooks/useWindowSize'
import { useFetchUserYol } from '@/services/queries/yol'
import { useAppDispatch, useAppSelector } from '@/state/hooks'
import { endEvolution } from '@/state/reducer/evolution.reducer'
import { RootState } from '@/state/store'
import { EvolutionAssets } from '@/type/yol.type'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import AudioPlayer from '../layout/AudioPlayer'

const EvolutionCinematic = ({
	previousForm,
	newForm,
	animatedNewForm,
	evolutionStep,
}: EvolutionAssets) => {
	const dispatch = useAppDispatch()
	const [currentImage, setCurrentImage] = useState(previousForm)
	const [hasEvolved, setHasEvolved] = useState(false)
	const user = useAppSelector((state: RootState) => state.user.user)
	const { data: yol } = useFetchUserYol(user.id)

	useEffect(() => {
		setTimeout(
			() => {
				setCurrentImage(newForm)
				setHasEvolved(true)
				setTimeout(() => {
					setCurrentImage(animatedNewForm)
				}, 5000)
			},
			evolutionStep == 0 ? 7300 : 12000,
		)
	}, [])

	const evolutionMessage =
		evolutionStep == 0 ? 'Votre oeuf a éclos !' : 'Votre yol a évolué !'

	const windowSizes = useWindowSize()

	return (
		<div
			className={`w-full h-full ${hasEvolved ? 'cursor-pointer' : ''}`}
			onClick={() => {
				if (hasEvolved) dispatch(endEvolution())
			}}
		>
			{evolutionStep === 0 ? (
				<AudioPlayer
					source={'/audio/egg-evolution.wav'}
					delay={1000}
					autoPlay
				/>
			) : (
				<AudioPlayer source={'/audio/species-evolution.wav'} autoPlay />
			)}
			<div className='bg-[#000] w-full h-[10vh] flex items-center p-[2rem]'>
				{hasEvolved && (
					<button
						type='button'
						className='text-white text-6xl'
						onClick={() => dispatch(endEvolution())}
					>
						&#x2190;
					</button>
				)}
			</div>
			<div className='h-[80vh] w-full flex flex-col gap-y-[2rem] items-center justify-center relative text-white text-center textShadow text-3xl lg:text-8xl '>
				<div
					className={`absolute top-0 left-0 opacity-0 bg-white h-full w-full pointer-events-none z-10 ${
						evolutionStep == 0 ? 'animate-flashEgg' : 'animate-flashEvolve'
					}`}
				/>
				<p className='absolute top-[1rem]'>
					{hasEvolved ? 'Félicitations !' : 'Hein ??'}
				</p>
				{evolutionStep == 0 && (
					<Image
						src={currentImage}
						width={windowSizes.windowWidth > 500 ? 300 : 150}
						height={windowSizes.windowWidth > 500 ? 300 : 150}
						alt='eclosion'
						className={`origin-bottom ${
							hasEvolved ? 'animate-jump' : 'animate-wiggle'
						} `}
					/>
				)}
				{evolutionStep! > 0 && (
					<>
						<Image
							src={currentImage}
							width={windowSizes.windowWidth > 500 ? 200 : 150}
							height={windowSizes.windowWidth > 500 ? 200 : 150}
							alt='eclosion'
							className={`absolute animate-evolveOut`}
						/>
						<Image
							src={animatedNewForm}
							width={windowSizes.windowWidth > 500 ? 300 : 150}
							height={windowSizes.windowWidth > 500 ? 300 : 150}
							alt='eclosion'
							className={`absolute animate-evolveIn`}
						/>
					</>
				)}
				<p className='absolute bottom-[1rem]'>
					{hasEvolved ? evolutionMessage : ''}
				</p>
			</div>
			<div className='bg-[#000] w-full h-[10vh]' />
		</div>
	)
}

export default EvolutionCinematic
