import useWindowSize from '@/hooks/useWindowSize'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Hammer from 'react-hammerjs'
import { useAppDispatch } from '@/state/hooks'
import { themes } from '@/utils/themes'
import { Theme, setTheme } from '@/state/reducer/user.reducer'
import { useFetchAllYolSpecies } from '@/services/queries/yol'
import { SpeciesModifiedData, SpeciesStages } from '@/type/yol.type'
import Loader from './Loader'

const YolCarousel = ({
	getCurrentSpecies,
	applyTheme,
}: {
	getCurrentSpecies?: (spec: SpeciesModifiedData) => void
	applyTheme: boolean
}) => {
	const dispatch = useAppDispatch()
	const [species, setSpecies] = useState<SpeciesModifiedData[]>()

	const { data, isLoading, isFetching } = useFetchAllYolSpecies()
	const speciesToDisplay = data?.data.species.filter(
		(spec) => spec.stage === SpeciesStages.BABY,
	)

	const speciesModifiedData = speciesToDisplay?.map((obj, index) => {
		return {
			...obj,
			pos: index + 1,
			theme: themes[index * 2],
		}
	})

	useEffect(() => {
		setSpecies(speciesModifiedData)
	}, [data])

	useEffect(() => {
		if (!species) return
		if (!getCurrentSpecies) return
		const currentYol = species?.find((spec) => spec.pos == 2)
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
			const newOrder = species?.map((spec) => {
				if (spec.pos < 3) spec.pos += 1
				else if ((spec.pos = 3)) spec.pos = 1
				return spec
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
			const newOrder = species?.map((spec) => {
				if (spec.pos > 1) spec.pos -= 1
				else if ((spec.pos = 1)) spec.pos = 3
				return spec
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
					{species?.map((spec) => {
						return (
							<Image
								src={spec.image}
								alt={spec.name}
								width={150}
								height={150}
								className={`absolute w-[80px] h-auto lg:w-[150px] select-none top-[50%] left-[50%] translate-y-[-50%] transition-all duration-[1s] ease-[ease-in-out] cursor-pointer ${
									spec.pos == 1 && 'translate-x-[-200%] z-0'
								} ${
									spec.pos == 2 &&
									`translate-x-[-50%] translate-y-[-25%] scale-[200%] z-30 cursor-auto ${
										isAnimating && 'animate-hoveringTest duration-300'
									}`
								} ${spec.pos == 3 && 'translate-x-[100%] z-0'}`}
								onClick={() => {
									handleNav(spec.pos, spec.theme)
								}}
								key={spec.name}
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
