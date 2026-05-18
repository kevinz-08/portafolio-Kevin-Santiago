import { useEffect, useRef } from 'react'
import SmokeShader from '../../desktop/components/SmokeShader'

const gradientBorder = (i) =>
  `linear-gradient(rgba(10,10,10,0.85), rgba(10,10,10,0.85)) padding-box,
   linear-gradient(45deg, rgba(255,255,255,${i}) 0%, rgba(255,255,255,0.06) 40%, rgba(255,255,255,0.06) 60%, rgba(255,255,255,${i}) 100%) border-box`

export default function Hero() {
  const contentRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      const el = contentRef.current
      if (!el) return
      const y       = window.scrollY
      const opacity = Math.max(0, 1 - y / (window.innerHeight * 0.65))
      el.style.opacity   = opacity
      el.style.transform = `translateY(${-y * 0.18}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      id="home"
      style={{
        height:          '100vh',
        position:        'relative',
        display:         'flex',
        flexDirection:   'column',
        alignItems:      'center',
        justifyContent:  'center',
        overflow:        'hidden',
        backgroundColor: '#0a0a0a',
      }}
    >
      <SmokeShader />

      {/* Bottom fade — dissolves into next section */}
      <div style={{
        position:      'absolute',
        bottom:        0,
        left:          0,
        right:         0,
        height:        '180px',
        background:    'linear-gradient(to bottom, transparent 0%, #0a0a0a 100%)',
        pointerEvents: 'none',
        zIndex:        2,
      }} />

      {/* Content */}
      <div
        ref={contentRef}
        style={{
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          textAlign:      'center',
          padding:        '0 24px',
          position:       'relative',
          zIndex:         1,
          willChange:     'transform, opacity',
        }}
      >
        {/* Badge eyebrow */}
        <div style={{
          display:       'inline-flex',
          alignItems:    'center',
          gap:           '8px',
          background:    'rgba(255,255,255,0.05)',
          border:        '1px solid rgba(255,255,255,0.1)',
          borderRadius:  '999px',
          padding:       '7px 18px',
          marginBottom:  '28px',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.8)', flexShrink: 0 }} />
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', letterSpacing: '0.05em', color: 'rgba(255,255,255,0.55)' }}>
            Desarrollador de Software
          </span>
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily:    "'Cormorant Garamond', serif",
          fontSize:      'clamp(36px, 9vw, 60px)',
          fontWeight:    300,
          lineHeight:    1.05,
          color:         '#ffffff',
          margin:        '0 0 24px',
          letterSpacing: '-0.02em',
        }}>
          Transformo ideas en<br />
          sistemas que funcionan.
        </h1>

        {/* Description */}
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize:   '14px',
          fontWeight: 300,
          lineHeight: 1.7,
          color:      'rgba(255,255,255,0.55)',
          maxWidth:   '400px',
          margin:     '0 0 32px',
        }}>
          Construyo productos digitales sólidos, escalables y con buena
          experiencia de usuario, del backend al frontend.
        </p>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <HeroButton href="mailto:kevingadev@gmail.com?subject=Consulta desde el portafolio">
            Trabajemos juntos
          </HeroButton>
          <HeroButton href="#proyectos">Ver proyectos</HeroButton>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position:  'absolute',
        bottom:    '32px',
        left:      '50%',
        transform: 'translateX(-50%)',
        display:   'flex',
        alignItems:'center',
        gap:       '12px',
        zIndex:    3,
      }}>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)' }}>
          Scroll
        </span>
        <div style={{ width: '40px', height: '1px', background: 'rgba(255,255,255,0.15)' }} />
        <div style={{ width: '20px', height: '32px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.28)', display: 'flex', justifyContent: 'center', paddingTop: '5px', flexShrink: 0 }}>
          <div style={{ width: '2px', height: '6px', borderRadius: '1px', background: 'rgba(255,255,255,0.55)', animation: 'scrollBob 1.5s ease-in-out infinite' }} />
        </div>
      </div>
    </section>
  )
}

function HeroButton({ href, children }) {
  const onEnter = (e) => {
    e.currentTarget.style.background  = gradientBorder(0.9)
    e.currentTarget.style.color       = '#ffffff'
    e.currentTarget.style.boxShadow   = '0 0 14px rgba(255,255,255,0.08)'
  }
  const onLeave = (e) => {
    e.currentTarget.style.background  = gradientBorder(0.55)
    e.currentTarget.style.color       = 'rgba(255,255,255,0.9)'
    e.currentTarget.style.boxShadow   = 'none'
  }
  return (
    <a
      href={href}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        display:        'inline-block',
        fontFamily:     "'DM Sans', sans-serif",
        fontSize:       '14px',
        fontWeight:     500,
        padding:        '13px 26px',
        borderRadius:   '8px',
        textDecoration: 'none',
        transition:     'background 200ms, color 200ms, box-shadow 200ms',
        letterSpacing:  '0.02em',
        color:          'rgba(255,255,255,0.9)',
        border:         '1px solid transparent',
        background:     gradientBorder(0.55),
        boxShadow:      'none',
        cursor:         'pointer',
      }}
    >
      {children}
    </a>
  )
}
