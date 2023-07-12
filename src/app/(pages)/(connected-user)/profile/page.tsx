'use client'

import ProfileBanner from '@/app/components/profile/ProfileBanner'
import ProfileInformation from '@/app/components/profile/ProfileInformation'
import ProfileStatistics from '@/app/components/profile/ProfileStatistics'
import Button from '@/app/components/ui/Button'
import Modal from '@/app/components/ui/Modal'
import TextField from '@/app/components/ui/TextField'
import { useIsMobile } from '@/hooks/useWindowSize'
import Image from 'next/image'
import { useState } from 'react'
import { availableAvatars } from '../../../../utils/profileImages'
import { useAppSelector } from '@/state/hooks'
import { RootState } from '@/state/store'
import CredentialsForm from '@/app/components/profile/CredentialsForm'
import PasswordForm from '@/app/components/profile/PasswordForm'
import AvatarForm from '@/app/components/profile/AvatarForm'

const ProfilePage = () => {
	const { user, theme } = useAppSelector((state: RootState) => state.user)

	const [modalAvatarIsOpen, setModalAvatarIsOpen] = useState(false)
	const [modalInfoIsOpen, setModalInfoIsOpen] = useState(false)
	const [modalPasswordIsOpen, setModalPasswordIsOpen] = useState(false)
	const [modalDeleteAccountIsOpen, setModalDeleteAccountIsOpen] =
		useState(false)
	const [deleteAccountStateView, setDeleteAccountStateView] = useState<
		'form' | 'confirmation'
	>('form')

	const isMobile = useIsMobile()

	if (!user) return null

	return (
		<div className='w-full flex flex-col gap-20 h-full'>
			<ProfileBanner
				avatar={user.pp}
				setModalAvatarIsOpen={setModalAvatarIsOpen}
			/>
			<div
				className={
					'flex justify-center items-center mx-4 text-white gap-5 sm:gap-28 lg:gap-36 ' +
					(isMobile ? 'flex-col' : '')
				}
			>
				<ProfileInformation
					setModalInfoIsOpen={setModalInfoIsOpen}
					setModalPasswordIsOpen={setModalPasswordIsOpen}
					setModalDeleteAccountIsOpen={setModalDeleteAccountIsOpen}
				/>
				<ProfileStatistics />
			</div>

			<Modal
				isOpen={modalAvatarIsOpen}
				onClose={() => setModalAvatarIsOpen(false)}
				title='Modifier mon avatar'
			>
				<AvatarForm closeModal={() => setModalAvatarIsOpen(false)} />
			</Modal>

			<Modal
				isOpen={modalInfoIsOpen}
				onClose={() => setModalInfoIsOpen(false)}
				title='Modifier mon profil'
			>
				<CredentialsForm closeModal={() => setModalInfoIsOpen(false)} />
			</Modal>

			<Modal
				isOpen={modalPasswordIsOpen}
				onClose={() => setModalPasswordIsOpen(false)}
				title='Modifier mon mot de passe'
			>
				<PasswordForm closeModal={() => setModalPasswordIsOpen(false)} />
			</Modal>

			<Modal
				isOpen={modalDeleteAccountIsOpen}
				onClose={() => {
					setModalDeleteAccountIsOpen(false)
					setDeleteAccountStateView('form')
				}}
				title='Supprimer mon compte'
			>
				<div className='flex flex-col gap-5 min-w-[250px] sm:min-w-[350px] lg:min-w-[500px] min-h-[200px]'>
					<div className='flex flex-col gap-5'>
						{deleteAccountStateView === 'form' ? (
							<>
								<TextField label='Mot de passe' />
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
									Êtes-vous sûr de vouloir abandonner votre Yol ? Cette action
									est irréversible.
								</div>
								<div className='flex gap-5 flex-wrap sm:flex-nowrap justify-center'>
									<Button
										content='Oui'
										backgroundColor='bg-error'
										textColor='text-white'
										additionalStyle='w-[50%]'
										onClick={() => {
											setModalDeleteAccountIsOpen(false)
											setDeleteAccountStateView('form')
										}}
									/>
									<Button
										content='Non'
										backgroundColor={theme.secondaryBackgroundColor}
										textColor='text-white'
										additionalStyle='w-[50%]'
										onClick={() => {
											setModalDeleteAccountIsOpen(false)
											setDeleteAccountStateView('form')
										}}
									/>
								</div>
							</div>
						)}
					</div>
				</div>
			</Modal>
		</div>
	)
}

export default ProfilePage
