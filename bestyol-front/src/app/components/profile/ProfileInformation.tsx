import Image from 'next/image'
import Box from '../ui/Box'
import { useState } from 'react'

interface ProfileInformationProps {
	setModalInfoIsOpen: (isOpen: boolean) => void
	setModalPasswordIsOpen: (isOpen: boolean) => void
	setModalDeleteAccountIsOpen: (isOpen: boolean) => void
}

const ProfileInformation = ({
	setModalInfoIsOpen,
	setModalPasswordIsOpen,
	setModalDeleteAccountIsOpen,
}: ProfileInformationProps) => {
	const [pointerHovering, setPointerHovering] = useState<
		'none' | 'profile' | 'password' | 'delete'
	>('none')
	return (
		<Box additionalStyle='relative min-w-[300px] max-w-[300px] min-h-[400px] border-white border-2'>
			<div className='flex flex-col items-center gap-5'>
				<h2 className='text-center text-4xl tracking-wider'>Informations</h2>
				<div className='flex flex-col gap-5 text-xl justify-between h-[250px]'>
					<div className='flex flex-col'>
						<p className=''>nom : Julie</p>
						<p className=''>email : julie@mail.fr</p>
					</div>
					<section className='flex flex-col gap-3 border-t-2 pt-8'>
						<Image
							src='/assets/pointer.png'
							width={50}
							height={50}
							alt='pointer'
							className='animate-slideLeftToRight absolute left-0 '
							style={{
								bottom:
									pointerHovering === 'profile'
										? '30%'
										: pointerHovering === 'password'
										? '20%'
										: '10%',
								display: pointerHovering === 'none' ? 'none' : 'block',
							}}
						/>
						<p
							className='cursor-pointer'
							onClick={() => setModalInfoIsOpen(true)}
							onMouseEnter={() => setPointerHovering('profile')}
							onMouseLeave={() => setPointerHovering('none')}
						>
							Modifier mon profil
						</p>
						<p
							className='cursor-pointer'
							onClick={() => setModalPasswordIsOpen(true)}
							onMouseEnter={() => setPointerHovering('password')}
							onMouseLeave={() => setPointerHovering('none')}
						>
							Modifier mon mot de passe
						</p>
						<p
							className='cursor-pointer'
							onClick={() => setModalDeleteAccountIsOpen(true)}
							onMouseEnter={() => setPointerHovering('delete')}
							onMouseLeave={() => setPointerHovering('none')}
						>
							Supprimer mon compte
						</p>
					</section>
				</div>
			</div>
		</Box>
	)
}

export default ProfileInformation