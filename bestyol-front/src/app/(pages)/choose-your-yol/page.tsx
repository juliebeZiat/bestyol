'use client'

import Box from '@/app/components/ui/Box'
import YolCarousel from '@/app/components/ui/YolCarousel'

const ChooseYourYol = () => {
	return (
		<div className='w-full h-screen flex items-center justify-center'>
			<Box centerItems width='w-[50%]'>
				<h1>Bienvenue, User !</h1>
				<p>
					Choisis ton Yol ! Ce sera ton compagnon tout au long de ton aventure,
					alors choisis le bien !
				</p>
				<YolCarousel />
			</Box>
		</div>
	)
}

export default ChooseYourYol
