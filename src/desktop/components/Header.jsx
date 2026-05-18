import { useState, useEffect } from 'react'
import { useScrollSpy } from '../../hooks/useScrollSpy'

const NAV_LINKS = [
  { href: '#mi-historia',  label: 'Mi historia'  },
  { href: '#stack',        label: 'Stack'         },
  { href: '#experiencia',  label: 'Experiencia'   },
  { href: '#proyectos',    label: 'Proyectos'     },
  { href: '#formacion',    label: 'Formación'     },
  { href: '#aprendiendo',    label: 'Aprendiendo'     },
  { href: '#contactame',   label: 'Contáctame'    },
]

export default function Header({ visible = true }) {
  const [scrolled, setScrolled] = useState(false)
  const activeSection = useScrollSpy([
    'mi-historia', 'stack', 'experiencia', 'proyectos', 'formacion', 'aprendiendo', 'contactame',
  ])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 50,
      height: '68px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 clamp(24px, 4vw, 64px)',
      background: scrolled ? 'rgba(10,10,10,0.7)' : 'transparent',
      backdropFilter: scrolled ? 'blur(18px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(18px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      transition: 'background 300ms, border-color 300ms, opacity 0.6s ease',
      opacity: visible ? 1 : 0,
    }}>
      {/* Logo */}
      <a
        href="#home"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '20px',
          fontWeight: 500,
          letterSpacing: '0.02em',
          color: '#ffffff',
          textDecoration: 'none',
        }}
      >
        Santiago Dev
      </a>

      {/* Nav links */}
      <nav style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
        {NAV_LINKS.map((link) => {
          const id = link.href.replace('#', '')
          const isActive = activeSection === id
          return (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '13px',
                fontWeight: 400,
                letterSpacing: '0.02em',
                color: isActive ? '#ffffff' : 'rgba(255,255,255,0.5)',
                textDecoration: 'none',
                transition: 'color 200ms',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#ffffff' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = isActive ? '#ffffff' : 'rgba(255,255,255,0.5)' }}
            >
              {link.label}
            </a>
          )
        })}
      </nav>
    </header>
  )
}
