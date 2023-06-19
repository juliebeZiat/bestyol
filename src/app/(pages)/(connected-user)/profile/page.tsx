'use client'

import ProfileBanner from '@/app/components/profile/ProfileBanner'
import ProfileInformation from '@/app/components/profile/ProfileInformation'
import ProfileStatistics from '@/app/components/profile/ProfileStatistics'
import Button from '@/app/components/ui/Button'
import Modal from '@/app/components/ui/Modal'
import TextField from '@/app/components/ui/TextField'
import { useIsMobile } from '@/hooks/useWindowSize'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { availableAvatars, availableBanners } from './profileImages'
import { useAppSelector } from '@/state/hooks'
import { RootState } from '@/state/store'

const ProfilePage = () => {
	const user = useAppSelector((state: RootState) => state.auth.user)

	const [userAvatar, setUserAvatar] = useState<string>(
		'/assets/avatars/Icon1.png',
	)
	const [userBanner, setUserBanner] = useState<string>('/assets/mountain.png')
	const [modalAvatarIsOpen, setModalAvatarIsOpen] = useState(false)
	const [modalBannerIsOpen, setModalBannerIsOpen] = useState(false)
	const [modalInfoIsOpen, setModalInfoIsOpen] = useState(false)
	const [modalPasswordIsOpen, setModalPasswordIsOpen] = useState(false)
	const [modalDeleteAccountIsOpen, setModalDeleteAccountIsOpen] =
		useState(false)
	const [deleteAccountStateView, setDeleteAccountStateView] = useState<
		'form' | 'confirmation'
	>('form')

	const [hydrated, setHydrated] = useState(false)
	const isMobile = useIsMobile()
	useEffect(() => {
		setHydrated(true)
	}, [])
	if (!hydrated) {
		return null
	}

	if (!user) return null

	return (
		<div className='w-full flex flex-col gap-20'>
			<ProfileBanner
				avatar={`/assets/avatars/${user.pp}`}
				banner={`/assets/${user.banner}`}
				setModalAvatarIsOpen={setModalAvatarIsOpen}
				setModalBannerIsOpen={setModalBannerIsOpen}
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
			{/* Modal pour modifier l'avatar */}
			<Modal
				isOpen={modalAvatarIsOpen}
				onClose={() => setModalAvatarIsOpen(false)}
				title='Modifier mon avatar'
			>
				<div className='flex flex-col items-center justify-center gap-10 basis-[33%] sm:min-w-[350px] lg:min-w-[500px] min-h-[300px]'>
					<div className='flex flex-wrap gap-4 justify-center'>
						{availableAvatars.map((avatar, index) => (
							<Image
								key={index}
								src={avatar}
								alt='avatar'
								width={100}
								height={100}
								className={`cursor-pointer h-[100px] w-[100px] ${
									userAvatar === avatar
										? 'border-2 border-white border-darkLowOpacity'
										: ''
								}`}
								onClick={() => setUserAvatar(avatar)}
							/>
						))}
						{/* random avatar button */}
						<div
							className='flex justify-center items-center cursor-pointer h-[100px] w-[100px] border border-darkLowOpacity'
							onClick={() => {
								const randomAvatar =
									availableAvatars[
										Math.floor(Math.random() * availableAvatars.length)
									]
								setUserAvatar(randomAvatar)
							}}
						>
							<div className='text-4xl font-bold text-white select-none'>?</div>
						</div>
					</div>
					<Button
						content='Valider'
						onClick={() => setModalAvatarIsOpen(false)}
						backgroundColor='bg-orange'
						additionalStyle='self-center w-[50%]'
					/>
				</div>
			</Modal>
			{/* Modal pour modifier la banner */}
			<Modal
				isOpen={modalBannerIsOpen}
				onClose={() => setModalBannerIsOpen(false)}
				title='Modifier ma bannière'
			>
				<div className='flex flex-col items-center justify-center gap-10 sm:min-w-[350px] lg:min-w-[500px] min-h-[300px]'>
					<div className='flex flex-wrap gap-4'>
						{availableBanners.map((banner, index) => (
							<Image
								key={index}
								src={banner}
								alt='banner'
								width={200}
								height={100}
								className={`cursor-pointer aspect-video object-contain ${
									userBanner === banner ? 'border-2 border-white' : ''
								}`}
								onClick={() => setUserBanner(banner)}
							/>
						))}
						{/* random banner button */}
						<div
							className='flex justify-center items-center cursor-pointer h-[100px] w-[100px] border border-darkLowOpacity'
							onClick={() => {
								const randomBanner =
									availableBanners[
										Math.floor(Math.random() * availableBanners.length)
									]
								setUserBanner(randomBanner)
							}}
						>
							<div className='text-4xl font-bold text-white select-none'>?</div>
						</div>
					</div>
					<Button
						content='Valider'
						onClick={() => setModalBannerIsOpen(false)}
						backgroundColor='bg-orange'
						additionalStyle='self-center w-[50%]'
					/>
				</div>
			</Modal>
			{/* Modal pour modifier les informations du compte */}
			<Modal
				isOpen={modalInfoIsOpen}
				onClose={() => setModalInfoIsOpen(false)}
				title='Modifier mon profil'
			>
				<div className='flex flex-col gap-5 min-w-[250px] sm:min-w-[350px] lg:min-w-[500px] min-h-[300px]'>
					<div className='flex flex-col gap-5'>
						<TextField label='Nom' />
						<TextField label='Email' />
					</div>
					<Button
						content='Valider'
						backgroundColor='bg-orange'
						additionalStyle='w-[50%] self-center'
					/>
				</div>
			</Modal>
			{/* Modal pour modifier le mot de passe */}
			<Modal
				isOpen={modalPasswordIsOpen}
				onClose={() => setModalPasswordIsOpen(false)}
				title='Modifier mon mot de passe'
			>
				<div className='flex flex-col gap-5 min-w-[250px] sm:min-w-[350px] lg:min-w-[500px] min-h-[300px]'>
					<div className='flex flex-col gap-5'>
						<TextField label='Mot de passe actuel' />
						<TextField label='Nouveau mot de passe' />
						<TextField label='Confirmer le nouveau mot de passe' />
						<Button
							content='Valider'
							backgroundColor='bg-orange'
							additionalStyle='w-[50%] self-center'
						/>
					</div>
				</div>
			</Modal>
			{/* Modal pour supprimer le compte */}
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
									backgroundColor='bg-orange'
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
										backgroundColor='bg-orange'
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
