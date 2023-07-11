'use client'

import { useAppSelector } from '@/state/hooks'
import { RootState } from '@/state/store'

const Notification = () => {
	const theme = useAppSelector((state: RootState) => state.user.theme)
	return (
		<div
			className={`fixed bottom-5 right-5 px-10 py-5 pixel-corners-bar ${theme.pixelBorderColor} bg-white`}
		>
			<h1>Un nouveau succès a été validé !!</h1>
		</div>
	)
}

export default Notification
