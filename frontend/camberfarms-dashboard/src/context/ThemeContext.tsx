import { createContext, useContext, useEffect, useState } from 'react'

type ThemePreference = 'light' | 'dark' | 'system'

interface ThemeContextType {
	theme: ThemePreference // The user's selection
	setTheme: (theme: ThemePreference) => void
	resolvedTheme: 'light' | 'dark' // The actual theme being applied
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [theme, setTheme] = useState<ThemePreference>(() => {
		return (localStorage.getItem('theme') as ThemePreference) || 'system'
	})

	// Calculate the actual theme based on selection or system
	const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light')

	useEffect(() => {
		const root = window.document.documentElement
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

		const applyTheme = () => {
			let activeTheme: 'light' | 'dark'

			if (theme === 'system') {
				activeTheme = mediaQuery.matches ? 'dark' : 'light'
			} else {
				activeTheme = theme
			}

			setResolvedTheme(activeTheme)
			root.classList.remove('light', 'dark')
			root.classList.add(activeTheme)
			localStorage.setItem('theme', theme)
		}

		applyTheme()

		// Listen for system changes if 'system' is selected
		const listener = () => {
			if (theme === 'system') applyTheme()
		}

		mediaQuery.addEventListener('change', listener)
		return () => mediaQuery.removeEventListener('change', listener)
	}, [theme])

	return (
		<ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}

export const useTheme = () => {
	const context = useContext(ThemeContext)
	if (!context) throw new Error('useTheme must be used within a ThemeProvider')
	return context
}
