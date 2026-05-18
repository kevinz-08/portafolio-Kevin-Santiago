import { useRef } from 'react'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa'

const DS = {
  bg: '#0a0a0a',
  border: '#2a2a2a',
  textSecondary: '#a0a0a0',
  textTertiary: '#606060',
  gold: '#d4a843',
}

const NAV = [
  { label: 'Inicio',      href: '#home'        },
  { label: 'Mi historia', href: '#mi-historia'  },
  { label: 'Stack',       href: '#stack'        },
  { label: 'Proyectos',   href: '#proyectos'    },
  { label: 'Contacto',    href: '#contactame'   },
]

const SOCIAL = [
  { label: 'GitHub',   href: 'https://github.com/kevinz-08',                           icon: FaGithub },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kevin-gutierrez-b4214535b/', icon: FaLinkedinIn },
]

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: DS.bg,
        borderTop: `1px solid ${DS.border}`,
        padding: 'clamp(32px, 4vw, 48px) clamp(40px, 7vw, 130px)',
      }}
    >
      {/* Top row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '32px',
        marginBottom: '32px',
        flexWrap: 'wrap',
      }}>
        {/* Name + slogan */}
        <div>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: '18px',
            fontWeight: 300,
            color: DS.textSecondary,
            margin: '0 0 4px',
          }}>
            Kevin Gutiérrez
          </p>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '12px',
            fontWeight: 300,
            color: DS.textTertiary,
            margin: 0,
            letterSpacing: '0.05em',
          }}>
            Desarrollador de Software · Full Stack
          </p>
        </div>

        {/* Nav */}
        <nav style={{ display: 'flex', gap: 'clamp(16px, 3vw, 40px)', flexWrap: 'wrap' }}>
          {NAV.map(({ label, href }) => (
            <FooterLink key={href} href={href}>{label}</FooterLink>
          ))}
        </nav>

        {/* Social icons */}
        <div style={{ display: 'flex', gap: '16px' }}>
          {SOCIAL.map(({ label, href, icon: Icon }) => (
            <IconLink key={href} href={href} label={label} icon={Icon} />
          ))}
        </div>
      </div>

      {/* Bottom row — copyright */}
      <div style={{
        borderTop: `1px solid ${DS.border}`,
        paddingTop: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '8px',
      }}>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '12px',
          fontWeight: 300,
          color: DS.textTertiary,
          margin: 0,
          letterSpacing: '0.03em',
        }}>
          © {new Date().getFullYear()} Kevin Santiago Gutiérrez. Todos los derechos reservados.
        </p>

        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '12px',
          fontWeight: 300,
          color: DS.textTertiary,
          margin: 0,
          letterSpacing: '0.03em',
        }}>
          Diseñado y construido con{' '}
          <em style={{ color: DS.gold, fontStyle: 'italic' }}>precisión.</em>
        </p>
      </div>
    </footer>
  )
}

// ── Sub-components ─────────────────────────────────────────────────────────

function FooterLink({ href, children }) {
  const ref = useRef(null)
  return (
    <a
      ref={ref}
      href={href}
      onMouseEnter={() => { if (ref.current) ref.current.style.color = DS.gold }}
      onMouseLeave={() => { if (ref.current) ref.current.style.color = DS.textTertiary }}
      style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '13px',
        fontWeight: 300,
        color: DS.textTertiary,
        textDecoration: 'none',
        letterSpacing: '0.03em',
        transition: 'color 250ms',
      }}
    >
      {children}
    </a>
  )
}

function IconLink({ href, label, icon: Icon }) {
  const ref = useRef(null)
  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onMouseEnter={() => { if (ref.current) ref.current.style.color = DS.gold }}
      onMouseLeave={() => { if (ref.current) ref.current.style.color = DS.textTertiary }}
      style={{
        color: DS.textTertiary,
        transition: 'color 250ms',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Icon size={16} />
    </a>
  )
}
