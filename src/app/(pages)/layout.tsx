'use client'

import '../globals.css'

import React from 'react'
import Providers from '@/utils/provider'
import BackgroundGradient from '../components/layout/BackgroundGradient'
import AudioPlayer from '../components/ui/AudioPlayer'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
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
				<Providers>
					<BackgroundGradient />
					<main className='flex min-h-screen w-full flex-col items-center !relative'>
						{children}
					</main>
					<AudioPlayer />
				</Providers>
			</body>
		</html>
	)
}

export default RootLayout
