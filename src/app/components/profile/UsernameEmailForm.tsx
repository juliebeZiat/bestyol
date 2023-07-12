import { useState } from 'react'
import TextField from '../ui/TextField'
import { useAppDispatch, useAppSelector } from '@/state/hooks'
import { RootState } from '@/state/store'
import Button from '../ui/Button'
import { editUserUsernameEmailSchema } from '@/utils/formValidationSchema'
import { setNotification } from '@/state/reducer/notification.reducer'
import { setUserUsernameEmail } from '@/state/reducer/user.reducer'
import { useMutationEditUserUsernamePassword } from '@/services/mutations/user'

interface UsernameEmailFormProps {
	closeModal: () => void
}

const UsernameEmailForm = ({ closeModal }: UsernameEmailFormProps) => {
	const dispatch = useAppDispatch()
	const { user, theme } = useAppSelector((state: RootState) => state.user)

	const [values, setValues] = useState({
		username: user.username,
		email: user.email,
	})

	const [requestError, setRequestError] = useState<string | null>()
	const [errors, setErrors] = useState<{ [key: string]: string }>({})

	const { mutateAsync, isError } = useMutationEditUserUsernamePassword()

	const handleSubmit = async () => {
		const data = {
			username: values.username,
			email: values.email,
			userId: user.id,
		}

		try {
			await editUserUsernameEmailSchema.validate(data, { abortEarly: false })
			setErrors({})
			await mutateAsync(data, {
				onSuccess: async (data) => {
					dispatch(
						setUserUsernameEmail({
							username: data.updatedUser.username,
							email: data.updatedUser.email,
						}),
					)
					dispatch(
						setNotification({
							title: 'Votre profil a bien été modifié',
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
					label="Nom d'utilisateur"
					value={values.username}
					labelFor='username'
					inputFocus
					onChange={(e) =>
						setValues({
							...values,
							username: e.target.value,
						})
					}
					errorMessage={errors['username']}
				/>
				<TextField
					label='Email'
					value={values.email}
					labelFor='email'
					onChange={(e) =>
						setValues({
							...values,
							email: e.target.value,
						})
					}
					errorMessage={errors['email']}
				/>
			</div>
			{isError && (
				<div>
					<p className='text-lg text-error'>
						Il y a eu un problème lors de la modification du profil
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
	)
}

export default UsernameEmailForm
