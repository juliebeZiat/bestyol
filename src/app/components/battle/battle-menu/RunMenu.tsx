'use client'

interface RunMenuProps {
	setMenuState: React.Dispatch<
		React.SetStateAction<'initial' | 'attack' | 'inventory' | 'spell' | 'run'>
	>
	setGameState: React.Dispatch<
		React.SetStateAction<'battle' | 'victory' | 'defeat'>
	>
}

const RunMenu = ({ setMenuState, setGameState }: RunMenuProps) => {
	const optionButtonClassName =
		'w-[50%] h-[50%] cursor-pointer select-none border-2 border-white p-4 text-4xl flex justify-center items-center'
	return (
		<>
			<div className='w-[100%] h-[50%] flex justify-center items-center text-4xl'>
				Fuir ?
			</div>
			<div
				className={optionButtonClassName + ' text-error'}
				onClick={() => setGameState('defeat')}
			>
				Oui !
			</div>
			<div
				className={optionButtonClassName + ' text-green'}
				onClick={() => setMenuState('initial')}
			>
				Non !
			</div>
		</>
	)
}

export default RunMenu
