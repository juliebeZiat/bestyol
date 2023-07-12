import { useState } from 'react'
import TextField from '../ui/TextField'
import Button from '../ui/Button'
import { useAppDispatch, useAppSelector } from '@/state/hooks'
import { RootState } from '@/state/store'
import { useMutationDeleteUser } from '@/services/mutations/user'
import { logout, setUser } from '@/state/reducer/user.reducer'

interface DeleteAccountProps {
	closeModal: () => void
}

const DeleteAccount = ({ closeModal }: DeleteAccountProps) => {
	const dispatch = useAppDispatch()
	const { user, theme } = useAppSelector((state: RootState) => state.user)
	const [requestError, setRequestError] = useState<string | null>()
	const [values, setValues] = useState({
		password: '',
	})

	const { mutateAsync, isError } = useMutationDeleteUser()

	const handleDelete = async () => {
		const data = { userId: user.id, password: values.password }
		console.log(data)
		await mutateAsync(data, {
			onSuccess: async () => {
				dispatch(logout())
			},
			onError: async (error: any) => {
				setRequestError(error.response.data.erreur)
			},
		})
	}

	return (
		<div className='flex flex-col gap-5 min-w-[250px] sm:min-w-[350px] lg:min-w-[500px] min-h-[200px]'>
			{/* <div className='flex flex-col gap-5'>
				{deleteAccountStateView === 'form' ? (
					<>
						<TextField
							label='Mot de passe'
							inputFocus
							inputType='password'
							value={values.password}
							onChange={(e) =>
								setValues({
									...values,
									password: e.target.value,
								})
							}
						/>
						<Button
							content='Valider'
							backgroundColor={theme.secondaryBackgroundColor}
							textColor='text-white'
							additionalStyle='w-[50%] self-center'
							onClick={() => setDeleteAccountStateView('confirmation')}
						/>
					</>
				) : (
					<div className='flex flex-col h-[150px] justify-center gap-5 '>
						<div className='text-center text-white sm:text-xl'>
							Êtes-vous sûr de vouloir abandonner votre Yol ? Cette action est
							irréversible.
						</div>
						<div className='flex gap-5 flex-wrap sm:flex-nowrap justify-center'>
							<Button
								content='Oui'
								backgroundColor='bg-error'
								textColor='text-white'
								additionalStyle='w-[50%]'
								onClick={handleDelete}
							/>
							<Button
								content='Non'
								backgroundColor={theme.secondaryBackgroundColor}
								textColor='text-white'
								additionalStyle='w-[50%]'
								onClick={() => {
									closeModal()
									setDeleteAccountStateView('form')
								}}
							/>
						</div>
						{isError && (
							<div>
								<p className='text-lg text-error'>
									{requestError || 'Mot de passe incorrect'}
								</p>
							</div>
						)}
					</div>
				)}
			</div> */}
			<div>
				<h2 className='text-center text-white sm:text-xl'>
					Pour supprimer votre compte, veuillez entrer votre mot de passe
				</h2>
				<h3 className='text-center text-error sm:text-xl'>
					ATTENTION! Cette action est irréversible
				</h3>
				<TextField
					inputFocus
					inputType='password'
					value={values.password}
					onChange={(e) =>
						setValues({
							...values,
							password: e.target.value,
						})
					}
				/>
				<div className='flex flex-col h-[150px] justify-center gap-5 '>
					{isError && (
						<div>
							<p className='text-lg text-error'>
								{requestError || 'Mot de passe incorrect'}
							</p>
						</div>
					)}
					<div className='flex justify-center'>
						<Button
							content='Supprimer définitivement mon compte'
							backgroundColor='bg-error'
							textColor='text-white'
							additionalStyle='w-[60%]'
							onClick={handleDelete}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default DeleteAccount
