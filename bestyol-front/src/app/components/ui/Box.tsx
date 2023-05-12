'use client'

import React, { ReactNode } from 'react'

interface BoxProps {
	width?: string
	children: ReactNode
	centerItems?: boolean
}

const Box = ({ width = 'w-1/2', children, centerItems = false }: BoxProps) => {
	return (
		<div
			className={`bg-lowOpacity p-8 flex flex-col justify-between ${width} ${
				centerItems && 'items-center'
			}`}
		>
			{children}
		</div>
	)
}

export default Box
