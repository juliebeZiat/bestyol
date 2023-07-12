import { useState } from 'react'
import TextField from '../ui/TextField'
import Button from '../ui/Button'
import { useAppSelector } from '@/state/hooks'
import { RootState } from '@/state/store'

interface DeleteAccountProps {
	closeModal: () => void
}

const DeleteAccount = ({ closeModal }: DeleteAccountProps) => {
	const { user, theme } = useAppSelector((state: RootState) => state.user)
	const [deleteAccountStateView, setDeleteAccountStateView] = useState<
		'form' | 'confirmation'
	>('form')

	return (
		<div className='flex flex-col gap-5 min-w-[250px] sm:min-w-[350px] lg:min-w-[500px] min-h-[200px]'>
			<div className='flex flex-col gap-5'>
				{deleteAccountStateView === 'form' ? (
					<>
						<TextField label='Mot de passe' inputFocus inputType='password' />
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
								onClick={() => {
									closeModal()
									setDeleteAccountStateView('form')
								}}
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
					</div>
				)}
			</div>
		</div>
	)
}

export default DeleteAccount
