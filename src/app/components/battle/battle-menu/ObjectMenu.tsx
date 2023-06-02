import {
	BattleHistoryLine,
	BattleHistoryType,
	Enemy,
	InventoryObject,
	ObjectType,
} from '../types'

import { v4 as uuidv4 } from 'uuid'
import allItems from '../items.json'
import { fullHealthOrHeal, killOrDealDamage } from '../utils'

interface ObjectMenuProps {
	setMenuState: React.Dispatch<
		React.SetStateAction<'initial' | 'attack' | 'inventory' | 'spell' | 'run'>
	>
	optionButtonClassName: string
	yolHealth: number
	setYolHealth: (value: number) => void
	enemyHealth: number
	setEnemyHealth: (value: number) => void
	yolMana: number
	setYolMana: (value: number) => void
	battleHistory: BattleHistoryLine[]
	setBattleHistory: (value: BattleHistoryLine[]) => void
	setPlayerTurn: (value: boolean) => void
	inventory: InventoryObject[]
	setInventory: (value: InventoryObject[]) => void
	enemy: Enemy
	setEnemyTakingDamages: (value: boolean) => void
	setYolTakingDamages: (value: boolean) => void
}

const ObjectMenu = ({
	setMenuState,
	optionButtonClassName,
	yolHealth,
	setYolHealth,
	enemy,
	enemyHealth,
	setEnemyHealth,
	yolMana,
	setYolMana,
	battleHistory,
	setBattleHistory,
	setPlayerTurn,
	inventory,
	setInventory,
	setEnemyTakingDamages,
	setYolTakingDamages,
}: ObjectMenuProps) => {
	// On object use per object type
	const handleObjectUse = (object: InventoryObject) => {
		if (object.type === ObjectType.Heal && object.heal) {
			fullHealthOrHeal(yolHealth, object.heal, setYolHealth)
			setBattleHistory([
				...battleHistory,
				{
					text: `Yol utilise "${object.name}" et récupère ${object.heal} points de vie.`,
					type: BattleHistoryType.PlayerHeal,
				},
			])
		}
		if (object.type === ObjectType.Mana && object.mana) {
			if (yolMana + object.mana > 100) setYolMana(100)
			else setYolMana(yolMana + object.mana)
			setBattleHistory([
				...battleHistory,
				{
					text: `Yol utilise "${object.name}" et récupère ${object.mana} points de mana.`,
					type: BattleHistoryType.PlayerMana,
				},
			])
		}
		if (object.type === ObjectType.Damage && object.damage) {
			killOrDealDamage(
				enemyHealth,
				object.damage,
				setEnemyHealth,
				setEnemyTakingDamages,
			)
			setBattleHistory([
				...battleHistory,
				{
					text: `Yol utilise "${object.name}" et inflige ${object.damage} points de dégâts à ${enemy.name}.`,
					type: BattleHistoryType.PlayerAttack,
				},
			])
		}
		if (object.type === ObjectType.Bonus && object.damage && object.heal) {
			if (object.heal) {
				fullHealthOrHeal(yolHealth, object.heal, setYolHealth)
			}
			if (object.damage) {
				killOrDealDamage(
					enemyHealth,
					object.damage,
					setEnemyHealth,
					setYolTakingDamages,
				)
			}

			setBattleHistory([
				...battleHistory,
				{
					text: `Yol utilise "${object.name}" et inflige ${object.damage} points de dégâts à ${enemy.name} et récupère ${object.heal} points de vie.`,
					type: BattleHistoryType.Bonus,
				},
			])
		}
		if (object.type === ObjectType.Chaos && object.damage && object.heal) {
			// Chaos objects mean dealing damage to the enemy and to yourself, the heal is in negative
			if (object.damage) {
				killOrDealDamage(
					enemyHealth,
					object.damage,
					setEnemyHealth,
					setEnemyTakingDamages,
				)
			}
			if (object.heal) {
				killOrDealDamage(
					yolHealth,
					object.heal,
					setYolHealth,
					setYolTakingDamages,
				)
			}

			setBattleHistory([
				...battleHistory,
				{
					text: `Yol utilise "${object.name}" et inflige ${object.damage} points de dégâts à ${enemy.name} et s'inflige ${object.heal} points de vie à lui-même !`,
					type: BattleHistoryType.Chaos,
				},
			])
		}
		setInventory(inventory.filter((item) => item.id !== object.id))
		setMenuState('initial')
		setPlayerTurn(false)
	}

	// On object found
	const handleObjectFound = (item: InventoryObject) => {
		setBattleHistory([
			...battleHistory,
			{
				text: `Yol trouve "${item.name}" !`,
				type: BattleHistoryType.Narration,
			},
		])
		setInventory([...inventory, item])
		setMenuState('initial')
		setPlayerTurn(false)
	}

	// On object search
	const handleObjectSearch = () => {
		const id = uuidv4()
		const randomItem = allItems[Math.floor(Math.random() * allItems.length)]
		let itemType: ObjectType

		switch (randomItem.type) {
			case 'Heal':
				itemType = ObjectType.Heal
				break
			case 'Mana':
				itemType = ObjectType.Mana
				break
			case 'Bonus':
				itemType = ObjectType.Bonus
				break
			case 'Damage':
				itemType = ObjectType.Damage
				break
			case 'Chaos':
				itemType = ObjectType.Chaos
				break
			default:
				throw new Error("Type d'objet invalide")
		}
		const item: InventoryObject = {
			id,
			name: randomItem.name,
			heal: randomItem.heal,
			mana: randomItem.mana,
			damage: randomItem.damage,
			type: itemType,
		}
		handleObjectFound(item)
	}

	// Render inventory slot for every item else render empty slot
	const renderInventorySlot = (
		object: InventoryObject | null,
		index: number,
	) => {
		if (object) {
			return (
				<div
					key={index}
					className={optionButtonClassName}
					onClick={() => handleObjectUse(object)}
				>
					{object.name}
					{object.heal && object.name !== 'Bombe instable' && (
						<div className='sm:text-3xl text-green'>+{object.heal} HP</div>
					)}
					{object.mana && (
						<div className='sm:text-3xl text-blue'>+{object.mana} Mana</div>
					)}
					{object.damage && (
						<div className='sm:text-3xl text-error'>-{object.damage} HP</div>
					)}
				</div>
			)
		} else {
			return (
				<div
					key={index}
					className={optionButtonClassName}
					onClick={handleObjectSearch}
				>
					Chercher un objet
				</div>
			)
		}
	}

	return (
		<>
			{inventory.map((object, index) => renderInventorySlot(object, index))}
			{inventory.length < 3 && renderInventorySlot(null, inventory.length)}
			<div
				className={optionButtonClassName}
				onClick={() => setMenuState('initial')}
			>
				Retour
			</div>
		</>
	)
}

export default ObjectMenu
