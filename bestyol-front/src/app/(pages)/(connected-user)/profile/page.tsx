'use client'

import Box from '@/app/components/ui/Box'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const ProfilePage = () => {
	const [hydrated, setHydrated] = useState(false)
	useEffect(() => {
		setHydrated(true)
	}, [])
	if (!hydrated) {
		return null
	}

	return (
		<div className='w-full flex flex-col gap-20'>
			<div className='relative flex items-center h-[200px] bg-lowOpacity'>
				<Image
					src='/assets/yol-test-1.png'
					height={200}
					width={150}
					alt='Image de profil'
					className='ml-10'
				/>
				<Image
					src='/assets/mountain.png'
					height={100}
					width={300}
					alt='Fond du profil'
					className='absolute right-0 bottom-0'
				/>
			</div>

			<div className='flex justify-center items-center mx-4 text-white gap-5 sm:gap-28 lg:gap-36'>
				<Box additionalStyle='max-w-[300px] min-h-[400px] border-white border-2'>
					<div className='flex flex-col items-center gap-5'>
						<h2 className='text-center text-xl sm:text-4xl tracking-wider'>
							Informations
						</h2>
						<div className='flex flex-col gap-5 sm:text-xl justify-between h-[250px]'>
							<div className='flex flex-col'>
								<p className=''>nom : Julie</p>
								<p className=''>email : julie@mail.fr</p>
							</div>
							<p className='cursor-pointer'>Modifier mon mot de passe</p>
						</div>
					</div>
				</Box>
				<Box additionalStyle='max-w-[300px] min-h-[400px] border-white border-2'>
					<div className='flex flex-col items-center gap-5'>
						<h2 className='text-center text-xl sm:text-4xl tracking-wider'>
							Statistiques
						</h2>
						<div>
							<ul className='sm:text-xl'>
								<li>• 11 succès complétés</li>
								<li>• 63 tâches quotidiennes achevées</li>
								<li>• 1 évolution de Yol</li>
								<li>• 2354 points d'expériences acquis</li>
								<li>• Membre depuis le 02/01/23</li>
							</ul>
						</div>
					</div>
				</Box>
			</div>
		</div>
	)
}

export default ProfilePage
