'use client'
import Box from '@/app/components/ui/Box'
import Button, { ButtonSize } from '@/app/components/ui/Button'
import TextField from '@/app/components/ui/TextField'
import YolCarousel from '@/app/components/ui/YolCarousel'
import { useIsMobile } from '@/hooks/useWindowSize'
import { useMutationCreateYol } from '@/services/mutations/yol'
import { useFetchUserYol } from '@/services/queries/yol'
import { useAppSelector } from '@/state/hooks'
import { RootState } from '@/state/store'
import { SpeciesModifiedData } from '@/type/species.type'
import { createYolSchema } from '@/utils/formValidationSchema'
import { redirect } from 'next/navigation'
import { useState } from 'react'

const ChooseYourYol = () => {
	const { isLogged, user } = useAppSelector((state: RootState) => state.user)
	const { data: yolData } = useFetchUserYol(user.id)

	const [values, setValues] = useState({
		name: '',
		userId: user.id,
		speciesId: 0,
	})

	const [requestError, setRequestError] = useState<string | null>()
	const [errors, setErrors] = useState<{ [key: string]: string }>({})

	const { mutateAsync, isError, isLoading } = useMutationCreateYol()

	const [currentSpecies, setCurrentSpecies] = useState<SpeciesModifiedData>()

	const getCurrentYol = (spec: SpeciesModifiedData) => {
		setCurrentSpecies(spec)
	}

	const handleSubmit = async () => {
		if (!currentSpecies) return
		const data = {
			name: values.name,
			userId: values.userId,
			speciesId: currentSpecies.id - 1,
		}

		try {
			await createYolSchema.validate(data, { abortEarly: false })
			setErrors({})
			await mutateAsync(data, {
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

	const BoxContent = () => {
		return (
			<>
				<h1 className='text-2xl lg:text-4xl'>Bienvenue, {user.username} !</h1>
				<p className='lg:text-2xl text-center w-5/6'>
					Choisis ton Yol ! Ce sera ton compagnon tout au long de ton aventure,
					alors choisis le bien !
				</p>
				<div className='text-center flex flex-col justify-center w-full'>
					<YolCarousel getCurrentSpecies={getCurrentYol} applyTheme />
					<h2 className='text-4xl'>{currentSpecies?.name ?? ''}</h2>
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
			</>
		)
	}

	if (isLogged) {
		if (!yolData) {
			return (
				<div className='h-[100svh] flex items-center justify-center text-white text-center'>
					<form className='flex items-center justify-center'>
						{useIsMobile() ? (
							<div className='w-screen flex flex-col justify-center items-center gap-y-8'>
								{BoxContent()}
							</div>
						) : (
							<Box
								centerItems
								additionalStyle='h-[80vh] lg:aspect-square justify-between w-[80vw] 2xl:w-[60vw]'
							>
								{BoxContent()}
							</Box>
						)}
					</form>
				</div>
			)
		} else return redirect('/game')
	}
}

export default ChooseYourYol
