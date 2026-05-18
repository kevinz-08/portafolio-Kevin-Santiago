import { useState, useRef, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import { FaGithub, FaLinkedinIn, FaEnvelope } from 'react-icons/fa'
import SmokeShader from './SmokeShader'

const DS = {
  bg:           '#0a0a0a',
  border:       'rgba(255,255,255,0.1)',
  borderFocus:  'rgba(255,255,255,0.55)',
  textPrimary:  '#ffffff',
  textSecondary:'rgba(255,255,255,0.55)',
  textTertiary: 'rgba(255,255,255,0.28)',
  gold:         '#d4a843',
  goldDim:      '#a07830',
}

const EMAILJS = {
  serviceId:  'service_bkp9ew4',
  templateId: 'template_7b6zssd',
  publicKey:  '68MZhNiekgSGwxViX',
}

const SOCIAL = [
  { icon: FaGithub,     label: 'github.com/kevinz-08',             href: 'https://github.com/kevinz-08' },
  { icon: FaLinkedinIn, label: 'linkedin.com/in/kevin-gutierrez',  href: 'https://www.linkedin.com/in/kevin-gutierrez-b4214535b/' },
  { icon: FaEnvelope,   label: 'kevingadev@gmail.com',             href: 'mailto:kevingadev@gmail.com' },
]

const NAV = [
  { label: 'Inicio',       href: '#home'        },
  { label: 'Mi historia',  href: '#mi-historia'  },
  { label: 'Stack',        href: '#stack'        },
  { label: 'Experiencia',  href: '#experiencia'  },
  { label: 'Proyectos',    href: '#proyectos'    },
  { label: 'Formación',    href: '#formacion'    },
  { label: 'Aprendiendo',  href: '#aprendiendo'  },
  { label: 'Contacto',     href: '#contactame'   },
]

export default function Contactame() {
  const sectionRef    = useRef(null)
  const shaderWrapRef = useRef(null)
  const leftRef       = useRef(null)
  const rightRef      = useRef(null)

  // ── Parallax — shader moves at 28% of scroll speed ────────────────
  useEffect(() => {
    const section    = sectionRef.current
    const shaderWrap = shaderWrapRef.current
    if (!section || !shaderWrap) return

    const onScroll = () => {
      const rect      = section.getBoundingClientRect()
      shaderWrap.style.transform = `translateY(${rect.top * 0.28}px)`
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── Content fade-in ────────────────────────────────────────────────
  useEffect(() => {
    const targets = [leftRef.current, rightRef.current].filter(Boolean)
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.style.opacity   = '1'
            e.target.style.transform = 'translateY(0)'
            obs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.08 }
    )
    targets.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section
      id="contactame"
      ref={sectionRef}
      style={{ position: 'relative', overflow: 'hidden', backgroundColor: DS.bg }}
    >
      {/* ── SmokeShader — extended ±220px for parallax headroom ───────── */}
      <div
        ref={shaderWrapRef}
        style={{
          position:    'absolute',
          top:         '-220px',
          bottom:      '-220px',
          left:        0,
          right:       0,
          zIndex:      0,
          willChange:  'transform',
        }}
      >
        {/* SmokeShader fills its nearest positioned ancestor */}
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <SmokeShader />
        </div>
      </div>

      {/* ── Top gradient — hard-fade from the dark section above ─────── */}
      <div
        style={{
          position:      'absolute',
          top:           0,
          left:          0,
          right:         0,
          height:        '50%',
          background:    'linear-gradient(to bottom, #0a0a0a 0%, #0a0a0a 18%, transparent 100%)',
          zIndex:        2,
          pointerEvents: 'none',
        }}
      />

      {/* ── Contact content ───────────────────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          zIndex:   3,
          padding:  'clamp(110px, 13vw, 190px) clamp(40px, 7vw, 130px) 0',
        }}
      >
        {/* Section label */}
        <p
          style={{
            fontFamily:    "'DM Sans', sans-serif",
            fontSize:      '11px',
            fontWeight:    400,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color:         DS.textTertiary,
            margin:        '0 0 52px',
          }}
        >
          Contáctame
        </p>

        {/* Two-column layout */}
        <div
          style={{
            display:             'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap:                 'clamp(48px, 8vw, 120px)',
            alignItems:          'start',
          }}
        >
          {/* Left — invitation + social */}
          <div
            ref={leftRef}
            style={{
              opacity:    0,
              transform:  'translateY(40px)',
              transition: 'opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.75s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle:  'italic',
                fontSize:   'clamp(40px, 5vw, 64px)',
                fontWeight: 300,
                lineHeight: 1.1,
                color:      DS.textPrimary,
                margin:     '0 0 24px',
              }}
            >
              Hablemos de tu<br />
              próximo proyecto.
            </h2>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize:   '16px',
                fontWeight: 300,
                lineHeight: 1.75,
                color:      DS.textSecondary,
                margin:     '0 0 52px',
                maxWidth:   '400px',
              }}
            >
              Estoy disponible para proyectos freelance, colaboraciones y
              oportunidades laborales. Si tienes una idea, cuéntamela.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {SOCIAL.map(({ icon: Icon, label, href }) => (
                <SocialLink key={href} icon={Icon} label={label} href={href} />
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div
            ref={rightRef}
            style={{
              opacity:    0,
              transform:  'translateY(40px)',
              transition: 'opacity 0.75s 0.15s cubic-bezier(0.16,1,0.3,1), transform 0.75s 0.15s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            <ContactForm />
          </div>
        </div>
      </div>

      {/* ── Footer bar ────────────────────────────────────────────────── */}
      <footer
        style={{
          position:              'relative',
          zIndex:                3,
          margin:                'clamp(80px, 10vw, 140px) 0 0',
          padding:               'clamp(28px, 3vw, 40px) clamp(40px, 7vw, 130px)',
          borderTop:             '1px solid rgba(255,255,255,0.08)',
          backdropFilter:        'blur(4px)',
          WebkitBackdropFilter:  'blur(4px)',
        }}
      >
        {/* Top row */}
        <div
          style={{
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'space-between',
            gap:            '32px',
            marginBottom:   '24px',
            flexWrap:       'wrap',
          }}
        >
          {/* Name + tagline */}
          <div>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle:  'italic',
                fontSize:   '18px',
                fontWeight: 300,
                color:      'rgba(255,255,255,0.45)',
                margin:     '0 0 4px',
              }}
            >
              Kevin Gutiérrez
            </p>
            <p
              style={{
                fontFamily:    "'DM Sans', sans-serif",
                fontSize:      '12px',
                fontWeight:    300,
                color:         'rgba(255,255,255,0.22)',
                margin:        0,
                letterSpacing: '0.05em',
              }}
            >
              Desarrollador de Software · Full Stack
            </p>
          </div>

          {/* Nav */}
          <nav style={{ display: 'flex', gap: 'clamp(12px, 2vw, 28px)', flexWrap: 'wrap', justifyContent: 'center' }}>
            {NAV.map(({ label, href }) => (
              <FooterLink key={href} href={href}>{label}</FooterLink>
            ))}
          </nav>

          {/* Social icons */}
          <div style={{ display: 'flex', gap: '16px' }}>
            {[
              { href: 'https://github.com/kevinz-08',                           icon: FaGithub,     label: 'GitHub' },
              { href: 'https://www.linkedin.com/in/kevin-gutierrez-b4214535b/', icon: FaLinkedinIn, label: 'LinkedIn' },
            ].map(({ href, icon: Icon, label }) => (
              <IconLink key={href} href={href} icon={Icon} label={label} />
            ))}
          </div>
        </div>

        {/* Bottom row — copyright */}
        <div
          style={{
            borderTop:      '1px solid rgba(255,255,255,0.06)',
            paddingTop:     '18px',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'space-between',
            flexWrap:       'wrap',
            gap:            '8px',
          }}
        >
          <p
            style={{
              fontFamily:    "'DM Sans', sans-serif",
              fontSize:      '12px',
              fontWeight:    300,
              color:         'rgba(255,255,255,0.18)',
              margin:        0,
              letterSpacing: '0.03em',
            }}
          >
            © {new Date().getFullYear()} Kevin Santiago Gutiérrez. Todos los derechos reservados.
          </p>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize:   '12px',
              fontWeight: 300,
              color:      'rgba(255,255,255,0.18)',
              margin:     0,
            }}
          >
            Diseñado y construido con{' '}
            <em style={{ color: DS.gold, fontStyle: 'italic' }}>precisión.</em>
          </p>
        </div>
      </footer>
    </section>
  )
}

// ── Contact form ───────────────────────────────────────────────────────────────

function ContactForm() {
  const formRef             = useRef(null)
  const [fields, setFields] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle')

  const handleChange = (e) =>
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')
    try {
      await emailjs.sendForm(EMAILJS.serviceId, EMAILJS.templateId, formRef.current, EMAILJS.publicKey)
      setStatus('success')
      setFields({ name: '', email: '', message: '' })
      setTimeout(() => setStatus('idle'), 4000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
        <Field label="Nombre"  name="name"    type="text"     value={fields.name}    onChange={handleChange} required />
        <Field label="Email"   name="email"   type="email"    value={fields.email}   onChange={handleChange} required />
      </div>
      <Field   label="Mensaje" name="message" type="textarea" value={fields.message} onChange={handleChange} required rows={6} />

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '6px' }}>
        <SubmitButton status={status} />
        {status === 'success' && (
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 300, color: DS.gold }}>
            Mensaje enviado correctamente.
          </span>
        )}
        {status === 'error' && (
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 300, color: '#e05c5c' }}>
            Error al enviar. Inténtalo de nuevo.
          </span>
        )}
      </div>
    </form>
  )
}

