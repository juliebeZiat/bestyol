export function killOrDealDamage(attackedCharacterHealth: number, damage: number, setHealth: (health: number) => void, characterIsTakingDamages: (_: boolean) => void) {
    if (attackedCharacterHealth - damage < 0) setHealth(0)
    else setHealth(attackedCharacterHealth - damage)
    characterIsTakingDamages(true)
}

export function fullHealthOrHeal(healedCharacterHealth: number, heal: number, setHealth: (health: number) => void) {
    if (healedCharacterHealth + heal > 100) setHealth(100)
    else setHealth(healedCharacterHealth + heal)
}