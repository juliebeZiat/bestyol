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

export interface Themes {
	[key: string | number]: Theme
}

export interface Theme {
	[key: string]: string

	name: string
	pixelBorderColor: string
	borderColor: string
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
	const [theme, setTheme] = useState<Theme>(themes[1])

	const value = {
		theme,
		setTheme,
	}

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)

export default ThemeProvider
