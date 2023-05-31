'use client'

import Link from 'next/link'
import Box from '@/app/components/ui/Box'
import Button, { ButtonSize } from '@/app/components/ui/Button'
import SuccessItem from './SuccessItem'
import { useIsMobile } from '@/hooks/useWindowSize'

const SuccessBox = () => {
	const isMobile = useIsMobile()

	const allSuccess = [
		{
			id: 1,
			title: "Maîtrise de l'hydratation",
			current_amount: 10,
			amount: 25,
		},
		{
			id: 2,
			title: 'Chef·fe cuistot',
			current_amount: 4,
			amount: 10,
		},
		{
			id: 3,
			title: 'Bodybuilder',
			current_amount: 42,
			amount: 50,
		},
	]
	return (
		<div>
			<div className='mt-4'>
				{allSuccess.map((success) => (
					<SuccessItem
						key={success.id}
						title={success.title}
						amount={success.amount}
						current_amount={success.current_amount}
					/>
				))}
			</div>
			{isMobile && (
				<div className='flex flex-col items-center'>
					<Link href='/achievements'>
						<Button
							content='Voir tous mes succès'
							uppercase
							size={ButtonSize.Small}
						/>
					</Link>
				</div>
			)}
		</div>
	)
}

export default SuccessBox
