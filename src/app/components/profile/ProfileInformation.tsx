import { useFetchUserYol } from '@/services/queries/yol'
import { useAppSelector } from '@/state/hooks'
import { RootState } from '@/state/store'

interface ProfileInformationProps {
	setModalInfoIsOpen: (isOpen: boolean) => void
	setModalPasswordIsOpen: (isOpen: boolean) => void
	setModalDeleteAccountIsOpen: (isOpen: boolean) => void
}

const ProfileInformation = ({
	setModalInfoIsOpen,
	setModalPasswordIsOpen,
	setModalDeleteAccountIsOpen,
}: ProfileInformationProps) => {
	const { theme, user } = useAppSelector((state: RootState) => state.user)
	const { data: yolData } = useFetchUserYol(user.id)

	return (
		<div
			className={`pixel-corners md:w-5/6 ${theme.secondaryBackgroundColor} ${theme.pixelBorderColor} p-6 md:flex mt-10 md:mt-0`}
		>
			<div className='flex flex-col md:w-[50%] text-white mb-4 md:mb-0'>
				<p className='text-lg md:w-[70%] mb-6'>
					Propriétaire certifié du Yol numéro {yolData?.data.id} -{' '}
					{yolData?.data.name}
				</p>
				<p className='text-xl'>Nom : {user.username}</p>
				<p className='text-xl'>Email : {user.email}</p>
			</div>
			<div className='flex flex-col md:w-[50%] text-white underline text-lg'>
				<p className='cursor-pointer' onClick={() => setModalInfoIsOpen(true)}>
					Modifier mon profil
				</p>
				<p
					className='cursor-pointer'
					onClick={() => setModalPasswordIsOpen(true)}
				>
					Modifier mon mot de passe
				</p>
				<p
					className='cursor-pointer'
					onClick={() => setModalDeleteAccountIsOpen(true)}
				>
					Supprimer mon compte
				</p>
			</div>
		</div>
	)
}

export default ProfileInformation
