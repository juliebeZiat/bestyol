'use client'

import BattleEndScreen from '@/app/components/battle/BattleEndScreen'
import BattleInterface from '@/app/components/battle/BattleInterface'
import BattleZone from '@/app/components/battle/BattleZone'
import { useEffect, useState } from 'react'
import enemiesData from '../../../components/battle/enemies.json'
import { BattleYol, Enemy } from '@/app/components/battle/types'

const BattlePage = () => {
	const [gameState, setGameState] = useState<'battle' | 'victory' | 'defeat'>(
		'battle',
	)
	const [playerTurn, setPlayerTurn] = useState<boolean>(true)
	const [yolHealth, setYolHealth] = useState<number>(100)
	const [yolMana, setYolMana] = useState<number>(100)
	const [enemyHealth, setEnemyHealth] = useState<number>(100)
	const [yolTakingDamages, setYolTakingDamages] = useState<boolean>(false)
	const [enemyTakingDamages, setEnemyTakingDamages] = useState<boolean>(false)
	const [yolInfo, setYolInfo] = useState<BattleYol>({
		name: 'Mr. Greenbelly',
		species: 'greenbelly',
		image: '/assets/yols/base/feuille.png',
		evolution: 3,
		maxMana: 100,
		maxHealth: 100,
	})
	// rotateImage is used to rotate the enemy image so that it faces the yol, Yol should look to the right and enemy to the left
	const [enemy, setEnemy] = useState<Enemy>({
		attacks: [],
		name: '',
		image: '',
		rotateImage: false,
		maxHealth: 100,
	})

	// Set yol info
	useEffect(() => {
		setYolHealth(yolInfo.maxHealth)
	}, [])

	// Set random enemy
	useEffect(() => {
		const randomEnemy =
			enemiesData[Math.floor(Math.random() * enemiesData.length)]
		setEnemy(randomEnemy)
		setEnemyHealth(randomEnemy.maxHealth)
	}, [])

	// Manage game state
	useEffect(() => {
		if (yolHealth === 0 || (yolHealth === 0 && enemyHealth === 0)) {
			setGameState('defeat')
		} else if (enemyHealth === 0) {
			setGameState('victory')
		}
	}, [yolHealth, enemyHealth])

	return (
		<div className='h-[calc(100vh-64px)] w-full'>
			<BattleZone
				enemy={enemy}
				playerTurn={playerTurn}
				yolHealth={yolHealth}
				yolMana={yolMana}
				enemyHealth={enemyHealth}
				gameState={gameState}
				yolTakingDamages={yolTakingDamages}
				enemyTakingDamages={enemyTakingDamages}
				setYolTakingDamages={setYolTakingDamages}
				setEnemyTakingDamages={setEnemyTakingDamages}
				yolInfo={yolInfo}
			/>
			<BattleInterface
				enemy={enemy}
				yolHealth={yolHealth}
				yolMana={yolMana}
				setYolMana={setYolMana}
				setYolHealth={setYolHealth}
				enemyHealth={enemyHealth}
				setEnemyHealth={setEnemyHealth}
				playerTurn={playerTurn}
				setPlayerTurn={setPlayerTurn}
				gameState={gameState}
				setGameState={setGameState}
				setYolTakingDamages={setYolTakingDamages}
				setEnemyTakingDamages={setEnemyTakingDamages}
				yolInfo={yolInfo}
			/>
			{gameState !== 'battle' && (
				<BattleEndScreen enemy={enemy} gameState={gameState} />
			)}
		</div>
	)
}

export default BattlePage
