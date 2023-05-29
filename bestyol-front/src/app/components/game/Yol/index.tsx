interface YolBoxProps {
	yolName: string
}

const YolBox = ({ yolName }: YolBoxProps) => {
	return (
		<div>
			<p>✨ {yolName} ✨</p>
		</div>
	)
}

export default YolBox
