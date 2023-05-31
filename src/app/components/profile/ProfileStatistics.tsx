import Box from '../ui/Box'

const ProfileStatistics = () => {
	return (
		<Box additionalStyle='min-w-[300px] max-w-[300px] min-h-[400px] border-white border-2'>
			<div className='flex flex-col items-center gap-5'>
				<h2 className='text-center text-4xl tracking-wider'>Statistiques</h2>
				<div>
					<ul className='text-xl'>
						<li>• 11 succès complétés</li>
						<li>• 63 tâches quotidiennes achevées</li>
						<li>• 1 évolution de Yol</li>
						<li>• 2354 points d'expériences acquis</li>
						<li>• Membre depuis le 02/01/23</li>
					</ul>
				</div>
			</div>
		</Box>
	)
}

export default ProfileStatistics
