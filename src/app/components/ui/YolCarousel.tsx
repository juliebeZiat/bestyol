import useWindowSize from '@/hooks/useWindowSize'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Hammer from 'react-hammerjs'
import { useAppDispatch } from '@/state/hooks'
import { setTheme } from '@/state/reducer/user.reducer'
import { useFetchAllYolSpecies } from '@/services/queries/yol'
import Loader from './Loader'
import { getThemeBySpecies } from '@/utils/utils'
import { SpeciesModifiedData, SpeciesStages } from '@/type/species.type'
import { Theme } from '@/type/type'

const YolCarousel = ({
	getCurrentSpecies,
	applyTheme,
}: {
	getCurrentSpecies?: (specie: SpeciesModifiedData) => void
	applyTheme: boolean
}) => {
	const dispatch = useAppDispatch()
	const [species, setSpecies] = useState<SpeciesModifiedData[]>()

	const { data, isLoading, isFetching } = useFetchAllYolSpecies()
	const speciesToDisplay = data?.data.species.filter(
		(specie) => specie.stage === SpeciesStages.BABY,
	)

	const speciesModifiedData = speciesToDisplay?.map((specie, index) => {
		return {
			...specie,
			pos: index + 1,
			theme: getThemeBySpecies(specie.name, 'light'),
		}
	})

	useEffect(() => {
		setSpecies(speciesModifiedData)
	}, [data])

	useEffect(() => {
		if (!species) return
		if (!getCurrentSpecies) return
		const currentYol = species?.find((specie) => specie.pos == 2)
		if (!currentYol) return
		getCurrentSpecies(currentYol)
		applyTheme && dispatch(setTheme(currentYol.theme))
	}, [species])

	const [isAnimating, setIsAnimating] = useState(true)
	const [isMoving, setIsMoving] = useState(false)

	const handleNext = () => {
		if (isMoving) return
		setIsMoving(true)
		setIsAnimating(false)
		setTimeout(() => {
			const newOrder = species?.map((specie) => {
				if (specie.pos < 3) specie.pos += 1
				else if ((specie.pos = 3)) specie.pos = 1
				return specie
			})
			setSpecies(newOrder)
		}, 100)
		setTimeout(() => {
			setIsMoving(false)
			setIsAnimating(true)
		}, 1100)
	}
	const handlePrev = () => {
		if (isMoving) return
		setIsMoving(true)
		setIsAnimating(false)
		setTimeout(() => {
			const newOrder = species?.map((specie) => {
				if (specie.pos > 1) specie.pos -= 1
				else if ((specie.pos = 1)) specie.pos = 3
				return specie
			})
			setSpecies(newOrder)
		}, 100)
		setTimeout(() => {
			setIsMoving(false)
			setIsAnimating(true)
		}, 1100)
	}
	const handleNav = (pos: number, theme: Theme) => {
		applyTheme && dispatch(setTheme(theme))
		if (pos == 1) handleNext()
		else if (pos == 3) handlePrev()
		return
	}

	const windowSizes = useWindowSize()

	if (isLoading || isFetching) return <Loader />

	return (
		<div className='flex items-center justify-center'>
			{windowSizes.windowWidth > 500 && (
				<button
					type='button'
					className='text-xl lg:text-7xl mr-2 duration-300 transform hover:scale-125 text-white'
					onClick={handlePrev}
				>
					{'<'}
				</button>
			)}
			<Hammer onSwipeLeft={handlePrev} onSwipeRight={handleNext}>
				<section className='relative flex items-center justify-center h-[160px] w-full sm:w-[400px] sm:h-[200px] lg:h-[300px] lg:w-[800px]'>
					{species?.map((specie) => {
						return (
							<Image
								src={specie.image}
								alt={specie.name}
								width={150}
								height={150}
								className={`absolute w-[80px] lg:w-[150px] h-auto select-none bottom-[50%] translate-y-[20px] left-[50%] transition-all duration-[1s] ease-[ease-in-out] cursor-pointer ${
									specie.pos == 1 && 'translate-x-[-200%] z-0'
								} ${
									specie.pos == 2 &&
									`translate-x-[-50%] translate-y-[0px] scale-[150%] z-30 cursor-auto ${
										isAnimating && 'animate-hoveringTest duration-300'
									}`
								} ${specie.pos == 3 && 'translate-x-[100%] z-0'}`}
								onClick={() => {
									handleNav(specie.pos, specie.theme)
								}}
								key={specie.name}
							/>
						)
					})}
				</section>
			</Hammer>
			{windowSizes.windowWidth > 500 && (
				<button
					type='button'
					className='text-xl lg:text-7xl duration-300 transform hover:scale-125 text-white'
					onClick={handleNext}
				>
					{'>'}
				</button>
			)}
		</div>
	)
}

export default YolCarousel
