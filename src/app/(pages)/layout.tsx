'use client'

import Image from 'next/image'
import '../globals.css'

import React, { useCallback, useMemo } from 'react'
import type { Engine } from 'tsparticles-engine'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'
import { useIsMobile } from '@/hooks/useWindowSize'
import Providers from '@/utils/provider'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	const options = useMemo(() => {
		return {
			particles: {
				number: {
					value: 50,
					density: {
						enable: true,
						value_area: 800,
					},
				},
				color: {
					value: '#ffffff',
				},
				shape: {
					type: 'edge',
				},
				opacity: {
					value: 1,
					random: true,
					anim: {
						enable: true,
						speed: 2,
						opacity_min: 0,
						sync: false,
					},
				},
				size: {
					value: 3,
					random: true,
					anim: {
						enable: false,
						speed: 4,
						size_min: 0.3,
						sync: false,
					},
				},
			},
		}
	}, [])

	const particlesInit = useCallback(async (engine: Engine) => {
		await loadFull(engine)
	}, [])

	return (
		<html lang='en'>
			<head>
				<title>Best'Yol</title>
				<meta
					name='description'
					content='Best Yol is the best website about yols'
				/>
			</head>
			<body>
				<div className='w-full h-screen bg-purple fixed top-0 left-0 -z-10'>
					{!useIsMobile() && (
						<Particles init={particlesInit} options={options} />
					)}
					<Image
						src='/assets/cloud-1.png'
						alt='cloud'
						width={567}
						height={201}
						className='absolute top-[5vh] left-[5vw] w-[20vw] h-auto'
					/>
					<Image
						src='/assets/cloud-with-moon.png'
						alt='cloud'
						width={564}
						height={195}
						className='absolute top-[10vh] right-[5vw] w-[30vw] h-auto'
					/>
					<Image
						src='/assets/mountain.png'
						alt='cloud'
						width={1011}
						height={335}
						className='fixed bottom-0 right-0 w-[40vw] h-auto'
					/>
				</div>
				<main className='flex min-h-screen w-full flex-col items-center'>
					<Providers>{children}</Providers>
				</main>
			</body>
		</html>
	)
}

export default RootLayout
