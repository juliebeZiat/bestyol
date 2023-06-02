'use client'

import { useEffect, useRef, useState } from 'react'
import InitialMenu from './battle-menu/InitialMenu'
import AttackMenu from './battle-menu/AttackMenu'
import ObjectMenu from './battle-menu/ObjectMenu'
import SpellMenu from './battle-menu/SpellMenu'
import RunMenu from './battle-menu/RunMenu'
import allYolsAttack from './yolsAttacks.json'
import allYolSpells from './yolsSpells.json'
import {
	Attack,
	BattleHistoryLine,
	BattleHistoryType,
	BattleYol,
	Enemy,
	InventoryObject,
	Spell,
} from './types'

interface BattleInterfaceProps {
	enemy: Enemy
	yolHealth: number
	setYolHealth: (value: number) => void
	yolMana: number
	setYolMana: (value: number) => void
	enemyHealth: number
	setEnemyHealth: (value: number) => void
	playerTurn: boolean
	setPlayerTurn: (value: boolean) => void
	setGameState: React.Dispatch<
		React.SetStateAction<'battle' | 'victory' | 'defeat'>
	>
	gameState: 'battle' | 'victory' | 'defeat'
	setYolTakingDamages: (value: boolean) => void
	setEnemyTakingDamages: (value: boolean) => void
	yolInfo: BattleYol
}

