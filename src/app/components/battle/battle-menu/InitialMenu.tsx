'use client'

interface InitialMenuProps {
	setMenuState: React.Dispatch<
		React.SetStateAction<'initial' | 'attack' | 'inventory' | 'spell' | 'run'>
	>
	optionButtonClassName: string
}

const InitialMenu = ({
	setMenuState,
	optionButtonClassName,
}: InitialMenuProps) => {
	return (
		<>
			<div
				className={optionButtonClassName}
				onClick={() => setMenuState('attack')}
			>
				Attaques
			</div>
			<div
				className={optionButtonClassName}
				onClick={() => setMenuState('inventory')}
			>
				Inventaire
			</div>
			<div
				className={optionButtonClassName}
				onClick={() => setMenuState('spell')}
			>
				Sorts
			</div>
			<div
				className={optionButtonClassName}
				onClick={() => setMenuState('run')}
			>
				Fuir
			</div>
		</>
	)
}

export default InitialMenu
