'use client'

import '../globals.css'

import React, { useEffect, useRef, useState } from 'react'
import Providers from '@/utils/provider'
import EvolutionProvider from '@/contexts/EvolutionContext'
import ThemeProvider from '@/contexts/ThemeContext'
import BackgroundGradient from '../components/layout/backgroundGradient'
import ReactAudioPlayer from 'react-audio-player'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	const [audioPlaying, setAudioPlaying] = useState(true)
	const audioPlayer = useRef<HTMLAudioElement>(null)
	const toggleAudio = () => {
		if (audioPlaying) {
			audioPlayer.current?.pause()
			setAudioPlaying(false)
		} else {
			audioPlayer.current?.play()
			setAudioPlaying(true)
		}
	}
	useEffect(() => {
		if (!audioPlaying) {
			audioPlayer.current?.pause()
		} else {
			audioPlayer.current?.play()
		}
	}, [audioPlaying])

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
						<audio ref={audioPlayer} loop src='/audio/Hyperspace.wav' />
						<button onClick={() => setAudioPlaying(!audioPlaying)}>
							PAUSE
						</button>
					</main>
				</ThemeProvider>
			</body>
		</html>
	)
}

export default RootLayout
