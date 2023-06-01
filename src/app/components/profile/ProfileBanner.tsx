import { useAuth } from '@/contexts/AuthContext'
import useWindowSize from '@/hooks/useWindowSize'
import Image from 'next/image'

interface ProfileBannerProps {
	setModalAvatarIsOpen: (isOpen: boolean) => void
	setModalBannerIsOpen: (isOpen: boolean) => void
	avatar: string
	banner: string
}

const ProfileBanner = ({
	setModalAvatarIsOpen,
	setModalBannerIsOpen,
	avatar,
	banner,
}: ProfileBannerProps) => {
	const { user } = useAuth()
	if (!user) return null
	const windowSize = useWindowSize()
	const username = user.name
	return (
		<div className='relative flex items-center h-[200px] bg-lowOpacity'>
			<div className='flex items-center'>
				<div className='relative group'>
					<Image
						src={avatar}
						height={200}
						width={150}
						alt='Image de profil'
						className='ml-10 border-4 border-darkLowOpacity bg-purple'
					/>
					<Image
						src={banner}
						height={30}
						width={30}
						alt='Icone de modification'
						className='absolute bottom-0 right-0 cursor-pointer bg-white p-1 border-2 border-purple sm:hidden group-hover:block'
						onClick={() => setModalAvatarIsOpen(true)}
					/>
				</div>
				{windowSize.windowWidth > 500 && (
					<div className='absolute top-2 left-40 border-collapse'>
						<div className='text-2xl bg-white p-2 border-2 border-purple'>
							Profil de{' '}
							{username.length > 15 ? username.slice(0, 15) + '...' : username}
						</div>
						<div className='ml-2 w-6 overflow-hidden z-50 absolute bottom-[-73%]'>
							<div className='h-10 bg-white rotate-45 transform origin-top-right border-2 border-purple' />
						</div>
					</div>
				)}
			</div>
			{windowSize.windowWidth > 500 && (
				<>
					<Image
						src={banner}
						height={100}
						width={300}
						alt='Fond du profil'
						className='absolute right-0 bottom-0'
					/>
					<Image
						src='/assets/icons/clip-edit.svg'
						height={30}
						width={30}
						alt='Icone de modification'
						className='absolute top-1 right-1 cursor-pointer bg-white p-1 border-1 border-purple'
						onClick={() => setModalBannerIsOpen(true)}
					/>
				</>
			)}
		</div>
	)
}

export default ProfileBanner
