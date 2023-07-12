import Button from '@/app/components/ui/Button'
import Link from 'next/link'

export default function NotFound() {
	return (
		<div className='flex items-center h-screen'>
			<div className='text-center'>
				<h1 className='text-6xl text-white'>Cette page n'existe pas !</h1>
				<p className='my-6 text-white text-4xl'>╰(•́ ꞈ •̀)╯</p>
				<Link href='/'>
					<Button content='Retourner vers Bestyol' textColor='text-white' />
				</Link>
			</div>
		</div>
	)
}
