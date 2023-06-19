import { useTheme } from '@/contexts/ThemeContext'

interface TabsProps {
	activeItemsTitle: string
	archivedItemsTitle: string
	activeItemsCondition: boolean
	archivedItemsCondition: boolean
	setActiveItems: () => void
	setArchivedItems: () => void
}

const Tabs = ({
	activeItemsTitle,
	archivedItemsTitle,
	activeItemsCondition,
	archivedItemsCondition,
	setActiveItems,
	setArchivedItems,
}: TabsProps) => {
	const { theme } = useTheme()
	return (
		<div className='flex justify-end cursor-pointer h-[50px] !absolute top-0 right-0 w-[50%] rounded-bl-lg overflow-hidden'>
			<div
				className={`py-1 w-[50%] flex justify-center items-center ${
					activeItemsCondition ? theme.vibrantBackgroundColor : 'bg-lowOpacity'
				}`}
				onClick={setActiveItems}
			>
				<p className='text-white text-center'>{activeItemsTitle}</p>
			</div>
			<div
				className={`w-[50%] flex justify-center items-center  ${
					archivedItemsCondition
						? theme.vibrantBackgroundColor
						: 'bg-lowOpacity'
				} py-1`}
				onClick={setArchivedItems}
			>
				<p className='text-white text-center'>{archivedItemsTitle}</p>
			</div>
		</div>
	)
}

export default Tabs
