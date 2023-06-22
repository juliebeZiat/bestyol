import { useAppSelector } from '@/state/hooks'
import { RootState } from '@/state/store'
import { useEffect, useRef, useState } from 'react'

const AudioPlayer = () => {
	const [audioPlaying, setAudioPlaying] = useState(true)
	const audioPlayer = useRef<HTMLAudioElement>(null)

	useEffect(() => {
		console.log('audio use effet')
		if (!audioPlayer.current) {
			console.log('no audioplayer.current')
			return
		}

		if (!audioPlaying) {
			console.log('pause audio')
			audioPlayer.current?.pause()
		} else {
			console.log('play audio')
			audioPlayer.current?.play()
		}
	}, [audioPlayer.current, audioPlaying])

	useEffect(() => {
		if (!audioPlayer.current) return
		audioPlayer.current.play()
	}, [])

	const setVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (audioPlayer.current)
			audioPlayer.current.volume = parseInt(e.target.value) / 100
		console.log(parseInt(e.target.value) / 100)
	}

	const theme = useAppSelector((state: RootState) => state.user.theme)

	return (
		<>
			<audio ref={audioPlayer} loop src='/audio/Hyperspace.wav' />
			<button
				onClick={() => setAudioPlaying(!audioPlaying)}
				className={`!absolute top-[8vh] left-[2rem] rounded-full pixel-corners w-[2vw] aspect-square ${theme.pixelBorderColor} ${theme.secondaryBackgroundColor} text-white`}
			>
				PAUSE
			</button>
			<input
				type='range'
				className={`!absolute top-[15vh] left-[2rem] -rotate-90`}
				onChange={(e) => setVolume(e)}
			/>
		</>
	)
}

export default AudioPlayer
