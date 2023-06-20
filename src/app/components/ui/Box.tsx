'use client'

import { useIsMobile } from '@/hooks/useWindowSize'
import Image from 'next/image'
import React, { ReactNode, useEffect, useState } from 'react'
import ButtonIcon from './ButtonIcon'
import { useTheme } from '@/contexts/ThemeContext'
import { useAppSelector } from '@/state/hooks'
import { RootState } from '@/state/store'

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

	const theme = useAppSelector((state: RootState) => state.user.theme)

	return (
		<div
			className={`bg-lowOpacity p-6 pixel-corners ${
				theme.pixelBorderColor
			} ${additionalStyle} ${centerItems && 'items-center flex flex-col'}`}
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
