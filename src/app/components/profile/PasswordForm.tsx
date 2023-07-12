import { useState } from 'react'
import TextField from '../ui/TextField'
import { useAppDispatch, useAppSelector } from '@/state/hooks'
import { RootState } from '@/state/store'
import Button from '../ui/Button'
import { editUserPasswordSchema } from '@/utils/formValidationSchema'
import { useMutationEditUserPassword } from '@/services/mutations/user'
import { setNotification } from '@/state/reducer/notification.reducer'

interface PasswordFormProps {
	closeModal: () => void
}

const PasswordForm = ({ closeModal }: PasswordFormProps) => {
	const dispatch = useAppDispatch()
	const { user, theme } = useAppSelector((state: RootState) => state.user)

	const [values, setValues] = useState({
		formerPassword: '',
		newPassword: '',
		newPasswordConfirm: '',
	})

	const [requestError, setRequestError] = useState<string | null>()
	const [errors, setErrors] = useState<{ [key: string]: string }>({})

	const { mutateAsync, isError } = useMutationEditUserPassword()

	const handleSubmit = async () => {
		const data = {
			formerPassword: values.formerPassword,
			newPassword: values.newPassword,
			newPasswordConfirm: values.newPasswordConfirm,
			userId: user.id,
		}

		try {
			await editUserPasswordSchema.validate(data, { abortEarly: false })
			setErrors({})
			await mutateAsync(data, {
				onSuccess: async (data) => {
					dispatch(
						setNotification({
							title: 'Votre mot de passe a bien été modifié',
							link: '',
						}),
					)
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

	return (
		<div className='flex flex-col gap-5 min-w-[250px] sm:min-w-[350px] lg:min-w-[500px] min-h-[300px]'>
			<div className='flex flex-col gap-5'>
				<TextField
					value={values.formerPassword}
					onChange={(e) =>
						setValues({
							...values,
							formerPassword: e.target.value,
						})
					}
					label='Votre mot de passe'
					labelFor='formerPassword'
					inputType='password'
					errorMessage={errors['formerPassword']}
				/>
				<TextField
					value={values.newPassword}
					onChange={(e) =>
						setValues({
							...values,
							newPassword: e.target.value,
						})
					}
					label='Votre mot de passe'
					labelFor='newPassword'
					inputType='password'
					errorMessage={errors['newPassword']}
				/>
				<TextField
					value={values.newPasswordConfirm}
					onChange={(e) =>
						setValues({
							...values,
							newPasswordConfirm: e.target.value,
						})
					}
					label='Confirmation de votre mot de passe'
					labelFor='newPasswordConfirm'
					inputType='password'
					errorMessage={errors['newPasswordConfirm']}
				/>
				{isError && (
					<div>
						<p className='text-lg text-error'>
							Votre mot de passe actuel ne semble pas correct
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
