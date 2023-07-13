'use client'
import { useIsMobile } from '@/hooks/useWindowSize'
import Image from 'next/image'
import { ReactNode, useEffect, useState } from 'react'
import ButtonIcon from './ButtonIcon'
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
	isOpenOnRender?: boolean
}

const Box = ({
	width,
	children,
	centerItems = false,
	additionalStyle,
	handleOpen,
	title,
	isTogglable = false,
	additionalButton,
	isOpenOnRender = false,
}: BoxProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const isMobile = useIsMobile()

	useEffect(() => {
		if (!isMobile) setIsOpen(true)
		if (isOpenOnRender) setIsOpen(true)
	}, [isMobile])

	const toggleOpen = () => {
		if (isMobile) {
			setIsOpen(!isOpen)
			if (handleOpen) {
				handleOpen()
			}
		}
	}

	const theme = useAppSelector((state: RootState) => state.user.theme)

	return (
		<div
			className={`bg-lowOpacity p-6 pixel-corners over ${
				theme.pixelBorderColor
			} ${additionalStyle} ${centerItems && 'items-center flex flex-col'}`}
			style={{ width: width }}
		>
			<div
				className='flex justify-between justify-items-center'
				onClick={toggleOpen}
			>
				<div>
					<h1 className='text-white lg:text-2xl uppercase'>{title}</h1>
				</div>
				<div>{additionalButton}</div>
			</div>
			{isTogglable ? isOpen && children : children}
			{isTogglable && isMobile && (
				<div className='flex'>
					{additionalButton}
					<ButtonIcon onClick={toggleOpen} isOpen={isOpen}>
						<Image
							src='/assets/icons/arrow.svg'
							width={10}
							height={10}
							alt='arrow-icon'
							className={isOpen ? 'rotate-180' : ''}
						/>
					</ButtonIcon>
				</div>
			)}
		</div>
	)
}

export default Box
