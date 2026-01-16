import { useState, useEffect } from 'react'

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    return savedTheme || 'dark'
  })

  useEffect(() => {
    localStorage.setItem('theme', theme)
    
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
      document.body.classList.add('dark-theme')
      document.body.classList.remove('light-theme')
    } else {
      document.documentElement.classList.add('light')
      document.documentElement.classList.remove('dark')
      document.body.classList.add('light-theme')
      document.body.classList.remove('dark-theme')
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark')
  }

  return { theme, toggleTheme }
}
