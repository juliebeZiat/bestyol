'use client'

import { yol } from '@/app/components/interfaces'
import Box from '@/app/components/ui/Box'
import Button, { ButtonSize } from '@/app/components/ui/Button'
import TextField from '@/app/components/ui/TextField'
import YolCarousel from '@/app/components/ui/YolCarousel'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const ChooseYourYol = () => {
	const [yolName, setYolName] = useState('')
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
		<div className='h-[100svh] flex items-center justify-center text-white text-center'>
			<form className='flex items-center' onSubmit={handleSubmit}>
				<Box
					centerItems
					additionalStyle='h-[80vh] lg:aspect-square justify-between'
					width='60vw'
				>
					<h1 className='text-2xl lg:text-4xl'>Bienvenue, User !</h1>
					<p className='lg:text-2xl text-center w-5/6'>
						Choisis ton Yol ! Ce sera ton compagnon tout au long de ton
						aventure, alors choisis le bien !
					</p>
					<div className='text-center flex flex-col justify-items-center w-5/6 m-auto'>
						<YolCarousel getCurrentYol={getCurrentYol} applyTheme />
						<h2 className='text-4xl'>{currentYol?.name ?? ''}</h2>
					</div>

					<div className='w-[40%]'>
						<TextField
							inputFocus
							value={yolName}
							onChange={(e) => setYolName(e.target.value)}
							inputType='text'
							placeholder='Quel est son petit nom ?'
						/>
					</div>
					<Link href='/game'>
						<Button
							content="C'est parti !"
							type='submit'
							size={ButtonSize.Medium}
						/>
					</Link>
				</Box>
			</form>
		</div>
	)
}

export default ChooseYourYol
