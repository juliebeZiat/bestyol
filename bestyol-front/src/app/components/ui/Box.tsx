'use client'

import React, { ReactNode } from 'react'

interface BoxProps {
	width?: string
	children: ReactNode
	centerItems?: boolean
	additionalStyle?: string
}

const Box = ({
	width = 'w-1/2',
	children,
	centerItems = false,
	additionalStyle,
}: BoxProps) => {
	return (
		<div
			className={`bg-lowOpacity p-8 flex flex-col justify-between w-[80%] lg:${width} ${additionalStyle} ${
				centerItems && 'items-center'
			}`}
		>
			{children}
		</div>
	)
}

export default Box
