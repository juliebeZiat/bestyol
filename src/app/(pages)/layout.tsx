'use client'

import '../globals.css'

import React, { useEffect, useRef, useState } from 'react'
import Providers from '@/utils/provider'
import EvolutionProvider from '@/contexts/EvolutionContext'
import ThemeProvider from '@/contexts/ThemeContext'
import BackgroundGradient from '../components/layout/backgroundGradient'
import ReactAudioPlayer from 'react-audio-player'
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
				<ThemeProvider>
					<BackgroundGradient />
					<main className='flex min-h-screen w-full flex-col items-center !relative'>
						<Providers>
							<EvolutionProvider>{children}</EvolutionProvider>
						</Providers>
						<AudioPlayer />
					</main>
				</ThemeProvider>
			</body>
		</html>
	)
}

export default RootLayout
