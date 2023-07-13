import { useIsMobile } from '@/hooks/useWindowSize'
import { useAppSelector } from '@/state/hooks'
import { RootState } from '@/state/store'
import Image from 'next/image'

interface ProfileBannerProps {
	setModalAvatarIsOpen: (isOpen: boolean) => void
}

const ProfileBanner = ({ setModalAvatarIsOpen }: ProfileBannerProps) => {
	const user = useAppSelector((state: RootState) => state.user.user)
	const theme = useAppSelector((state: RootState) => state.user.theme)
	const isMobile = useIsMobile()
	if (!user) return null

	return (
		<div className='relative group w-fit m-auto md:m-0'>
			<Image
				src={user.pp}
				height={isMobile ? 150 : 250}
				width={isMobile ? 150 : 250}
				alt='Image de profil'
				className={`border-4 border-darkLowOpacity ${theme.vibrantBackgroundColor}`}
			/>
			<Image
				src='/assets/icons/clip-edit.svg'
				height={30}
				width={30}
				alt='Icone de modification'
				className={`absolute bottom-0 right-0 cursor-pointer bg-white p-1 border-2 sm:hidden group-hover:block ${theme.borderColor}`}
				onClick={() => setModalAvatarIsOpen(true)}
			/>
		</div>
	)
}

export default ProfileBanner
