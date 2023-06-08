'use client'

import Box from '@/app/components/ui/Box'
import Button from '@/app/components/ui/Button'
import TextField from '@/app/components/ui/TextField'
import { useIsMobile } from '@/hooks/useWindowSize'
import { useAppDispatch } from '@/state/hooks'
import { login } from '@/state/reducer/app.reducer'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const LoginPage = () => {
	const isMobile = useIsMobile()
	const dispatch = useAppDispatch()

	const [hydrated, setHydrated] = useState(false)
	useEffect(() => {
		setHydrated(true)
	}, [])
	if (!hydrated) {
		return null
	}

	return (
		<Box centerItems additionalStyle='mt-24' width={isMobile ? '80%' : '40%'}>
			<h1 className='text-white text-2xl mb-10'>Connexion</h1>
			<form className='w-3/4 mb-10'>
				<TextField label='Votre email' labelFor='email' inputType='email' />
				<TextField
					label='Votre mot de passe'
					labelFor='password'
					inputType='password'
				/>
				<div className='flex flex-col items-center py-5'>
					<Link href='/game'>
						<Button
							content='Je me connecte'
							textColor='text-white'
							onClick={() => dispatch(login())}
						/>
					</Link>
					<Link href='/signup' className='text-white mt-5'>
						Pas encore inscrit ? Inscrivez-vous
					</Link>
				</div>
			</form>
		</Box>
	)
}

export default LoginPage
