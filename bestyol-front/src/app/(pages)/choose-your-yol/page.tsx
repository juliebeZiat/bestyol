'use client'

import { yol } from '@/app/components/interfaces'
import Box from '@/app/components/ui/Box'
import Button, { ButtonSize } from '@/app/components/ui/Button'
import TextField from '@/app/components/ui/TextField'
import YolCarousel from '@/app/components/ui/YolCarousel'
import TestYolCarousel from '@/app/components/ui/testYolCarousel'
import { useEffect, useState } from 'react'

const ChooseYourYol = () => {
	const [yolName, setYolName] = useState('test')
	const [currentYol, setCurrentYol] = useState<yol>()
	const [hydrated, setHydrated] = useState(false)
	useEffect(() => {
		setHydrated(true)
	}, [])
	if (!hydrated) {
		return null
	}

	const getCurrentYol = (yol: yol) => {
		setCurrentYol(yol)
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		console.log(currentYol?.name, yolName)
	}

	return (
		<div className='w-full h-[100svh] flex items-center justify-center text-white text-center'>
			<form className='flex items-center' onSubmit={handleSubmit}>
				<Box
					centerItems
					additionalStyle='h-[80vh] lg:aspect-square justify-between'
				>
					<h1 className='text-2xl lg:text-5xl'>Bienvenue, User !</h1>
					<p className='lg:text-3xl text-center'>
						Choisis ton Yol ! Ce sera ton compagnon tout au long de ton
						aventure, alors choisis le bien !
					</p>
					<div className='w-full text-center'>
						<TestYolCarousel getCurrentYol={getCurrentYol} />
						<h2 className='text-4xl'>{currentYol?.name ?? ''}</h2>
					</div>

					<div className='w-[40%]'>
						<TextField
							value={yolName}
							onChange={(e) => setYolName(e.target.value)}
							inputType='text'
						/>
					</div>
					<Button
						backgroundColor='bg-orange'
						content="C'est parti !"
						type='submit'
						size={ButtonSize.Medium}
					/>
				</Box>
			</form>
		</div>
	)
}

export default ChooseYourYol
