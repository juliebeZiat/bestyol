'use client'

import Image from 'next/image'

import { Enemy } from '@/app/(pages)/(connected-user)/battle/page'
import Button from '../ui/Button'

interface BattleEndScreenProps {
	gameState: 'battle' | 'victory' | 'defeat'
	enemy: Enemy
}

const BattleEndScreen = ({ gameState, enemy }: BattleEndScreenProps) => {
	return (
		<div className='absolute top-0 left-0 flex justify-center items-center w-full h-[calc(100vh)] bg-darkLowOpacity text-white'>
			{gameState === 'victory' && (
				<div className='flex flex-col items-center gap-3'>
					<h1 className='text-center text-7xl text-green'>Victoire !</h1>
					<p className='text-2xl'>Vous avez vaincu un(e) {enemy.name} !</p>
					<Button content='Retour' backgroundColor='bg-orange' />
				</div>
			)}
			{gameState === 'defeat' && (
				<div className='flex flex-col items-center gap-3'>
					<h1 className='text-center text-7xl text-error'>Défaite !</h1>
					<p className='text-2xl'>
						Vous avez été vaincu par un(e) {enemy.name} !
					</p>
					<Button content='Retour' backgroundColor='bg-orange' />
				</div>
			)}
		</div>
	)
}

export default BattleEndScreen