// ── Field ──────────────────────────────────────────────────────────────────────

function Field({ label, name, type, value, onChange, required, rows }) {
  const base = {
    width:           '100%',
    boxSizing:       'border-box',
    backgroundColor: 'rgba(0,0,0,0.35)',
    border:          `1px solid ${DS.border}`,
    borderRadius:    '8px',
    padding:         '14px 16px',
    color:           DS.textPrimary,
    fontFamily:      "'DM Sans', sans-serif",
    fontSize:        '15px',
    fontWeight:      300,
    outline:         'none',
    transition:      'border-color 250ms',
    resize:          'none',
    backdropFilter:  'blur(6px)',
  }
  const onFocus = (e) => (e.target.style.borderColor = DS.borderFocus)
  const onBlur  = (e) => (e.target.style.borderColor = DS.border)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <label
        style={{
          fontFamily:    "'DM Sans', sans-serif",
          fontSize:      '11px',
          fontWeight:    400,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color:         DS.textTertiary,
        }}
      >
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea name={name} value={value} onChange={onChange} required={required} rows={rows} onFocus={onFocus} onBlur={onBlur} style={base} />
      ) : (
        <input type={type} name={name} value={value} onChange={onChange} required={required} onFocus={onFocus} onBlur={onBlur} style={base} />
      )}
    </div>
  )
}

