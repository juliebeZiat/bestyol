import { useAppSelector } from '@/state/hooks'
import { RootState } from '@/state/store'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

interface AudioPlayerProps {
	source: string
	isLoop?: boolean
	player?: boolean
	delay?: number
	autoPlay?: boolean
}

const AudioPlayer = ({
	source,
	isLoop = false,
	player,
	delay = 0,
	autoPlay = false,
}: AudioPlayerProps) => {
	const [audioPlaying, setAudioPlaying] = useState(false)
	const audioPlayer = useRef<HTMLAudioElement>(null)

	useEffect(() => {
		if (!audioPlayer.current) {
			return
		}
		if (!audioPlaying) {
			audioPlayer.current?.pause()
		} else {
			audioPlayer.current?.play()
		}
	}, [audioPlaying])

	useEffect(() => {
		if (autoPlay) {
			if (!audioPlayer.current) return
			setTimeout(() => {
				if (!audioPlayer.current) return
				audioPlayer.current.play()
			}, delay)
		}
	}, [])

	const setVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (audioPlayer.current)
			audioPlayer.current.volume = parseInt(e.target.value) / 100
	}

	return (
		<>
			<audio ref={audioPlayer} loop={isLoop} src={source} />
			{player && (
				<>
					<div className='flex gap-2'>
						<div
							className='cursor-pointer flex'
							onClick={() => setAudioPlaying(!audioPlaying)}
						>
							<Image
								src={
									audioPlaying
										? '/assets/icons/play.svg'
										: '/assets/icons/pause.svg'
								}
								width={30}
								height={30}
								alt='edit-icon'
								className='invert'
								onClick={() => setAudioPlaying(true)}
							/>
						</div>
						{/* <input type='range' className='' onChange={(e) => setVolume(e)} /> */}
					</div>
				</>
			)}
		</>
	)
}

export default AudioPlayer
