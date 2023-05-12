'use client'

import { useEffect, useState } from 'react'

export default function Home() {
	const [hydrated, setHydrated] = useState(false)
	useEffect(() => {
		setHydrated(true)
	}, [])
	if (!hydrated) {
		return null
	}

	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24'>
			<h1 className='text-5xl'>BEST YOL</h1>
		</main>
	)
}
