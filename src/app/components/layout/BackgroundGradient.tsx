'use client'
import { useCallback, useMemo } from 'react'
import type { Engine } from 'tsparticles-engine'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'
import { useIsMobile } from '@/hooks/useWindowSize'
import { useAppSelector } from '@/state/hooks'
import { RootState } from '@/state/store'

const BackgroundGradient = () => {
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

	const theme = useAppSelector((state: RootState) => state.user.theme)

	return (
		<div
			className={`w-full h-screen bg-gradient-to-bl ${theme.gradientFrom} ${theme.gradientTo} fixed top-0 left-0 -z-10`}
		>
			{!useIsMobile() && <Particles init={particlesInit} options={options} />}
		</div>
	)
}

export default BackgroundGradient
