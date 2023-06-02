import useWindowSize from '@/hooks/useWindowSize'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { yol } from '../interfaces'
import Hammer from 'react-hammerjs'

const NewYolCarousel = ({
	getCurrentYol,
}: {
	getCurrentYol?: (yol: yol) => void
}) => {
	const [yols, setYols] = useState<yol[]>([
		{
			name: 'Bé-boo',
			pic: '/assets/yols/base/feuille.png',
			pos: 1,
		},
		{
			name: 'Yolkshire',
			pic: '/assets/yols/base/pouasson.png',
			pos: 2,
		},
		{
			name: 'Evopink',
			pic: '/assets/yols/base/lunettes.png',
			pos: 3,
		},
	])
	useEffect(() => {
		if (!getCurrentYol) return
		const currentYol = yols.find((yol) => yol.pos == 2)
		getCurrentYol(currentYol!)
	}, [yols])

	const [isAnimating, setIsAnimating] = useState(true)
	const [isMoving, setIsMoving] = useState(false)

	const handleNext = () => {
		if (isMoving) return
		setIsMoving(true)
		setIsAnimating(false)
		setTimeout(() => {
			const newOrder = [...yols].map((yol) => {
				if (yol.pos < 3) yol.pos += 1
				else if ((yol.pos = 3)) yol.pos = 1
				return yol
			})
			console.log('newOrder: ', newOrder)
			setYols(newOrder)
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
			const newOrder = [...yols].map((yol) => {
				if (yol.pos > 1) yol.pos -= 1
				else if ((yol.pos = 1)) yol.pos = 3
				return yol
			})
			console.log('newOrder: ', newOrder)
			setYols(newOrder)
		}, 100)
		setTimeout(() => {
			setIsMoving(false)
			setIsAnimating(true)
		}, 1100)
	}
	const handleNav = (pos: number) => {
		if (pos == 1) handleNext()
		else if (pos == 3) handlePrev()
		return
	}

	const windowSizes = useWindowSize()

	return (
		<div className='flex items-center'>
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
					{yols.map((yol) => {
						return (
							<Image
								src={yol.pic}
								alt={yol.name}
								width={150}
								height={150}
								className={`absolute w-[80px] h-auto lg:w-[150px] select-none top-[50%] left-[50%] translate-y-[-50%] transition-all duration-[1s] ease-[ease-in-out] cursor-pointer ${
									yol.pos == 1 && 'translate-x-[-200%] z-0'
								} ${
									yol.pos == 2 &&
									`translate-x-[-50%] translate-y-[-25%] scale-[200%] z-30 cursor-auto ${
										isAnimating && 'animate-hoveringTest duration-300'
									}`
								} ${yol.pos == 3 && 'translate-x-[100%] z-0'}`}
								onClick={() => {
									handleNav(yol.pos)
								}}
								key={yol.name}
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

export default NewYolCarousel
