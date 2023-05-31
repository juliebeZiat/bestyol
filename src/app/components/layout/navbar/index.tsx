'use client'

import { useState, useEffect, useRef } from 'react'
import ProgressBar from '../../ui/ProgressBar'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/state/hooks'
import { RootState } from '@/state/store'
import Image from 'next/image'
import { logout } from '@/state/reducer/auth.reducer'

interface NavbarProps {
	yolName?: string
	yolLevel?: number
	yolXp?: number
	yolXpToNextLevel?: number
	userName?: string
}

const Navbar = ({
	yolName = 'Mini Yol',
	yolLevel = 1,
	yolXp = 110,
	yolXpToNextLevel = 350,
}: NavbarProps) => {
	const dispatch = useAppDispatch()
	const user = useAppSelector((state: RootState) => state.auth.user)

	const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false)

	const menuItems = [
		{
			name: 'Profil',
			link: '/profile',
		},
		{
			name: 'Déconnexion',
			link: '/',
			action: () => dispatch(logout()),
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
							<div className=''>
								<span className='sm:text-3xl'>Level {yolLevel}</span>
							</div>
							<div className=''>
								<span className='text-sm sm:text-base'>{yolName}</span>
							</div>
						</div>
						<div className='flex flex-col'>
							<ProgressBar progress={yolXp} total={yolXpToNextLevel} />
							<div className='flex items-center text-sm sm:text-lg'>
								<span className=' mr-2'>{yolXp} XP</span>
								<span className=''>/ {yolXpToNextLevel} XP</span>
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
							<ul className='absolute top-[51px] left-[-80px]'>
								{menuItems.map((item, index) => (
									<a className='cursor-pointer' href={item.link} key={index}>
										<li className='w-[150px] border-2 p-1 text-xl border-purple bg-blue'>
											<div onClick={item.action ?? undefined}>{item.name}</div>
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
