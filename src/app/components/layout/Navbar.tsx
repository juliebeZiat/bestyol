'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useFetchUserYol } from '@/services/queries/yol'
import Modal from '../ui/Modal'
import { themes as allThemes, themes } from '@/utils/themes'
import Button from '../ui/Button'
import { useAppDispatch, useAppSelector } from '@/state/hooks'
import { RootState } from '@/state/store'
import { logout, setTheme } from '@/state/reducer/user.reducer'
import ProgressBar from '../ui/ProgressBar'
import { getYolCurrentLevel } from '@/utils/utils'
import AudioPlayer from './AudioPlayer'

const Navbar = () => {
	const dispatch = useAppDispatch()
	const user = useAppSelector((state: RootState) => state.user.user)
	const theme = useAppSelector((state: RootState) => state.user.theme)

	const { data: yol } = useFetchUserYol(user.id)
	const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false)
	const [isThemeModalOpen, setIsThemeModalOpen] = useState(false)
	const [selectedTheme, setSelectedTheme] = useState(theme.name)

	const handleThemeFormSubmit = () => {
		dispatch(setTheme(themes.find((theme) => theme.name == selectedTheme)!))
		setIsThemeModalOpen(false)
	}

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

	const currentLevel = getYolCurrentLevel(yol.data.xp)

	return (
		<nav className='relative bg-lowOpacity text-[#FFFFFF] w-full h-full flex items-center'>
			<div className='w-full px-4 sm:px-6 lg:px-8'>
				<div className='flex items-center justify-between h-16'>
					<div className='relative flex items-center gap-2 sm:gap-8'>
						<Link href='/game'>
							<div className='flex-shrink-0'>
								<Image
									src={yol.data.species.image}
									width={35}
									height={35}
									alt='yol'
								/>
							</div>
						</Link>
						<div className='flex flex-col'>
							<div>
								<span className='sm:text-3xl'>Level {currentLevel.level}</span>
							</div>
							<div>
								<span className='text-sm sm:text-base'>{yol.data.name}</span>
							</div>
						</div>
						<div className='flex flex-col'>
							<ProgressBar
								progress={yol.data.xp - currentLevel.levelMin}
								total={currentLevel.levelMax - currentLevel.levelMin}
								color={theme.vibrantBackgroundColor}
							/>
							<div className='flex items-center text-sm sm:text-lg'>
								<span className=' mr-2'>{yol.data.xp} XP</span>
								<span>/ {currentLevel.levelMax} XP</span>
							</div>
						</div>
						{/* <img
							className='absolute h-[64px] left-[80%] select-none'
							src='assets/cloud-with-moon.png'
						/> */}
					</div>

					<div className='flex items-center'>
						<div>
							<AudioPlayer isLoop player source='/audio/Hyperspace.wav' />
						</div>
						<div
							ref={menuRef}
							className='ml-3 relative flex gap-3 items-center'
							onClick={() => {
								setMenuIsOpen(!menuIsOpen)
							}}
						>
							<Image
								src={user.pp}
								alt='user profile'
								className={`border-[2px] border-black`}
								width={40}
								height={40}
							/>
							<div className='rotate-90 text-2xl select-none cursor-pointer'>
								&gt;
							</div>
							{menuIsOpen && (
								<ul className='absolute top-[51px] left-[-80px] z-50'>
									<a className='cursor-pointer' href={'/profile'}>
										<li
											className={`w-[150px] border-2 p-1 text-xl ${theme.gradientTo} ${theme.vibrantBackgroundColor}`}
										>
											Profil
										</li>
									</a>

									<a className='cursor-pointer' href={'/'}>
										<li
											className={`w-[150px] border-2 p-1 text-xl ${theme.gradientTo} ${theme.vibrantBackgroundColor}`}
											onClick={() => dispatch(logout())}
										>
											Déconnexion
										</li>
									</a>

									<li
										className={`w-[150px] border-2 p-1 text-xl cursor-pointer ${theme.gradientTo} ${theme.vibrantBackgroundColor}`}
										onClick={() => setIsThemeModalOpen(true)}
									>
										Thèmes de couleur
									</li>
								</ul>
							)}
						</div>
					</div>
				</div>
			</div>
			<Modal
				isOpen={isThemeModalOpen}
				onClose={() => setIsThemeModalOpen(false)}
				title='Modifier le thème de couleur'
			>
				<div className='flex flex-col items-center justify-center gap-10 basis-[33%] sm:min-w-[350px] lg:min-w-[500px] min-h-[300px]'>
					<div className='flex flex-wrap gap-4 justify-center'>
						{allThemes.map((currentTheme, index) => {
							return (
								<div
									key={`${index}${currentTheme.name}`}
									onClick={() => setSelectedTheme(currentTheme.name)}
									className={`h-[100px] w-[100px] bg-gradient-to-bl cursor-pointer ${
										currentTheme.gradientFrom
									} ${currentTheme.gradientTo} ${
										currentTheme.name == selectedTheme
											? 'border-[4px] border-white'
											: ''
									}`}
								></div>
							)
						})}
						{/* random avatar button */}
						{/* <div
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
						</div> */}
					</div>
					<Button
						content='Valider'
						onClick={handleThemeFormSubmit}
						backgroundColor='bg-orange'
						additionalStyle='self-center w-[50%]'
					/>
				</div>
			</Modal>
		</nav>
	)
}

export default Navbar
