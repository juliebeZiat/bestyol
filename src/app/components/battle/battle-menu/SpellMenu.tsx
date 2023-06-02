'use client'

import { BattleHistoryLine, BattleHistoryType, Spell } from '../types'
import { fullHealthOrHeal, killOrDealDamage } from '../utils'

interface SpellMenuProps {
	setMenuState: React.Dispatch<
		React.SetStateAction<'initial' | 'attack' | 'inventory' | 'spell' | 'run'>
	>
	optionButtonClassName: string
	enemyHealth: number
	setEnemyHealth: (value: number) => void
	yolHealth: number
	setYolHealth: (value: number) => void
	spells: Spell[]
	battleHistory: BattleHistoryLine[]
	setBattleHistory: (value: BattleHistoryLine[]) => void
	setPlayerTurn: (value: boolean) => void
	yolMana: number
	setYolMana: (value: number) => void
	setEnemyTakingDamages: (value: boolean) => void
}

const SpellMenu = ({
	setMenuState,
	optionButtonClassName,
	enemyHealth,
	setEnemyHealth,
	yolHealth,
	setYolHealth,
	yolMana,
	setYolMana,
	spells,
	battleHistory,
	setBattleHistory,
	setPlayerTurn,
	setEnemyTakingDamages,
}: SpellMenuProps) => {
	const handleSpellUse = (spell: Spell) => {
		// Check if enough mana, else can't cast spell
		if (yolMana < spell.mana) {
			setBattleHistory([
				...battleHistory,
				{
					text: `Yol n'a pas assez de mana pour utiliser "${spell.name}"`,
					type: BattleHistoryType.PlayerMana,
				},
			])
			return
		}
		// Check if spell is a damage spell or a heal spell
		if (spell.damageMin && spell.damageMax) {
			const damageDealt = Math.floor(
				Math.random() * (spell.damageMax - spell.damageMin) + spell.damageMin,
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
					text: `Yol utilise "${spell.name}" et inflige ${damageDealt} points de dégâts.`,
					type: BattleHistoryType.PlayerAttack,
				},
			])
		} else if (spell.healMin && spell.healMax) {
			const heal = Math.floor(
				Math.random() * (spell.healMax - spell.healMin) + spell.healMin,
			)
			fullHealthOrHeal(yolHealth, heal, setYolHealth)
			setBattleHistory([
				...battleHistory,
				{
					text: `Yol utilise "${spell.name}" et se soigne de ${heal} points de vie.`,
					type: BattleHistoryType.PlayerHeal,
				},
			])
		}

		setYolMana(yolMana - spell.mana)
		setMenuState('initial')
		setPlayerTurn(false)
	}
	return (
		<>
			{spells.map((spell, index) => (
				<div
					key={index}
					className={optionButtonClassName}
					onClick={() => handleSpellUse(spell)}
				>
					<div className={spell.damageMin ? 'text-error' : 'text-green'}>
						{spell.name}
					</div>

					<div className='text-blue sm:text-3xl'>
						Coût en mana : {spell.mana}
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

export default SpellMenu
