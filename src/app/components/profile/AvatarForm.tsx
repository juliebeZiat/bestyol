import { useAppSelector } from '@/state/hooks'
import { RootState } from '@/state/store'
import { availableAvatars } from '@/utils/profileImages'
import Image from 'next/image'
import Button from '../ui/Button'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUserAvatar } from '@/state/reducer/user.reducer'
import { useMutationEditUserAvatar } from '@/services/mutations/user'

interface AvatarFormProps {
	closeModal: () => void
}

const AvatarForm = ({ closeModal }: AvatarFormProps) => {
	const dispatch = useDispatch()
	const { user, theme } = useAppSelector((state: RootState) => state.user)
	const [selectedUserAvatar, setSelectedUserAvatar] = useState<string>(user.pp)

	const { mutateAsync, isError } = useMutationEditUserAvatar()

	const handleSubmit = async () => {
		const data = {
			userId: user.id,
			pp: selectedUserAvatar,
		}

		await mutateAsync(data, {
			onSuccess: async (data) => {
				dispatch(setUserAvatar(data.updatedPp.pp))
				closeModal()
			},
		})
	}

	return (
		<div className='h-[700px] flex flex-col justify-center gap-10'>
			<div className='h-[80%] overflow-y-auto flex flex-wrap items-center gap-3'>
				{availableAvatars.map((avatar, index) => (
					<div>
						<Image
							key={index}
							src={avatar}
							alt='avatar'
							width={100}
							height={100}
							className={`cursor-pointer h-[100px] w-[100px] ${
								selectedUserAvatar === avatar
									? 'border-2 border-white border-darkLowOpacity'
									: ''
							}`}
							onClick={() => setSelectedUserAvatar(avatar)}
						/>
					</div>
				))}

				<div
					className='flex justify-center items-center cursor-pointer h-[100px] w-[100px] border border-darkLowOpacity'
					onClick={() => {
						const randomAvatar =
							availableAvatars[
								Math.floor(Math.random() * availableAvatars.length)
							]
						setSelectedUserAvatar(randomAvatar)
					}}
				>
					<div className='text-4xl font-bold text-white select-none'>?</div>
				</div>
			</div>
			{isError && (
				<div>
					<p className='text-lg text-error'>
						Il y a eu un problème lors de la modification de l'avatar
					</p>
				</div>
			)}
			<Button
				content='Valider'
				backgroundColor={theme.secondaryBackgroundColor}
				textColor='text-white'
				additionalStyle='self-center w-fit'
				onClick={handleSubmit}
			/>
		</div>
	)
}

export default AvatarForm
