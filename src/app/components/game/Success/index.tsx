'use client'
import Link from 'next/link'
import Button, { ButtonSize } from '@/app/components/ui/Button'
import SuccessItem from './SuccessItem'
import { useIsMobile } from '@/hooks/useWindowSize'
import { useFetchAllUserSuccessQuery } from '@/services/queries/success'
import { useEffect, useState } from 'react'
import { UserSuccess } from '@/type/success.type'
import Loader from '../../ui/Loader'
import { useAppSelector } from '@/state/hooks'
import { RootState } from '@/state/store'

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

	const userId = useAppSelector((state: RootState) => state.user.user.id)
	const { data: success, isLoading } = useFetchAllUserSuccessQuery(userId)
	const [incomingSuccess, setIncomingSuccess] = useState<UserSuccess[]>([])
	useEffect(() => {
		if (success) {
			const unCompleteSuccess = success.data.userSuccess.filter(
				(success) => success.actualAmount < success.success.amountNeeded,
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
							amount={success.success.amountNeeded}
							current_amount={success.actualAmount}
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
