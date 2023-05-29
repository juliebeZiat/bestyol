import Image from 'next/image'

interface YolBoxProps {
	yolName: string
}

const YolBox = ({ yolName }: YolBoxProps) => {
	return (
		<div className='mt-8 flex flex-col items-center'>
			<Image src='/assets/yol-test-1.png' width={200} height={200} alt='yol' />
			<p>✨ {yolName} ✨</p>
		</div>
	)
}

export default YolBox
