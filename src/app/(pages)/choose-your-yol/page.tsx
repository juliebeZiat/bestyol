'use client'
import { yol } from '@/app/components/interfaces'
import Box from '@/app/components/ui/Box'
import Button, { ButtonSize } from '@/app/components/ui/Button'
import TextField from '@/app/components/ui/TextField'
import YolCarousel from '@/app/components/ui/YolCarousel'
import { useMutationCreateYol } from '@/services/mutations/yol'
import { useAppSelector } from '@/state/hooks'
import { RootState } from '@/state/store'
import { createYolSchema } from '@/utils/formValidationSchema'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const ChooseYourYol = () => {
	const router = useRouter()
	const user = useAppSelector((state: RootState) => state.user.user)

	const [values, setValues] = useState({
		name: '',
		userId: user.id,
		speciesId: 0,
	})

	const [requestError, setRequestError] = useState<string | null>()
	const [errors, setErrors] = useState<{ [key: string]: string }>({})

	const { mutateAsync, isError, isLoading } = useMutationCreateYol()

	const [currentYol, setCurrentYol] = useState<yol>()

	const getCurrentYol = (yol: yol) => {
		setCurrentYol(yol)
	}

	const handleSubmit = async () => {
		const data = {
			name: values.name,
			userId: values.userId,
			speciesId: values.speciesId,
		}

		console.log(currentYol)

		try {
			await createYolSchema.validate(data, { abortEarly: false })
			setErrors({})
			await mutateAsync(data, {
				onSuccess: () => {
					// router.push('/game')
				},
				onError: async (error: any) => {
					setRequestError(error.response.data.erreur)
				},
			})
		} catch (error: any) {
			const validationErrors: { [key: string]: string } = {}
			error.inner.forEach((fieldError: any) => {
				validationErrors[fieldError.path] = fieldError.message
			})
			setErrors(validationErrors)
		}
	}

	return (
		<div className='h-[100svh] flex items-center justify-center text-white text-center'>
			<form className='flex items-center justify-center'>
				<Box
					centerItems
					additionalStyle='h-[80vh] lg:aspect-square justify-between w-[80vw] 2xl:w-[60vw]'
				>
					<h1 className='text-2xl lg:text-4xl'>Bienvenue, {user.username} !</h1>
					<p className='lg:text-2xl text-center w-5/6'>
						Choisis ton Yol ! Ce sera ton compagnon tout au long de ton
						aventure, alors choisis le bien !
					</p>
					<div className='text-center flex flex-col justify-center w-full'>
						<YolCarousel getCurrentYol={getCurrentYol} applyTheme />
						<h2 className='text-4xl'>{currentYol?.name ?? ''}</h2>
					</div>

					<div className='w-[40%]'>
						<TextField
							inputFocus
							value={values.name}
							onChange={(e) => setValues({ ...values, name: e.target.value })}
							inputType='text'
							placeholder='Quel est son petit nom ?'
							errorMessage={errors['name']}
						/>
					</div>

					{isError && (
						<div>
							<p className='text-lg text-error'>
								Il y a eu un problème de la création du Yol
								{requestError && `: ${requestError}`}
							</p>
						</div>
					)}

					<Button
						content="C'est parti !"
						size={ButtonSize.Medium}
						onClick={handleSubmit}
					/>
				</Box>
			</form>
		</div>
	)
}

export default ChooseYourYol
