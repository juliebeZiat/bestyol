import Navbar from '@/app/components/layout/navbar'

const NavLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<Navbar />
			{children}
		</>
	)
}

export default NavLayout
