
export interface InventoryObject {
    id: string
    name: string
    heal?: number
    mana?: number
    damage?: number
    type: ObjectType
}

export interface YolAction {
    species: string
    evolution: number
    name: string
}

export interface Spell extends YolAction {
    mana: number
    healMin?: number
    healMax?: number
    damageMin?: number
    damageMax?: number
}

export interface Attack extends YolAction {
    damageMin: number
    damageMax: number
    uses: number
}

export interface Enemy {
    name: string
    maxHealth: number
    image: string
    attacks: {
        name: string
        damages: number
    }[]
    rotateImage: boolean
}

export interface BattleHistoryLine {
    text: string
    type: BattleHistoryType
}

export interface BattleYol {
    name: string
    species: string
    image: string
    evolution: number
    maxHealth: number
    maxMana: number
}

export enum BattleHistoryType {
    Narration,
    PlayerAttack,
    PlayerHeal,
    PlayerMana,
    EnemyAttack,
    Chaos,
    Bonus,
}

export enum ObjectType {
    Heal,
    Mana,
    Bonus,
    Damage,
    Chaos
}
