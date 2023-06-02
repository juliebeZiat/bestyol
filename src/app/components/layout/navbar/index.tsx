'use client'

import { useState, useEffect, useRef } from 'react'
import ProgressBar from '../../ui/ProgressBar'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/contexts/AuthContext'
import { useFetchUserYol } from '@/services/queries/yol'

const Navbar = () => {
	const { user } = useAuth()
	if (!user) return null

	const { data: yol } = useFetchUserYol(user.id)
	const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false)

	const menuItems = [
		{
			name: 'Profil',
			link: '/profile',
		},
		{
			name: 'Déconnexion',
			link: '/',
		},
	]

	const menuRef = useRef<HTMLDivElement>(null)

	const handleMouseDown = (event: MouseEvent) => {
		if (menuIsOpen && !menuRef.current?.contains(event.target as Node)) {
			setMenuIsOpen(false)
		}
	}

	useEffect(() => {
		document.addEventListener('mousedown', handleMouseDown)
		return () => {
			document.removeEventListener('mousedown', handleMouseDown)
		}
	}, [menuIsOpen])

	if (!yol) return null

	return (
		<nav className='relative bg-blue text-[#FFFFFF] w-full'>
			<div className='w-full px-4 sm:px-6 lg:px-8'>
				<div className='flex items-center justify-between h-16'>
					<div className='relative flex items-center gap-2 sm:gap-8'>
						<Link href='/game'>
							<div className='flex-shrink-0'>
								<div className='bg-purple w-[40px] h-[40px]' />
							</div>
						</Link>
						<div className='flex flex-col'>
							<div>
								<span className='sm:text-3xl'>
									Level {yol.data.level.level}
								</span>
							</div>
							<div>
								<span className='text-sm sm:text-base'>{yol.data.name}</span>
							</div>
						</div>
						<div className='flex flex-col'>
							<ProgressBar
								progress={yol.data.xp - yol.data.level.levelMin}
								total={yol.data.level.levelMax}
							/>
							<div className='flex items-center text-sm sm:text-lg'>
								<span className=' mr-2'>{yol.data.xp} XP</span>
								<span className=''>/ {yol.data.level.levelMax} XP</span>
							</div>
						</div>
						<img
							className='absolute h-[64px] left-[80%] select-none'
							src='assets/cloud-with-moon.png'
						/>
					</div>

					<div
						ref={menuRef}
						className='ml-3 relative flex gap-3 items-center'
						onClick={() => {
							setMenuIsOpen(!menuIsOpen)
						}}
					>
						<Image
							src={`/assets/avatars/${user.pp}`}
							alt='user profile'
							width={40}
							height={40}
						/>
						<div className='rotate-90 text-2xl select-none cursor-pointer'>
							&gt;
						</div>
						{menuIsOpen && (
							<ul className='absolute top-[51px] left-[-80px] z-50'>
								{menuItems.map((item, index) => (
									<a className='cursor-pointer' href={item.link} key={index}>
										<li className='w-[150px] border-2 p-1 text-xl border-purple bg-blue'>
											{item.name}
										</li>
									</a>
								))}
							</ul>
						)}
					</div>
				</div>
			</div>
		</nav>
	)
}

export default Navbar
