import { useEvolution } from '@/contexts/EvolutionContext'
import Image from 'next/image'

interface YolBoxProps {
	yolName: string
}

const YolBox = ({ yolName }: YolBoxProps) => {
	const { evolveYol } = useEvolution()

	return (
		<div
			className='mt-8 flex flex-col items-center cursor-pointer'
			onClick={() =>
				evolveYol(
					'/assets/yols/eggs/eclosion-pouasson.gif',
					'/assets/yols/base/pouasson.png',
				)
			}
		>
			<Image src='/assets/yol-test-1.png' width={200} height={200} alt='yol' />
			<p>✨ {yolName} ✨</p>
		</div>
	)
}

export default YolBox
