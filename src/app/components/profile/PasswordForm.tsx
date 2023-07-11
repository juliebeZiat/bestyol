import { useState } from 'react'
import TextField from '../ui/TextField'
import { useAppDispatch, useAppSelector } from '@/state/hooks'
import { RootState } from '@/state/store'
import Button from '../ui/Button'
import { editUserPasswordSchema } from '@/utils/formValidationSchema'
import { setUser } from '@/state/reducer/user.reducer'
import Loader from '../ui/Loader'
import { useMutationEditUserPassword } from '@/services/mutations/user'

interface PasswordFormProps {
	closeModal: () => void
}

const PasswordForm = ({ closeModal }: PasswordFormProps) => {
	const dispatch = useAppDispatch()
	const { user, theme } = useAppSelector((state: RootState) => state.user)

	const [passwordValues, setPasswordValues] = useState({
		newPassword: '',
		newPasswordConfirm: '',
	})

	const [requestError, setRequestError] = useState<string | null>()
	const [errors, setErrors] = useState<{ [key: string]: string }>({})

	const { mutateAsync, isError, isLoading } = useMutationEditUserPassword()

	const handleSubmit = async () => {
		const data = {
			password: passwordValues.newPassword,
			passwordConfirm: passwordValues.newPasswordConfirm,
			userId: user.id,
		}

		try {
			await editUserPasswordSchema.validate(data, { abortEarly: false })
			setErrors({})
			await mutateAsync(data, {
				onSuccess: async (data) => {
					// dispatch(setUser(data))
					// dispatch(setNotification({title: "Votre mot de passe a bien été modifié", link: ""}))
					closeModal()
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
		<div className='flex flex-col gap-5 min-w-[250px] sm:min-w-[350px] lg:min-w-[500px] min-h-[300px]'>
			<div className='flex flex-col gap-5'>
				<TextField
					label='Mot de passe actuel'
					inputType='password'
					inputFocus
				/>
				<TextField
					value={passwordValues.newPassword}
					onChange={(e) =>
						setPasswordValues({
							...passwordValues,
							newPassword: e.target.value,
						})
					}
					label='Votre mot de passe'
					labelFor='newPassword'
					inputType='password'
					errorMessage={errors['password']}
				/>
				<TextField
					value={passwordValues.newPasswordConfirm}
					onChange={(e) =>
						setPasswordValues({
							...passwordValues,
							newPasswordConfirm: e.target.value,
						})
					}
					label='Confirmation de votre mot de passe'
					labelFor='newPasswordConfirm'
					inputType='password'
					errorMessage={errors['passwordConfirm']}
				/>
				{isError && (
					<div>
						<p className='text-lg text-error'>
							Il y a eu un problème de la modification du mot de passe
							{requestError && `: ${requestError}`}
						</p>
					</div>
				)}
				<Button
					content='Valider'
					backgroundColor={theme.secondaryBackgroundColor}
					textColor='text-white'
					additionalStyle='w-[50%] self-center'
					onClick={handleSubmit}
				/>
			</div>
		</div>
	)
}

export default PasswordForm
