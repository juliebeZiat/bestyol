import styled, { keyframes } from 'styled-components'

const loadingAnimation = keyframes`
		100% {background-size:120%}
	`

const LoaderComponent = styled.div`
	width: 120px;
	height: 20px;
	mask: linear-gradient(90deg, #000 70%, #0000 0) 0/20%;
	background: linear-gradient(#000 0 0) 0/0% no-repeat #ddd;
	animation: ${loadingAnimation} 2s infinite steps(6);
`

const Loader = () => {
	return <LoaderComponent />
}

export default Loader
