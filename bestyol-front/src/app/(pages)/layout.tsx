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
			<body>{children}</body>
		</html>
	)
}
