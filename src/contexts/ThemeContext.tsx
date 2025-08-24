import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

type PrimaryColor = {
  name: string
  value: string
  cssVars: {
    primary: string
    primaryForeground: string
    primaryHover: string
  }
}

const primaryColors: PrimaryColor[] = [
  {
    name: 'blue',
    value: 'hsl(221, 83%, 53%)',
    cssVars: {
      primary: '221 83% 53%',
      primaryForeground: '210 40% 98%',
      primaryHover: '221 83% 45%'
    }
  },
  {
    name: 'green',
    value: 'hsl(142, 76%, 36%)',
    cssVars: {
      primary: '142 76% 36%',
      primaryForeground: '355 100% 97%',
      primaryHover: '142 76% 30%'
    }
  },
  {
    name: 'purple',
    value: 'hsl(262, 83%, 58%)',
    cssVars: {
      primary: '262 83% 58%',
      primaryForeground: '210 40% 98%',
      primaryHover: '262 83% 50%'
    }
  },
  {
    name: 'red',
    value: 'hsl(0, 84%, 60%)',
    cssVars: {
      primary: '0 84% 60%',
      primaryForeground: '210 40% 98%',
      primaryHover: '0 84% 52%'
    }
  },
  {
    name: 'orange',
    value: 'hsl(25, 95%, 53%)',
    cssVars: {
      primary: '25 95% 53%',
      primaryForeground: '210 40% 98%',
      primaryHover: '25 95% 45%'
    }
  },
  {
    name: 'pink',
    value: 'hsl(330, 81%, 60%)',
    cssVars: {
      primary: '330 81% 60%',
      primaryForeground: '210 40% 98%',
      primaryHover: '330 81% 52%'
    }
  }
]

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  primaryColor: PrimaryColor
  setPrimaryColor: (color: PrimaryColor) => void
  primaryColors: PrimaryColor[]
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme') as Theme
    return saved || 'light'
  })
  
  const [primaryColor, setPrimaryColor] = useState<PrimaryColor>(() => {
    const saved = localStorage.getItem('primaryColor')
    return saved ? JSON.parse(saved) : primaryColors[0]
  })

  useEffect(() => {
    const root = window.document.documentElement
    
    // Remove previous theme classes
    root.classList.remove('light', 'dark')
    
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      root.classList.add(systemTheme)
    } else {
      root.classList.add(theme)
    }
    
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const root = window.document.documentElement
    
    // Update CSS custom properties for primary color
    root.style.setProperty('--primary', primaryColor.cssVars.primary)
    root.style.setProperty('--primary-foreground', primaryColor.cssVars.primaryForeground)
    root.style.setProperty('--primary-hover', primaryColor.cssVars.primaryHover)
    
    localStorage.setItem('primaryColor', JSON.stringify(primaryColor))
  }, [primaryColor])

  const value = {
    theme,
    setTheme,
    primaryColor,
    setPrimaryColor,
    primaryColors
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}