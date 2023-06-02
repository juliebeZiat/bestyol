'use client'

import { useEvolution } from '@/contexts/EvolutionContext'
import useWindowSize from '@/hooks/useWindowSize'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const EvolutionCinematic = ({
	previousForm,
	newForm,
}: {
	previousForm: string
	newForm: string
}) => {
	const { endEvolution } = useEvolution()
	const [currentImage, setCurrentImage] = useState(previousForm)
	const [hasEvolved, setHasEvolved] = useState(false)

	useEffect(() => {
		setTimeout(() => {
			setCurrentImage(newForm)
			setHasEvolved(true)
		}, 7300)
	}, [])

	const windowSizes = useWindowSize()

	return (
		<>
			<div className='bg-[#000] w-full h-[10vh] flex items-center p-[2rem]'>
				{hasEvolved && (
					<button
						type='button'
						className='text-white text-6xl'
						onClick={endEvolution}
					>
						&#x2190;
					</button>
				)}
			</div>
			<div className='h-[80vh] w-full flex flex-col gap-y-[2rem] items-center justify-center relative text-white text-center textShadow text-3xl lg:text-8xl '>
				<div className='absolute top-0 left-0 opacity-0 bg-white h-full w-full pointer-events-none z-10 animate-flash' />
				<p className='absolute top-[1rem]'>
					{hasEvolved ? 'Félicitations !' : 'Hein ??'}
				</p>
				<Image
					src={currentImage}
					width={windowSizes.windowWidth > 500 ? 300 : 150}
					height={windowSizes.windowWidth > 500 ? 300 : 150}
					alt='eclosion'
					className={`origin-bottom ${
						hasEvolved ? 'animate-jump' : 'animate-wiggle'
					} `}
				/>
				<p className='absolute bottom-[1rem]'>
					{hasEvolved ? 'Votre oeuf a éclos !' : ''}
				</p>
			</div>
			<div className='bg-[#000] w-full h-[10vh]' />
		</>
	)
}

export default EvolutionCinematic