// ── Submit button — mismo estilo que los botones del Hero ─────────────────────

const gradientBorder = (i) =>
  `linear-gradient(rgba(10,10,10,0.85), rgba(10,10,10,0.85)) padding-box,
   linear-gradient(45deg, rgba(255,255,255,${i}) 0%, rgba(255,255,255,0.06) 40%, rgba(255,255,255,0.06) 60%, rgba(255,255,255,${i}) 100%) border-box`

function SubmitButton({ status }) {
  const ref    = useRef(null)
  const isBusy = status === 'sending'

  const onEnter = () => {
    if (isBusy || !ref.current) return
    ref.current.style.background  = gradientBorder(0.9)
    ref.current.style.color       = '#ffffff'
    ref.current.style.boxShadow   = '0 0 14px rgba(255,255,255,0.08)'
  }
  const onLeave = () => {
    if (!ref.current) return
    ref.current.style.background  = gradientBorder(0.55)
    ref.current.style.color       = 'rgba(255,255,255,0.9)'
    ref.current.style.boxShadow   = 'none'
  }

  return (
    <button
      ref={ref}
      type="submit"
      disabled={isBusy}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        display:       'inline-flex',
        alignItems:    'center',
        fontFamily:    "'DM Sans', sans-serif",
        fontSize:      '14px',
        fontWeight:    500,
        letterSpacing: '0.02em',
        padding:       '13px 30px',
        borderRadius:  '8px',
        border:        '1px solid transparent',
        background:    gradientBorder(0.55),
        color:         'rgba(255,255,255,0.9)',
        cursor:        isBusy ? 'not-allowed' : 'pointer',
        opacity:       isBusy ? 0.5 : 1,
        transition:    'background 200ms, color 200ms, box-shadow 200ms, opacity 250ms',
        boxShadow:     'none',
      }}
    >
      {isBusy ? 'Enviando…' : 'Enviar mensaje'}
    </button>
  )
}

