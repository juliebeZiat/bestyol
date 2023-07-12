'use client'

import ProfileBanner from '@/app/components/profile/ProfileBanner'
import ProfileInformation from '@/app/components/profile/ProfileInformation'
import ProfileStatistics from '@/app/components/profile/ProfileStatistics'
import Modal from '@/app/components/ui/Modal'
import { useIsMobile } from '@/hooks/useWindowSize'
import { useState } from 'react'
import { useAppSelector } from '@/state/hooks'
import { RootState } from '@/state/store'
import CredentialsForm from '@/app/components/profile/UsernameEmailForm'
import PasswordForm from '@/app/components/profile/PasswordForm'
import AvatarForm from '@/app/components/profile/AvatarForm'
import DeleteAccount from '@/app/components/profile/DeleteAccount'

const ProfilePage = () => {
	const { user } = useAppSelector((state: RootState) => state.user)

	const [modalAvatarIsOpen, setModalAvatarIsOpen] = useState(false)
	const [modalInfoIsOpen, setModalInfoIsOpen] = useState(false)
	const [modalPasswordIsOpen, setModalPasswordIsOpen] = useState(false)
	const [modalDeleteAccountIsOpen, setModalDeleteAccountIsOpen] =
		useState(false)

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
				}}
				title='Supprimer mon compte'
			>
				<DeleteAccount
					closeModal={() => {
						setModalDeleteAccountIsOpen(false)
					}}
				/>
			</Modal>
		</div>
	)
}

export default ProfilePage
