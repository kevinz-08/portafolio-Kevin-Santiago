import { useEffect, useRef } from 'react'
import cvPdf from '../../img/Kevin Gutierrez - HV.pdf'
import SmokeShader from './SmokeShader'

export default function Hero({ introComplete = false }) {
  const contentRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      const el = contentRef.current
      if (!el) return
      const y = window.scrollY
      // Content drifts up at 0.28× scroll speed and fades out
      const opacity = Math.max(0, 1 - y / (window.innerHeight * 0.65))
      el.style.transform = `translateY(${-y * 0.28}px)`
      el.style.opacity   = opacity
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      id="home"
      style={{
        height: '100vh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: '#0a0a0a',
      }}
    >
      <SmokeShader />

      {/* Bottom fade — dissolves hero into the next section */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '260px',
        background: 'linear-gradient(to bottom, transparent 0%, #0a0a0a 100%)',
        pointerEvents: 'none',
        zIndex: 2,
      }} />

      <div
        ref={contentRef}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          maxWidth: '980px',
          padding: '0 48px',
          position: 'relative',
          zIndex: 1,
          willChange: 'transform, opacity',
        }}>
        <Badge>Desarrollador de Software</Badge>

        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(40px, 5.5vw, 78px)',
          fontWeight: 500,
          lineHeight: 1.0,
          color: '#ffffff',
          margin: '0 0 44px',
          letterSpacing: '-0.01em',
        }}>
          <BlurText text={"Transformo ideas en sistemas\nque funcionan"} active={introComplete} />
        </h1>

        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '15px',
          fontWeight: 300,
          lineHeight: 1.7,
          color: 'rgba(255,255,255,0.55)',
          maxWidth: '640px',
          margin: '0 0 20px',
          opacity: 0,
          animation: introComplete ? 'blurIn 0.8s ease forwards' : 'none',
          animationDelay: introComplete ? '1.4s' : '0s',
        }}>
          Construyo productos digitales sólidos, escalables y con buena experiencia de usuario,
          del backend al frontend, hago que las ideas cobren vida.
        </p>

        <div style={{
          display: 'flex',
          gap: '14px',
          alignItems: 'center',
          opacity: 0,
          animation: introComplete ? 'fadeSlideUp 0.6s ease forwards' : 'none',
          animationDelay: introComplete ? '2.0s' : '0s',
        }}>
          <HeroButton href="mailto:kevingadev@gmail.com?subject=Consulta desde el portafolio">
            Trabajemos juntos
          </HeroButton>
          <HeroButton href={cvPdf} download>Descargar CV</HeroButton>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  )
}

function Badge({ children }) {
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      background: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '999px',
      padding: '7px 18px',
      marginBottom: '36px',
    }}>
      <span style={{
        width: 6,
        height: 6,
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.8)',
        display: 'inline-block',
        flexShrink: 0,
      }} />
      <span style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '12px',
        letterSpacing: '0.05em',
        color: 'rgba(255,255,255,0.55)',
      }}>
        {children}
      </span>
    </div>
  )
}

function HeroButton({ href, children, download }) {
  const gradientBorder = (intensity) =>
    `linear-gradient(rgba(10,10,10,0.85), rgba(10,10,10,0.85)) padding-box,
     linear-gradient(45deg, rgba(255,255,255,${intensity}) 0%, rgba(255,255,255,0.06) 40%, rgba(255,255,255,0.06) 60%, rgba(255,255,255,${intensity}) 100%) border-box`

  const handleEnter = (e) => {
    e.currentTarget.style.background = gradientBorder(0.9)
    e.currentTarget.style.color = '#ffffff'
    e.currentTarget.style.boxShadow = '0 0 14px rgba(255,255,255,0.08)'
  }
  const handleLeave = (e) => {
    e.currentTarget.style.background = gradientBorder(0.55)
    e.currentTarget.style.color = 'rgba(255,255,255,0.9)'
    e.currentTarget.style.boxShadow = 'none'
  }

  return (
    <a
      href={href}
      download={download || undefined}
      style={{
        display: 'inline-block',
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '14px',
        fontWeight: 500,
        padding: '13px 30px',
        borderRadius: '8px',
        textDecoration: 'none',
        transition: 'background 200ms, color 200ms, box-shadow 200ms',
        letterSpacing: '0.02em',
        cursor: 'pointer',
        color: 'rgba(255,255,255,0.9)',
        border: '1px solid transparent',
        background: gradientBorder(0.55),
        boxShadow: 'none',
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {children}
    </a>
  )
}


function BlurText({ text, active = false }) {
  const CHAR_DURATION = 0.55
  const CHAR_STAGGER  = 0.035

  const nodes = []
  let charIndex = 0

  text.split('').forEach((ch, i) => {
    if (ch === '\n') {
      nodes.push(<br key={`br${i}`} />)
      return
    }
    const delay = charIndex * CHAR_STAGGER
    charIndex++
    nodes.push(
      <span
        key={i}
        style={{
          display: 'inline-block',
          opacity: 0,
          animation: active ? `blurIn ${CHAR_DURATION}s ease forwards` : 'none',
          animationDelay: active ? `${delay}s` : '0s',
          whiteSpace: ch === ' ' ? 'pre' : undefined,
        }}
      >
        {ch === ' ' ? ' ' : ch}
      </span>
    )
  })

  return <>{nodes}</>
}

function ScrollIndicator() {
  return (
    <div style={{
      position: 'absolute',
      bottom: '40px',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      whiteSpace: 'nowrap',
    }}>
      <span style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '11px',
        letterSpacing: '0.1em',
        color: 'rgba(255,255,255,0.3)',
      }}>
        Scroll down
      </span>

      <div style={{
        width: '110px',
        height: '1px',
        background: 'rgba(255,255,255,0.15)',
      }} />

      {/* Mouse icon */}
      <div style={{
        width: '20px',
        height: '32px',
        borderRadius: '10px',
        border: '1px solid rgba(255,255,255,0.28)',
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '5px',
        flexShrink: 0,
      }}>
        <div style={{
          width: '2px',
          height: '6px',
          borderRadius: '1px',
          background: 'rgba(255,255,255,0.55)',
          animation: 'scrollBob 1.5s ease-in-out infinite',
        }} />
      </div>

      <div style={{
        width: '110px',
        height: '1px',
        background: 'rgba(255,255,255,0.15)',
      }} />

      <span style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '11px',
        letterSpacing: '0.1em',
        color: 'rgba(255,255,255,0.3)',
      }}>
        to see projects
      </span>
    </div>
  )
}
