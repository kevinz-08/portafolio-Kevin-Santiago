import { useState, useEffect } from 'react'
import { useTheme } from '../hooks/useTheme'
import { useScrollSpy } from '../hooks/useScrollSpy'

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#services', label: 'Services' },
  { href: '#technologies', label: 'Technologies' },
  { href: '#about-me', label: 'About Me' },
  { href: '#contact-me', label: 'Contact me' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const activeSection = useScrollSpy(['home', 'services', 'technologies', 'about-me', 'contact-me'])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 250)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleLinkClick = () => {
    if (window.innerWidth <= 768) {
      setIsMenuOpen(false)
    }
  }

  const getActiveClass = (href) => {
    const sectionId = href.replace('#', '')
    return activeSection === sectionId
      ? 'text-primary dark:text-primary'
      : 'text-text-secondary dark:text-text-secondary'
  }

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-bg-light dark:bg-bg-primary shadow-md transition-colors duration-300">
      <div className="flex items-center justify-center px-5 py-4 relative">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-2xl cursor-pointer text-text-primary dark:text-text-primary order-1"
          aria-label="Toggle menu"
        >
          ☰
        </button>

        <nav
          className={`${
            isScrolled
              ? 'fixed top-5 left-1/2 transform -translate-x-1/2 bg-bg-light dark:bg-bg-primary border border-border-dark rounded-full px-5 py-2.5 shadow-lg z-50'
              : 'static'
          } ${
            isMenuOpen ? 'max-h-96 mt-4' : 'max-h-0'
          } md:max-h-none flex flex-col md:flex-row gap-10 md:gap-10 w-full md:w-auto overflow-hidden transition-all duration-500 md:transition-none order-4 md:order-2`}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              className={`${getActiveClass(link.href)} font-lato-bold text-sm md:text-base py-4 md:py-0 relative transition-colors duration-300 hover:text-primary ${
                isScrolled
                  ? 'px-3.5 py-2 rounded-full'
                  : 'md:border-b-2 md:border-transparent hover:border-primary'
              }`}
            >
              {link.label}
              {activeSection === link.href.replace('#', '') && !isScrolled && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>
              )}
            </a>
          ))}
        </nav>

        <button
          onClick={toggleTheme}
          className="ml-10 bg-transparent border-none text-text-secondary dark:text-text-secondary text-xl cursor-pointer transition-colors duration-300 hover:text-primary z-10 order-3"
          title="Cambiar tema"
          aria-label="Toggle theme"
        >
          <i className={theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon'}></i>
        </button>
      </div>
    </header>
  )
}
