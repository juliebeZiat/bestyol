'use client'
import Box from '@/app/components/ui/Box'
import Button from '@/app/components/ui/Button'
import TextField from '@/app/components/ui/TextField'
import { useIsMobile } from '@/hooks/useWindowSize'
import { useMutationSignIn } from '@/services/mutations/auth'
import { useAppDispatch } from '@/state/hooks'
import { login, setUser } from '@/state/reducer/user.reducer'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Loader from '@/app/components/ui/Loader'

const LoginPage = () => {
	const router = useRouter()
	const isMobile = useIsMobile()
	const dispatch = useAppDispatch()
	const [username, setUsername] = useState<string>('')
	const [password, setPassword] = useState<string>('')

	const { mutateAsync, isError, isLoading } = useMutationSignIn()

	const handleSignin = async () => {
		const data = { username, password }
		await mutateAsync(data, {
			onSuccess: async (data) => {
				dispatch(login(data.token))
				dispatch(setUser(data.user))
				router.push('/game')
			},
		})
	}

	const [hydrated, setHydrated] = useState(false)
	useEffect(() => {
		setHydrated(true)
	}, [])
	if (!hydrated) {
		return null
	}

	if (isLoading) return <Loader />

	return (
		<Box centerItems additionalStyle='mt-24' width={isMobile ? '80%' : '40%'}>
			<h1 className='text-white text-2xl mb-10'>Connexion</h1>
			<form className='w-3/4 mb-10'>
				<TextField
					inputFocus
					label="Votre nom d'utilisateur"
					labelFor='username'
					inputType='text'
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					error={isError}
				/>
				<TextField
					label='Votre mot de passe'
					labelFor='password'
					inputType='password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					error={isError}
				/>
				{isError && (
					<div>
						<p className='text-lg text-error'>
							Votre nom d'utilisateur ou mot de passe semblent incorrects
						</p>
					</div>
				)}
				<div className='flex flex-col items-center py-5'>
					<Button
						content='Je me connecte'
						textColor='text-white'
						onClick={handleSignin}
					/>

					<Link href='/signup' className='text-white mt-5'>
						Pas encore inscrit ? Inscrivez-vous
					</Link>
				</div>
			</form>
		</Box>
	)
}

export default LoginPage
