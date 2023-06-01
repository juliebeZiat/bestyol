'use client'

import Button, { ButtonSize } from '@/app/components/ui/Button'
import YolCarousel from '@/app/components/ui/YolCarousel'
import useWindowSize from '@/hooks/useWindowSize'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import TestYolCarousel from '../components/ui/NewYolCarousel'

const HomePage = () => {
	const windowSize = useWindowSize()
	const [hydrated, setHydrated] = useState(false)
	useEffect(() => {
		setHydrated(true)
	}, [])
	if (!hydrated) {
		return null
	}

	return (
		<div className='flex flex-col h-screen justify-center items-center text-white gap-10'>
			<div className='flex flex-col justify-center items-center'>
				<div className='w-fit relative'>
					<h1 className='text-7xl sm:text-[100px] lg:text-[150px] text-center'>
						BEST YOL
					</h1>
					<h2 className='absolute right-0 top-[55px] sm:top-[80px] lg:top-[120px]'>
						le meilleur de toi-même
					</h2>
				</div>
				<TestYolCarousel />
			</div>
			<div className='flex gap-5'>
				<Link href='/login'>
					<Button
						content='Connexion'
						backgroundColor='bg-lowOpacity'
						size={
							windowSize.windowWidth > 1024
								? ButtonSize.Large
								: ButtonSize.Medium
						}
					/>
				</Link>
				<Link href='/signup'>
					<Button
						content='Inscription'
						backgroundColor='bg-lowOpacity'
						size={
							windowSize.windowWidth > 1024
								? ButtonSize.Large
								: ButtonSize.Medium
						}
					/>
				</Link>
			</div>
			<div className='text-center w-2/3 text-xl sm:text-xl'>
				<p className='textShadow'>
					Bienvenue sur Best yol, le site web qui vous offre une expérience
					unique et motivante ! Best'yol vous présente Yol, votre compagnon
					virtuel plein d'énergie et d'enthousiasme.
				</p>
				<p className='textShadow'>
					Yol est bien plus qu'un simple personnage animé : il évolue en
					fonction de vos accomplissements quotidiens. Imaginez, chaque fois que
					vous terminez une tâche, qu'elle soit prévue ou que vous la créiez
					vous-même, Yol se développe et prend de nouvelles apparences !
				</p>
			</div>
		</div>
	)
}

export default HomePage