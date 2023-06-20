'use client'
import Link from 'next/link'
import Button, { ButtonSize } from '@/app/components/ui/Button'
import SuccessItem from './SuccessItem'
import { useIsMobile } from '@/hooks/useWindowSize'
import { useFetchAllUserSuccessQuery } from '@/services/queries/success'
import { useEffect, useState } from 'react'
import { UserSuccess } from '@/type/success.type'
import Loader from '../../ui/Loader'

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

	const { data: success, isLoading } = useFetchAllUserSuccessQuery()
	const [incomingSuccess, setIncomingSuccess] = useState<UserSuccess[]>([])
	useEffect(() => {
		if (success) {
			const unCompleteSuccess = success.filter(
				(success) => success.actual_amount < success.success.amount_needed,
			)
			setIncomingSuccess(unCompleteSuccess.slice(0, 3))
		}
	}, [success])

	if (isLoading) return <Loader />
	return (
		<div className='h-[80%]'>
			<div className='mt-4 h-full'>
				{incomingSuccess &&
					incomingSuccess.map((success) => (
						<SuccessItem
							key={success.id}
							title={success.success.title}
							amount={success.success.amount_needed}
							current_amount={success.actual_amount}
							image={success.success.image}
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
