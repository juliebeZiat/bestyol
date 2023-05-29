import useWindowSize from '@/hooks/useWindowSize'
import { useState } from 'react'
import Image from 'next/image'

interface YolCarouselProps {
	images?: string[]
}

const YolCarousel = ({
	images = [
		'/assets/yol-test-1.png',
		'/assets/yol-test-2.png',
		'/assets/yol-test-3.png',
	],
}: YolCarouselProps) => {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [scrollDirection, setScrollDirection] = useState<'left' | 'right'>(
		'right',
	)
	const [isAnimating, setIsAnimating] = useState(false)
	const [animatedImageIndex, setAnimatedImageIndex] = useState(currentIndex)
	const windowSizes = useWindowSize()

	const handlePrev = () => {
		if (!isAnimating) {
			setScrollDirection('left')
			setAnimatedImageIndex(currentIndex)
			setIsAnimating(true)

			setTimeout(() => {
				setIsAnimating(false)
				setCurrentIndex((prevIndex) =>
					prevIndex === images.length - 1 ? 0 : prevIndex + 1,
				)
			}, 950)
		}
	}

	const handleNext = () => {
		if (!isAnimating) {
			setScrollDirection('right')
			setAnimatedImageIndex(currentIndex)
			setIsAnimating(true)

			setTimeout(() => {
				setIsAnimating(false)
				setCurrentIndex((prevIndex) =>
					prevIndex === 0 ? images.length - 1 : prevIndex - 1,
				)
			}, 950)
		}
	}

	return (
		<div className='flex items-center'>
			{windowSizes.windowWidth > 500 && (
				<button
					className='text-xl lg:text-7xl mr-2 duration-300 transform hover:scale-125 text-white'
					onClick={handlePrev}
				>
					{'<'}
				</button>
			)}
			<section className='relative flex items-center justify-center h-[160px] sm:w-[400px] sm:h-[200px] lg:h-[300px] lg:w-[800px]'>
				{isAnimating ? (
					<>
						<Image
							src={
								images[(animatedImageIndex + images.length - 1) % images.length]
							}
							key={`left-${scrollDirection}-${currentIndex}`}
							width={windowSizes.windowWidth > 500 ? 150 : 80}
							height={windowSizes.windowWidth > 500 ? 150 : 80}
							alt='yol'
							className={`w-[80px] lg:w-[150px] select-none  ${
								scrollDirection === 'right'
									? 'animate-slideRightUpScale'
									: 'animate-disappear relative z-[-5]'
							}`}
						/>
						<Image
							src={images[animatedImageIndex]}
							key={`current-${scrollDirection}-${currentIndex}`}
							width={windowSizes.windowWidth > 500 ? 300 : 160}
							height={windowSizes.windowWidth > 500 ? 300 : 160}
							alt='yol'
							className={`w-[160px] lg:w-[300px] select-none  ${
								scrollDirection === 'right'
									? 'animate-centerToRightDownScale'
									: 'animate-centerToLeftDownScale'
							}`}
						/>
						<Image
							src={images[(animatedImageIndex + 1) % images.length]}
							key={`right-${scrollDirection}-${currentIndex}`}
							width={windowSizes.windowWidth > 500 ? 150 : 80}
							height={windowSizes.windowWidth > 500 ? 150 : 80}
							alt='yol'
							className={`w-[80px] lg:w-[150px] select-none  ${
								scrollDirection === 'right'
									? 'animate-disappear relative z-[-5]'
									: 'animate-slideLeftUpScale'
							}`}
						/>
					</>
				) : (
					<>
						<Image
							src={images[(currentIndex + images.length - 1) % images.length]}
							key={`left-${scrollDirection}-${currentIndex}`}
							width={windowSizes.windowWidth > 500 ? 150 : 80}
							height={windowSizes.windowWidth > 500 ? 150 : 80}
							onClick={handlePrev}
							alt='yol'
							className={`w-[80px] lg:w-[150px] select-none ${
								scrollDirection === 'right' ? 'animate-appear' : ''
							} `}
						/>
						<Image
							src={images[currentIndex]}
							key={`current-${scrollDirection}-${currentIndex}`}
							width={windowSizes.windowWidth > 500 ? 300 : 160}
							height={windowSizes.windowWidth > 500 ? 300 : 160}
							alt='yol'
							className={`w-[160px] lg:w-[300px] select-none animate-hovering duration-300`}
						/>
						<Image
							src={images[(currentIndex + 1) % images.length]}
							key={`right-${scrollDirection}-${currentIndex}`}
							width={windowSizes.windowWidth > 500 ? 150 : 80}
							height={windowSizes.windowWidth > 500 ? 150 : 80}
							onClick={handleNext}
							alt='yol'
							className={`w-[80px] lg:w-[150px] select-none ${
								scrollDirection === 'left' ? 'animate-appear' : ''
							} `}
						/>
					</>
				)}
			</section>
			{windowSizes.windowWidth > 500 && (
				<button
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
