'use client'

import Image from 'next/image'

import React, { useCallback, useMemo, useState } from 'react'
import type { Engine } from 'tsparticles-engine'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'
import { useIsMobile } from '@/hooks/useWindowSize'
import { useTheme } from '@/contexts/ThemeContext'

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

	const { theme } = useTheme()

	return (
		<div
			className={`w-full h-screen bg-gradient-to-bl ${theme.gradientFrom} ${theme.gradientTo} fixed top-0 left-0 -z-10`}
		>
			{!useIsMobile() && <Particles init={particlesInit} options={options} />}
			{/* <Image
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
            /> */}
		</div>
	)
}

export default BackgroundGradient
