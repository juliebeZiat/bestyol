"use client";

import Image from 'next/image'
import '../globals.css'

import React, { useCallback, useMemo } from 'react'
import type { Container, Engine } from "tsparticles-engine";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";


export const metadata = {
	description: 'Best Yol is the best website about yols',
	title: 'Best Yol',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {

	const options = useMemo(() => {
	  // using an empty options object will load the default options, which are static particles with no background and 3px radius, opacity 100%, white color
	  // all options can be found here: https://particles.js.org/docs/interfaces/Options_Interfaces_IOptions.IOptions.html
	  return {
		particles: {
			number: {
				value: 50,
				density: {
					enable: true,
					value_area: 800
				}
			},
			color: {
				value: "#ffffff"
			},
			shape: {
				type: "edge",
			},
			opacity: {
				value: 1,
				random: true,
				anim: {
					enable: true,
					speed: 2,
					opacity_min: 0,
					sync: false
				}
			},
			size: {
				value: 3,
				random: true,
				anim: {
					enable: false,
					speed: 4,
					size_min: 0.3,
					sync: false
				}
			},
		},
	};
	}, []);
  
    const particlesInit = useCallback(async (engine: Engine) => {
        console.log(engine);

        // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(engine);
    }, []);

	return (
		<html lang='en'>
			<body>
				<div className='w-screen h-screen bg-purple absolute top-0 left-0 -z-10'>
					<Particles init={particlesInit} options={options} />
					<Image src="/assets/cloud-1.png" alt="cloud" width={567} height={201} className='absolute top-[5vh] left-[5vw] w-[20vw] h-auto' />
					<Image src="/assets/cloud-with-moon.png" alt="cloud" width={564} height={195} className='absolute top-[10vh] right-[5vw] w-[30vw] h-auto' />
					<Image src="/assets/mountain.png" alt="cloud" width={1011} height={335} className='absolute bottom-0 right-0 w-[40vw] h-auto' />
				</div>
				{children}
			</body>
		</html>
	)
}
