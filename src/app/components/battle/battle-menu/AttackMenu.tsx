'use client'

import { Attack, BattleHistoryLine, BattleHistoryType } from '../types'
import { killOrDealDamage } from '../utils'

interface AttackMenuProps {
	setMenuState: React.Dispatch<
		React.SetStateAction<'initial' | 'attack' | 'inventory' | 'spell' | 'run'>
	>
	optionButtonClassName: string
	enemyHealth: number
	setEnemyHealth: (value: number) => void
	yolAttacks: Attack[]
	setPlayerTurn: (value: boolean) => void
	battleHistory: BattleHistoryLine[]
	setBattleHistory: (value: BattleHistoryLine[]) => void
	setEnemyTakingDamages: (value: boolean) => void
	setYolAttacks: (value: Attack[]) => void
}

const AttackMenu = ({
	setMenuState,
	optionButtonClassName,
	enemyHealth,
	setEnemyHealth,
	yolAttacks,
	setPlayerTurn,
	battleHistory,
	setBattleHistory,
	setEnemyTakingDamages,
	setYolAttacks,
}: AttackMenuProps) => {
	const removeUseAttack = (index: number) => {
		const newAttacks = yolAttacks.map((attack, i) => {
			if (i === index) {
				return {
					...attack,
					uses: attack.uses - 1,
				}
			}
			return attack
		})
		setYolAttacks(newAttacks)
	}

	const handleAttack = (attack: Attack, index: number) => {
		if (attack.uses === 0) {
			setBattleHistory([
				...battleHistory,
				{
					text: `Yol ne peut plus utiliser ${attack.name} !`,
					type: BattleHistoryType.Narration,
				},
			])
			return
		}
		const damageDealt = Math.floor(
			Math.random() * (attack.damageMax - attack.damageMin) + attack.damageMin,
		)
		killOrDealDamage(
			enemyHealth,
			damageDealt,
			setEnemyHealth,
			setEnemyTakingDamages,
		)
		setBattleHistory([
			...battleHistory,
			{
				text: `Yol utilise ${attack.name} et inflige ${damageDealt} points de dégâts`,
				type: BattleHistoryType.PlayerAttack,
			},
		])

		removeUseAttack(index)
		setMenuState('initial')
		setPlayerTurn(false)
	}
	return (
		<>
			{yolAttacks.map((attack, index) => (
				<div
					key={index}
					className={optionButtonClassName + ' text-error'}
					onClick={() => handleAttack(attack, index)}
				>
					{attack.name}
					<div className='sm:text-3xl text-white'>
						Attaques restantes : {attack.uses}
					</div>
				</div>
			))}
			<div
				className={optionButtonClassName}
				onClick={() => setMenuState('initial')}
			>
				Retour
			</div>
		</>
	)
}

export default AttackMenu