const BattleInterface = ({
	enemy,
	yolHealth,
	setYolHealth,
	yolMana,
	setYolMana,
	enemyHealth,
	setEnemyHealth,
	playerTurn,
	setPlayerTurn,
	setGameState,
	gameState,
	setYolTakingDamages,
	setEnemyTakingDamages,
	yolInfo,
}: BattleInterfaceProps) => {
	const [menuState, setMenuState] = useState<
		'initial' | 'attack' | 'inventory' | 'spell' | 'run'
	>('initial')

	const [yolAttacks, setYolAttacks] = useState<Attack[]>([])
	const [yolSpells, setYolSpells] = useState<Spell[]>([])
	const [inventory, setInventory] = useState<InventoryObject[]>([])
	const battleHistoryRef = useRef<HTMLUListElement>(null)
	const [battleHistory, setBattleHistory] = useState<BattleHistoryLine[]>([
		{
			type: BattleHistoryType.Narration,
			text: 'Un adversaire apparaît, le combat commence !',
		},
	])

	// Enemy attacks
	useEffect(() => {
		if (!playerTurn) {
			setTimeout(() => {
				// Select random attack
				const enemyAttack =
					enemy.attacks[Math.floor(Math.random() * enemy.attacks.length)]
				setBattleHistory([
					...battleHistory,
					{
						type: BattleHistoryType.EnemyAttack,
						text: `${enemy.name} utilise "${enemyAttack.name}" et inflige ${enemyAttack.damages} points de dégâts !`,
					},
				])
				if (yolHealth - enemyAttack.damages <= 0) {
					setYolHealth(0)
				} else {
					setYolHealth(yolHealth - enemyAttack.damages)
				}
				setPlayerTurn(true)
			}, 3500)
		}
	}, [playerTurn])

	// Scroll to bottom of battle history at every action
	useEffect(() => {
		if (battleHistoryRef.current) {
			const { current: ref } = battleHistoryRef
			const lastElement = ref.lastElementChild
			if (lastElement) {
				lastElement.scrollIntoView({
					behavior: 'smooth',
					block: 'end',
				})
			}
		}
	}, [battleHistory])

	// Set Yol's attacks and spells according to his evolution and species
	useEffect(() => {
		const spells = allYolSpells.filter(
			(spell: Spell) =>
				spell.evolution <= yolInfo.evolution &&
				spell.species === yolInfo.species,
		)

		const attacks = allYolsAttack.filter(
			(attack: Attack) =>
				attack.evolution <= yolInfo.evolution &&
				attack.species === yolInfo.species,
		)

		setYolAttacks(attacks)
		setYolSpells(spells)
	}, [])

	// Handle battle history text color
	const handleBattleHistoryLineText = (line: BattleHistoryLine) => {
		if (line.type === BattleHistoryType.Narration) {
			return 'text-white'
		} else if (line.type === BattleHistoryType.PlayerAttack) {
			return 'text-salmon'
		} else if (line.type === BattleHistoryType.PlayerHeal) {
			return 'text-green'
		} else if (line.type === BattleHistoryType.EnemyAttack) {
			return 'text-error'
		} else if (line.type === BattleHistoryType.PlayerMana) {
			return 'text-blue'
		} else if (line.type === BattleHistoryType.Bonus) {
			return 'text-orange'
		} else if (line.type === BattleHistoryType.Chaos) {
			return 'text-purple'
		}
	}

	const optionButtonClassName =
		'w-[50%] h-[50%] cursor-pointer select-none border-2 border-white p-4 text-xl sm:text-4xl'
	return (
		<div className='w-full h-[50%] bg-lowOpacity flex'>
			<section className='w-[50%] border-2 border-white p-5 overflow-y-scroll text-white sm:text-xl'>
				<ul ref={battleHistoryRef}>
					{battleHistory.map((line, index) => (
						<li key={index} className={handleBattleHistoryLineText(line)}>
							{line.text}
						</li>
					))}
				</ul>
			</section>
			{gameState === 'battle' &&
				(playerTurn ? (
					<section className='w-[50%] flex flex-wrap border-2 border-white'>
						{menuState === 'initial' ? (
							<InitialMenu
								setMenuState={setMenuState}
								optionButtonClassName={optionButtonClassName}
							/>
						) : menuState === 'attack' ? (
							<AttackMenu
								setMenuState={setMenuState}
								optionButtonClassName={optionButtonClassName}
								enemyHealth={enemyHealth}
								setEnemyHealth={setEnemyHealth}
								yolAttacks={yolAttacks}
								battleHistory={battleHistory}
								setBattleHistory={setBattleHistory}
								setPlayerTurn={setPlayerTurn}
								setEnemyTakingDamages={setEnemyTakingDamages}
								setYolAttacks={setYolAttacks}
							/>
						) : menuState === 'inventory' ? (
							<ObjectMenu
								battleHistory={battleHistory}
								setBattleHistory={setBattleHistory}
								setMenuState={setMenuState}
								optionButtonClassName={optionButtonClassName}
								yolHealth={yolHealth}
								yolMana={yolMana}
								setYolMana={setYolMana}
								setYolHealth={setYolHealth}
								enemyHealth={enemyHealth}
								setEnemyHealth={setEnemyHealth}
								setPlayerTurn={setPlayerTurn}
								inventory={inventory}
								setInventory={setInventory}
								enemy={enemy}
								setEnemyTakingDamages={setEnemyTakingDamages}
								setYolTakingDamages={setYolTakingDamages}
							/>
						) : menuState === 'spell' ? (
							<SpellMenu
								setMenuState={setMenuState}
								optionButtonClassName={optionButtonClassName}
								enemyHealth={enemyHealth}
								setEnemyHealth={setEnemyHealth}
								yolHealth={yolHealth}
								setYolHealth={setYolHealth}
								spells={yolSpells}
								yolMana={yolMana}
								setYolMana={setYolMana}
								battleHistory={battleHistory}
								setBattleHistory={setBattleHistory}
								setPlayerTurn={setPlayerTurn}
								setEnemyTakingDamages={setEnemyTakingDamages}
							/>
						) : (
							<RunMenu
								setMenuState={setMenuState}
								setGameState={setGameState}
							/>
						)}
					</section>
				) : (
					<div className='w-[50%] flex justify-center items-center text-4xl text-white  border-2 border-white'>
						Au tour de l'ennemi !
					</div>
				))}
		</div>
	)
}

export default BattleInterface
