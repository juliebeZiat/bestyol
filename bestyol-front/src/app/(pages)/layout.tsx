import Image from 'next/image'
import '../globals.css'

import React from 'react'

export const metadata = {
	description: 'Best Yol is the best website about yols',
	title: 'Best Yol',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body>
				<div className='w-screen h-screen bg-purple absolute top-0 left-0 -z-10'>
					<Image src="/assets/cloud-1.png" alt="cloud" width={567} height={201} className='absolute top-[5vh] left-[5vw] w-[20vw] h-auto'/>
					<Image src="/assets/cloud-with-moon.png" alt="cloud" width={564} height={195} className='absolute top-[10vh] right-[5vw] w-[30vw] h-auto'/>
					<Image src="/assets/mountain.png" alt="cloud" width={1011} height={335} className='absolute bottom-0 right-0 w-[40vw] h-auto'/>
				</div>
				{children}
			</body>
		</html>
	)
}
