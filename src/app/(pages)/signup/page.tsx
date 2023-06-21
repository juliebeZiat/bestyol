'use client'
import Box from '@/app/components/ui/Box'
import Button from '@/app/components/ui/Button'
import TextField from '@/app/components/ui/TextField'
import { useIsMobile } from '@/hooks/useWindowSize'
import { useMutationSignUp } from '@/services/mutations/auth'
import { useAppDispatch } from '@/state/hooks'
import { login, setUser } from '@/state/reducer/user.reducer'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const SigninPage = () => {
	const router = useRouter()
	const isMobile = useIsMobile()
	const dispatch = useAppDispatch()
	const [username, setUsername] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [passwordConfirm, setPasswordConfirm] = useState<string>('')
	const [passwordError, setPasswordError] = useState<boolean>(false)

	const { mutateAsync, isError, isLoading } = useMutationSignUp()

	const handleSubmit = async () => {
		const data = { username, email, password }
		if (password !== passwordConfirm) {
			setPasswordError(true)
		}
		await mutateAsync(data, {
			onSuccess: async (data) => {
				dispatch(login(data.token))
				dispatch(setUser(data.user))
				router.push('/choose-your-yol')
			},
		})
	}

	return (
		<Box centerItems additionalStyle='mt-24' width={isMobile ? '80%' : '40%'}>
			<h1 className='text-white text-2xl mb-10'>Inscription</h1>
			<form className='w-3/4 mb-10'>
				<TextField
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					label="Votre nom d'utilisateur"
					labelFor='username'
					inputFocus
				/>
				<TextField
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					label='Votre email'
					labelFor='email'
					inputType='email'
				/>
				<TextField
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					label='Votre mot de passe'
					labelFor='password'
					inputType='password'
				/>
				<TextField
					value={passwordConfirm}
					onChange={(e) => setPasswordConfirm(e.target.value)}
					label='Confirmation de votre mot de passe'
					labelFor='confirmPassword'
					inputType='password'
				/>
				{(isError || passwordError) && (
					<div>
						<p className='text-lg text-error'>Erreur</p>
					</div>
				)}
				<div className='flex flex-col items-center py-5'>
					<Button content="Je m'inscris" onClick={handleSubmit} />
					<Link href='/login' className='text-white mt-5'>
						Déjà inscrit ? Connectez-vous
					</Link>
				</div>
			</form>
		</Box>
	)
}

export default SigninPage
