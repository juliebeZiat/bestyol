'use client'

import ProfileBanner from '@/app/components/profile/ProfileBanner'
import ProfileInformation from '@/app/components/profile/ProfileInformation'
import ProfileStatistics from '@/app/components/profile/ProfileStatistics'
import Modal from '@/app/components/ui/Modal'
import { useIsMobile } from '@/hooks/useWindowSize'
import { useState } from 'react'
import { useAppSelector } from '@/state/hooks'
import { RootState } from '@/state/store'
import UsernameEmailForm from '@/app/components/profile/UsernameEmailForm'
import PasswordForm from '@/app/components/profile/PasswordForm'
import DeleteAccount from '@/app/components/profile/DeleteAccount'
import PictureForm from '@/app/components/profile/PictureForm'
import Image from 'next/image'

const ProfilePage = () => {
	const { user, theme } = useAppSelector((state: RootState) => state.user)

	const [modalAvatarIsOpen, setModalAvatarIsOpen] = useState(false)
	const [modalInfoIsOpen, setModalInfoIsOpen] = useState(false)
	const [modalPasswordIsOpen, setModalPasswordIsOpen] = useState(false)
	const [modalDeleteAccountIsOpen, setModalDeleteAccountIsOpen] =
		useState(false)

	const isMobile = useIsMobile()

	if (!user) return null

	return (
		<div className='w-full flex flex-col gap-20 h-full'>
			<div
				className={`pixel-corners w-2/3 ${theme.secondaryBackgroundColor} ${theme.pixelBorderColor} mt-10 m-auto relative`}
			>
				<div className={`${theme.vibrantBackgroundColor} h-15 w-full p-4`}>
					<h1 className='text-white text-3xl'>PERMIS DE PROPRIÉTAIRE DE YOL</h1>
				</div>
				<div className='p-8'>
					<div className='flex gap-x-6'>
						<ProfileBanner setModalAvatarIsOpen={setModalAvatarIsOpen} />
						<ProfileInformation
							setModalInfoIsOpen={setModalInfoIsOpen}
							setModalPasswordIsOpen={setModalPasswordIsOpen}
							setModalDeleteAccountIsOpen={setModalDeleteAccountIsOpen}
						/>
					</div>
					<ProfileStatistics />
				</div>
				<Image
					src='/assets/icons/tampon.png'
					height={400}
					width={400}
					alt='tampon'
					className='absolute -bottom-8 right-2'
				/>
			</div>

			<Modal
				isOpen={modalAvatarIsOpen}
				onClose={() => setModalAvatarIsOpen(false)}
				title='Modifier mon avatar'
			>
				<PictureForm closeModal={() => setModalAvatarIsOpen(false)} />
			</Modal>

			<Modal
				isOpen={modalInfoIsOpen}
				onClose={() => setModalInfoIsOpen(false)}
				title='Modifier mon profil'
			>
				<UsernameEmailForm closeModal={() => setModalInfoIsOpen(false)} />
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
