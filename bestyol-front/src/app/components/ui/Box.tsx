'use client'

import { useIsMobile } from '@/hooks/useWindowSize'
import Image from 'next/image'
import React, { ReactNode, useEffect, useState } from 'react'
import ButtonIcon from './ButtonIcon'

interface BoxProps {
	width?: string
	children: ReactNode
	centerItems?: boolean
	additionalStyle?: string
	handleOpen?: () => void
	title?: string
}

const Box = ({
	width,
	children,
	centerItems = false,
	additionalStyle,
	handleOpen,
	title,
}: BoxProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const isMobile = useIsMobile()

	useEffect(() => {
		if (!isMobile) setIsOpen(true)
	}, [isMobile])

	const toggleOpen = () => {
		setIsOpen(!isOpen)
		if (handleOpen) {
			handleOpen()
		}
	}

	return (
		<div
			className={`bg-lowOpacity p-8 ${additionalStyle} ${
				centerItems && 'items-center flex flex-col'
			}`}
			style={{ width: width }}
		>
			<div className='flex justify-between justify-items-center'>
				<div>
					<h1 className='text-white lg:text-2xl uppercase'>{title}</h1>
				</div>
				<div className='flex items-center'>
					<ButtonIcon onClick={toggleOpen}>
						<Image
							src='/assets/icons/arrow.svg'
							width={10}
							height={10}
							alt='arrow-icon'
							className={isOpen ? 'rotate-180' : ''}
						/>
					</ButtonIcon>
				</div>
			</div>
			{children}
		</div>
	)
}

export default Box
