import { useState, useEffect } from 'react'
import { useScrollSpy } from '../../hooks/useScrollSpy'

const NAV_LINKS = [
  { href: '#home',        label: 'Inicio'      },
  { href: '#mi-historia', label: 'Mi historia' },
  { href: '#stack',       label: 'Stack'       },
  { href: '#experiencia', label: 'Experiencia' },
  { href: '#proyectos',   label: 'Proyectos'   },
  { href: '#formacion',   label: 'Formación'   },
  { href: '#aprendiendo', label: 'Aprendiendo' },
  { href: '#contactame',  label: 'Contáctame'  },
]

export default function Header() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const activeSection = useScrollSpy([
    'home','mi-historia','stack','experiencia','proyectos','formacion','aprendiendo','contactame',
  ])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header style={{
        position:             'fixed',
        top:                  0,
        left:                 0,
        width:                '100%',
        zIndex:               50,
        height:               '64px',
        display:              'flex',
        alignItems:           'center',
        justifyContent:       'space-between',
        padding:              '0 24px',
        background:           scrolled ? 'rgba(10,10,10,0.85)' : 'transparent',
        backdropFilter:       scrolled ? 'blur(18px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(18px)' : 'none',
        borderBottom:         scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        transition:           'background 300ms, border-color 300ms',
        boxSizing:            'border-box',
      }}>
        {/* Logo */}
        <a
          href="#home"
          onClick={() => setMenuOpen(false)}
          style={{
            fontFamily:     "'Cormorant Garamond', serif",
            fontSize:       '20px',
            fontWeight:     300,
            letterSpacing:  '0.02em',
            color:          '#ffffff',
            textDecoration: 'none',
          }}
        >
          Santiago Dev
        </a>

        {/* Hamburger button */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', flexDirection: 'column', gap: '5px' }}
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display:    'block',
              width:      '22px',
              height:     '1px',
              background: '#ffffff',
              transition: 'transform 280ms cubic-bezier(0.16,1,0.3,1), opacity 280ms',
              transform:  menuOpen
                ? i === 0 ? 'translateY(6px) rotate(45deg)'
                : i === 2 ? 'translateY(-6px) rotate(-45deg)'
                : 'scaleX(0)'
                : 'none',
              opacity: menuOpen && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </header>

      {/* Full-screen overlay menu */}
      <div style={{
        position:             'fixed',
        inset:                0,
        zIndex:               40,
        backgroundColor:      'rgba(10,10,10,0.97)',
        backdropFilter:       'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        display:              'flex',
        flexDirection:        'column',
        alignItems:           'center',
        justifyContent:       'center',
        gap:                  '8px',
        opacity:              menuOpen ? 1 : 0,
        pointerEvents:        menuOpen ? 'auto' : 'none',
        transition:           'opacity 300ms cubic-bezier(0.16,1,0.3,1)',
      }}>
        {NAV_LINKS.map((link, i) => {
          const id       = link.href.replace('#', '')
          const isActive = activeSection === id
          return (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily:     "'Cormorant Garamond', serif",
                fontSize:       'clamp(28px, 8vw, 42px)',
                fontWeight:     300,
                letterSpacing:  '-0.01em',
                color:          isActive ? '#f0f0f0' : 'rgba(255,255,255,0.3)',
                textDecoration: 'none',
                transition:     'color 200ms',
                transform:      menuOpen ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay:`${i * 35}ms`,
                padding:        '8px 0',
              }}
            >
              {link.label}
            </a>
          )
        })}
      </div>
    </>
  )
}
