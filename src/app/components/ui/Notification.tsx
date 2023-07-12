'use client'

import { useAppSelector } from '@/state/hooks'
import { unsetNotification } from '@/state/reducer/notification.reducer'
import { RootState } from '@/state/store'
import Link from 'next/link'
import { useDispatch } from 'react-redux'

const Notification = () => {
	const dispatch = useDispatch()
	const theme = useAppSelector((state: RootState) => state.user.theme)
	const { isNotified, link, title } = useAppSelector(
		(state: RootState) => state.notification,
	)

	setTimeout(() => {
		dispatch(unsetNotification())
	}, 8000)

	if (!isNotified) return null

	return (
		<Link href={link}>
			<div
				className={`fixed bottom-5 right-5 px-10 py-5 pixel-corners-bar ${theme.vibrantBackgroundColor} text-white animate-hovering `}
			>
				<h1>{title}</h1>
				<div className='bg-white absolute h-2 left-0 bottom-0 animate-progressBar' />
			</div>
		</Link>
	)
}

export default Notification
