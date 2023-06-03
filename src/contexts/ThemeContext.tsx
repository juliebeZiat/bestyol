'use client'

import {
	ReactNode,
	SetStateAction,
	createContext,
	useContext,
	useState,
} from 'react'

import { themes } from '@/data/themes'

interface ThemeProviderProps {
	children: ReactNode
}

interface Theme {
	primaryBorderColor: string
	gradientFrom: string
	gradientTo: string
	primaryBackgroundColor: string
	secondaryBackgroundColor: string
	vibrantBackgroundColor: string
}

interface ThemeContextProps {
	theme: Theme
	setTheme: React.Dispatch<SetStateAction<Theme>>
}

const ThemeContext = createContext({} as ThemeContextProps)

const ThemeProvider = ({ children }: ThemeProviderProps) => {
	const [theme, setTheme] = useState<Theme>(themes.lightGreen)

	const value = {
		theme,
		setTheme,
	}

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)

export default ThemeProvider
