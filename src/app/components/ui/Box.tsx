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
	isTogglable?: boolean
	additionalButton?: ReactNode
}

const Box = ({
	width,
	children,
	centerItems = false,
	additionalStyle,
	handleOpen,
	title,
	isTogglable: isToggle = false,
	additionalButton,
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
			className={`bg-lowOpacity p-8 rounded-xl border-[4px] shadow-white/25 shadow-lg border-blue ${additionalStyle} ${
				centerItems && 'items-center flex flex-col'
			}`}
			style={{ width: width }}
		>
			<div className='flex justify-between justify-items-center'>
				<div>
					<h1 className='text-white lg:text-2xl uppercase'>{title}</h1>
				</div>
				{isToggle && isMobile ? (
					<div className='flex'>
						{additionalButton}
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
				) : (
					<div>{additionalButton}</div>
				)}
			</div>
			{isToggle ? isOpen && children : children}
		</div>
	)
}

export default Box
