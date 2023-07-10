'use client'
import Box from '@/app/components/ui/Box'
import Button from '@/app/components/ui/Button'
import Loader from '@/app/components/ui/Loader'
import TextField from '@/app/components/ui/TextField'
import { useIsMobile } from '@/hooks/useWindowSize'
import { useMutationSignUp } from '@/services/mutations/auth'
import { useAppDispatch } from '@/state/hooks'
import { login, setUser } from '@/state/reducer/user.reducer'
import { signinSchema } from '@/utils/formValidationSchema'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const SigninPage = () => {
	const router = useRouter()
	const isMobile = useIsMobile()
	const dispatch = useAppDispatch()

	const [values, setValues] = useState({
		username: '',
		email: '',
		password: '',
		passwordConfirm: '',
	})

	const [requestError, setRequestError] = useState<string | null>()
	const [errors, setErrors] = useState<{ [key: string]: string }>({})

	const { mutateAsync, isError, isLoading } = useMutationSignUp()

	const handleSubmit = async () => {
		const data = {
			username: values.username,
			email: values.email,
			password: values.password,
			passwordConfirm: values.passwordConfirm,
		}

		try {
			await signinSchema.validate(data, { abortEarly: false })
			setErrors({})
			await mutateAsync(data, {
				onSuccess: async (data) => {
					dispatch(login(data.token))
					dispatch(setUser(data.user))
					router.push('/choose-your-yol')
				},
				onError: async (error: any) => {
					setRequestError(error.response.data.erreur)
				},
			})
		} catch (error: any) {
			const validationErrors: { [key: string]: string } = {}
			error.inner.forEach((fieldError: any) => {
				validationErrors[fieldError.path] = fieldError.message
			})
			setErrors(validationErrors)
		}
	}

	if (isLoading) return <Loader />

	return (
		<Box centerItems additionalStyle='mt-24' width={isMobile ? '80%' : '40%'}>
			<h1 className='text-white text-2xl mb-10'>Inscription</h1>
			<form className='w-3/4 mb-10'>
				<TextField
					value={values.username}
					onChange={(e) => setValues({ ...values, username: e.target.value })}
					label="Votre nom d'utilisateur"
					labelFor='username'
					inputFocus
					errorMessage={errors['username']}
				/>
				<TextField
					value={values.email}
					onChange={(e) => setValues({ ...values, email: e.target.value })}
					label='Votre email'
					labelFor='email'
					inputType='email'
					errorMessage={errors['email']}
				/>
				<TextField
					value={values.password}
					onChange={(e) => setValues({ ...values, password: e.target.value })}
					label='Votre mot de passe'
					labelFor='password'
					inputType='password'
					errorMessage={errors['password']}
				/>
				<TextField
					value={values.passwordConfirm}
					onChange={(e) =>
						setValues({ ...values, passwordConfirm: e.target.value })
					}
					label='Confirmation de votre mot de passe'
					labelFor='confirmPassword'
					inputType='password'
					errorMessage={errors['passwordConfirm']}
				/>
				{isError && (
					<div>
						<p className='text-lg text-error'>
							Il y a eu un problème de l'inscription
							{requestError && `: ${requestError}`}
						</p>
					</div>
				)}
				<div className='flex flex-col items-center py-5'>
					<Button
						content="Je m'inscris"
						onClick={handleSubmit}
						textColor='text-white'
						type='submit'
					/>
					<Link href='/login' className='text-white mt-5'>
						Déjà inscrit ? Connectez-vous
					</Link>
				</div>
			</form>
		</Box>
	)
}

export default SigninPage
