'use client'

import React, { ReactNode } from 'react'

interface BoxProps {
	width?: string
	children: ReactNode
}

const Box = ({ width = '1/2', children }: BoxProps) => {
	return <div className={`bg-lowOpacity p-8 w-${width}`}>{children}</div>
}

export default Box
