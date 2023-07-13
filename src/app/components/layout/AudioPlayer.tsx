import { useAppDispatch, useAppSelector } from '@/state/hooks'
import { toggleMute } from '@/state/reducer/sound.reducer'
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
	const audioPlayer = useRef<HTMLAudioElement>(null)
	const muted = useAppSelector((state: RootState) => state.sound.muted)
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (!audioPlayer.current) {
			return
		}
		if (muted) {
			audioPlayer.current.volume = 0
		} else {
			audioPlayer.current.volume = 0.015
			if (audioPlayer.current.paused) audioPlayer.current.play()
		}
	}, [muted])

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
							onClick={() => dispatch(toggleMute({ muted: !muted }))}
						>
							<Image
								src={
									!muted ? '/assets/icons/play.svg' : '/assets/icons/pause.svg'
								}
								width={30}
								height={30}
								alt='edit-icon'
								className='invert'
								// onClick={() => setAudioPlaying(true)}
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
