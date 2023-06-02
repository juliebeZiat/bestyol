import styled, { keyframes } from 'styled-components'

const loadingAnimation = keyframes`
		100% {background-size:120%}
	`

const LoaderComponent = styled.div`
	width: 120px;
	height: 20px;
	mask: linear-gradient(90deg, #fcb482 70%, #0000 0) 0/20%;
	background: linear-gradient(#fcb482 0 0) 0/0% no-repeat #ddd;
	animation: ${loadingAnimation} 2s infinite steps(6);
`

const Loader = () => {
	return (
		<div className='h-screen w-full flex items-center justify-center'>
			<LoaderComponent />
		</div>
	)
}

export default Loader
