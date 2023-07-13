import styled, { keyframes } from 'styled-components'

const loadingAnimation = keyframes`
		100% {background-size:120%}
	`

const LoaderComponent = styled.div`
	width: 120px;
	height: 20px;
	mask: linear-gradient(90deg, #454545 70%, #0000 0) 0/20%;
	background: linear-gradient(#454545 0 0) 0/0% no-repeat #ddd;
	animation: ${loadingAnimation} 2s infinite steps(6);
`

interface LoaderProps {
	fullScreen?: boolean
}

const Loader = ({ fullScreen = true }: LoaderProps) => {
	return (
		<div
			className={`w-full flex items-center justify-center ${
				fullScreen ? 'h-screen ' : 'h-96'
			}`}
		>
			<LoaderComponent />
		</div>
	)
}

export default Loader
