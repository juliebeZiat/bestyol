import Image from 'next/image'

interface SuccessAssetProps {
	image: string
	size?: number
	amount: number
}

const SuccessAsset = ({ image, size = 50, amount }: SuccessAssetProps) => {
	return (
		<div className='relative'>
			<span className='absolute -bottom-1 right-3 text-white'>{amount}</span>
			<Image src={image} alt='daily task asset' width={size} height={size} />
		</div>
	)
}

export default SuccessAsset
