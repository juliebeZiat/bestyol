'use client'

import Box from '@/app/components/ui/Box'
import Button from '@/app/components/ui/Button'
import TextField from '@/app/components/ui/TextField'
import { useIsMobile } from '@/hooks/useWindowSize'
import { useAppDispatch } from '@/state/hooks'
import { login } from '@/state/reducer/auth.reducer'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import userList from '@/data/user.json'
import { UserData } from '@/data/type/user'

const LoginPage = () => {
	const [email, setEmail] = useState<string>()
	const [password, setPassword] = useState<string>()
	const [error, setError] = useState(false)

	const isMobile = useIsMobile()
	const dispatch = useAppDispatch()

	const [hydrated, setHydrated] = useState(false)
	useEffect(() => {
		setHydrated(true)
	}, [])
	if (!hydrated) {
		return null
	}

	const handleSubmit = () => {
		const user = userList.find((user: UserData) => user.email === email)
		if (!user) {
			setError(true)
		} else if (user.password === password) {
			dispatch(login(user))
		}
	}

	return (
		<Box centerItems additionalStyle='mt-24' width={isMobile ? '80%' : '40%'}>
			<h1 className='text-white text-2xl mb-10'>Connexion</h1>
			<form className='w-3/4 mb-10'>
				<TextField
					inputFocus
					label='Votre email'
					labelFor='email'
					inputType='email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					error={error}
				/>
				<TextField
					label='Votre mot de passe'
					labelFor='password'
					inputType='password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					error={error}
				/>
				{/* TODO error component */}
				{error && <div>Email ou mot de passe incorrect</div>}
				<div className='flex flex-col items-center py-5'>
					<Link href='/game'>
						<Button
							content='Je me connecte'
							textColor='text-white'
							backgroundColor='bg-orange'
							onClick={handleSubmit}
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
