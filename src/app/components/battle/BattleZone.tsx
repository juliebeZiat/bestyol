'use client'

import Image from 'next/image'
import { BattleYol, Enemy } from './types'
import { useEffect, useState } from 'react'

interface BattleZoneProps {
	playerTurn: boolean
	yolHealth: number
	yolMana: number
	enemyHealth: number
	enemy: Enemy
	gameState: 'battle' | 'victory' | 'defeat'
	yolTakingDamages: boolean
	enemyTakingDamages: boolean
	setYolTakingDamages: (value: boolean) => void
	setEnemyTakingDamages: (value: boolean) => void
	yolInfo: BattleYol
}

const BattleZone = ({
	playerTurn,
	yolHealth,
	yolMana,
	enemyHealth,
	enemy,
	gameState,
	yolTakingDamages,
	enemyTakingDamages,
	setYolTakingDamages,
	setEnemyTakingDamages,
	yolInfo,
}: BattleZoneProps) => {
	const [dots, setDots] = useState('...')
	const yolHealthPercentage = `${Math.round(
		(yolHealth / yolInfo.maxHealth) * 100,
	)}%`
	const enemyHealthPercentage = `${Math.round(
		(enemyHealth / enemy.maxHealth) * 100,
	)}%`

	// Manage dots animation
	useEffect(() => {
		const interval = setInterval(() => {
			setDots((prevDots) => {
				if (prevDots === '...') {
					return '.'
				} else if (prevDots === '.') {
					return '..'
				} else if (prevDots === '..') {
					return '...'
				}
				return prevDots
			})
		}, 1000)

		return () => clearInterval(interval)
	}, [])

	// Manage taking damages animations
	useEffect(() => {
		if (yolHealth !== 100) {
			setYolTakingDamages(true)
			setTimeout(() => {
				setYolTakingDamages(false)
			}, 500)
		}
	}, [yolHealth])

	useEffect(() => {
		if (enemyHealth !== 100) {
			setEnemyTakingDamages(true)
			setTimeout(() => {
				setEnemyTakingDamages(false)
			}, 500)
		}
	}, [enemyHealth])

	return (
		<div className='w-full h-[50%] flex'>
			<div className='w-[45%] flex justify-center items-center ] '>
				<div
					className={
						'flex flex-col justify-center items-center ' +
						(playerTurn && gameState === 'battle' ? 'animate-hovering' : '') +
						(gameState === 'victory' ? 'animate-bounce ' : '') +
						(yolHealth === 0 ? ' animate-spinScaleDownDisapear ' : '') +
						(yolTakingDamages ? ' animate-slideLeftRightQuickly ' : '')
					}
				>
					<p className='text-center text-white text-2xl'>{yolInfo.name}</p>

					<Image
						src={yolInfo.image}
						width={150}
						height={150}
						alt='yol'
						className={
							' ' +
							(yolHealth < yolInfo.maxHealth / 2 && gameState === 'battle'
								? 'animate-pulse'
								: '')
						}
					/>

					{gameState === 'battle' && (
						<>
							<div
								className={
									'relative w-[100%] bg-white ' +
									(yolTakingDamages ? ' border-4 border-error' : '')
								}
							>
								<div
									className='h-4 bg-green'
									style={{ width: yolHealthPercentage }}
								/>
								<div className='absolute top-[-20%] left-[40%] flex justify-center items-center font-semibold'>
									{yolHealth} / {yolInfo.maxHealth}
								</div>
							</div>
							<div className='w-[100%] bg-white relative'>
								<div className=' h-4 bg-blue' style={{ width: yolMana * 2 }} />
								<div className='absolute top-[-20%] left-[40%] flex justify-center items-center font-semibold'>
									{yolMana} / {yolInfo.maxMana}
								</div>
							</div>
						</>
					)}
				</div>
			</div>
			{gameState === 'battle' && (
				<div className='w-[10%] h-full flex items-center justify-center text-7xl text text-orange font-semibold'>
					VS
				</div>
			)}
			<div className='w-[45%] flex justify-center items-center  '>
				<div
					className={
						' ' +
						(playerTurn && gameState === 'battle' ? '' : ' animate-hovering ') +
						(gameState === 'defeat' ? ' animate-bounce ' : '') +
						(enemyHealth === 0 ? ' animate-spinScaleDownDisapear ' : '') +
						(enemyTakingDamages ? ' animate-slideLeftRightQuickly ' : '')
					}
				>
					<p className='text-center text-white text-2xl'>{enemy.name}</p>

					<div className='relative flex flex-col justify-center items-center'>
						<Image
							src={enemy.image}
							width={200}
							height={200}
							alt='ennemi'
							className={
								' ' +
								(enemy.rotateImage ? 'transform scale-x-[-1] ' : '') +
								(enemyHealth < enemy.maxHealth / 2 && enemyHealth !== 0
									? ' animate-pulse '
									: '')
							}
						/>
						{!playerTurn && gameState === 'battle' && (
							<div className='absolute top-2 left-32'>
								<div className='min-w-[42px] text-lg bg-white p-2 border-2 border-purple'>
									{dots}
								</div>
								<div className='ml-2 w-6 overflow-hidden z-50 absolute bottom-[-78%]'>
									<div className='h-10 bg-white rotate-45 transform origin-top-right border-2 border-purple' />
								</div>
							</div>
						)}
					</div>
					{gameState === 'battle' && (
						<div
							className={
								'relative w-[100%] bg-white ' +
								(enemyTakingDamages ? 'border-4 border-error ' : '')
							}
						>
							<div
								className='h-4 bg-green'
								style={{ width: enemyHealthPercentage }}
							/>
							<div className='absolute top-[-20%] left-[40%] flex justify-center items-center font-semibold'>
								{enemyHealth} / {enemy.maxHealth}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default BattleZone
