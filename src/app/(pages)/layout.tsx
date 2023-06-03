'use client'

import Image from 'next/image'
import '../globals.css'

import React, { useCallback, useMemo, useState } from 'react'
import type { Engine } from 'tsparticles-engine'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'
import { useIsMobile } from '@/hooks/useWindowSize'
import Providers from '@/utils/provider'
import EvolutionProvider from '@/contexts/EvolutionContext'
import ThemeProvider from '@/contexts/ThemeContext'
import BackgroundGradient from '../components/layout/navbar/backgroundGradient'

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
				<ThemeProvider>
					<BackgroundGradient />
					<main className='flex min-h-screen w-full flex-col items-center'>
						<Providers>
							<EvolutionProvider>{children}</EvolutionProvider>
						</Providers>
					</main>
				</ThemeProvider>
			</body>
		</html>
	)
}

export default RootLayout