// ── Social link ────────────────────────────────────────────────────────────────

function SocialLink({ icon: Icon, label, href }) {
  const ref = useRef(null)

  const onEnter = () => {
    if (!ref.current) return
    ref.current.style.color = '#ffffff'
    const iw = ref.current.querySelector('.iw')
    iw.style.borderColor = 'rgba(255,255,255,0.55)'
    iw.style.color       = '#ffffff'
    iw.style.background  = gradientBorder(0.55)
    iw.style.border      = '1px solid transparent'
  }
  const onLeave = () => {
    if (!ref.current) return
    ref.current.style.color = DS.textSecondary
    const iw = ref.current.querySelector('.iw')
    iw.style.borderColor = DS.border
    iw.style.color       = DS.textSecondary
    iw.style.background  = 'none'
    iw.style.border      = `1px solid ${DS.border}`
  }

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        display:        'flex',
        alignItems:     'center',
        gap:            '16px',
        textDecoration: 'none',
        color:          DS.textSecondary,
        transition:     'color 250ms',
      }}
    >
      <span
        className="iw"
        style={{
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          width:          '40px',
          height:         '40px',
          borderRadius:   '50%',
          border:         `1px solid ${DS.border}`,
          color:          DS.textSecondary,
          flexShrink:     0,
          transition:     'border-color 250ms, color 250ms',
          backdropFilter: 'blur(4px)',
        }}
      >
        <Icon size={16} />
      </span>
      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 300 }}>
        {label}
      </span>
    </a>
  )
}

// ── Footer helpers ─────────────────────────────────────────────────────────────

function FooterLink({ href, children }) {
  const ref = useRef(null)
  return (
    <a
      ref={ref}
      href={href}
      onMouseEnter={() => { if (ref.current) ref.current.style.color = '#ffffff' }}
      onMouseLeave={() => { if (ref.current) ref.current.style.color = 'rgba(255,255,255,0.28)' }}
      style={{
        fontFamily:     "'DM Sans', sans-serif",
        fontSize:       '13px',
        fontWeight:     300,
        color:          'rgba(255,255,255,0.28)',
        textDecoration: 'none',
        letterSpacing:  '0.03em',
        transition:     'color 250ms',
      }}
    >
      {children}
    </a>
  )
}

function IconLink({ href, icon: Icon, label }) {
  const ref = useRef(null)
  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onMouseEnter={() => { if (ref.current) ref.current.style.color = '#ffffff' }}
      onMouseLeave={() => { if (ref.current) ref.current.style.color = 'rgba(255,255,255,0.28)' }}
      style={{
        color:      'rgba(255,255,255,0.28)',
        transition: 'color 250ms',
        display:    'flex',
        alignItems: 'center',
      }}
    >
      <Icon size={16} />
    </a>
  )
}
