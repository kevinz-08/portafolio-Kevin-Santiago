import { useState, useEffect, useRef } from 'react'
import globantLogo from '../../img/globantCompany-logo.webp'
import brainsolImage from '../../img/brainsol-image.png'
import ecommerceImage from '../../img/e-commerce-image.png'

const DS = {
  bg: '#0a0a0a',
  border: '#2a2a2a',
  textPrimary: '#f0f0f0',
  textSecondary: '#a0a0a0',
  textTertiary: '#606060',
  gold: '#d4a843',
}

const ITEMS = [
  {
    id: 1,
    type: 'Empresa',
    name: 'Globant',
    role: 'Trainee Developer',
    period: '2025 – 2026',
    bgColor: '#2e2e2e',
    bgImage: globantLogo,
    description: 'Gestión integral de proyectos de software: desde el análisis y levantamiento de requerimientos hasta el desarrollo, pruebas de calidad y soporte técnico especializado, siempre alineado con las necesidades operativas de la empresa.',
  },
  {
    id: 2,
    type: 'Freelance',
    name: 'E-Commerce Store',
    role: 'Full Stack Developer',
    period: 'Abr 2026 – Jun 2026',
    bgColor: '#262626',
    bgImage: ecommerceImage,
    description: 'E-commerce especializado en la comercialización de productos, diseñado con una interfaz funcional para la gestión eficiente de catálogos y transacciones. La plataforma integra herramientas de automatización para optimizar la experiencia de compra y el procesamiento de pedidos, facilitando la operatividad comercial para sus usuarios.',
  },
  {
    id: 3,
    type: 'Freelance',
    name: 'Brain Solutions',
    role: 'Frontend Developer',
    period: 'Abr 2026 – Jun 2026',
    bgColor: '#333333',
    bgImage: brainsolImage,
    link: 'https://brainsol.vercel.app/',
    description: 'Consultoría de software escalable: análisis, arquitectura, desarrollo y despliegue de soluciones digitales a medida.',
  },
]

export default function Experiencia() {
  const [activeModal, setActiveModal] = useState(null)
  const sectionRef = useRef(null)
  const line1Ref   = useRef(null)
  const line2Ref   = useRef(null)
  const cardRefs   = useRef([])

  useEffect(() => {
    // Inicializar cards invisibles
    cardRefs.current.forEach((el, i) => {
      if (!el) return
      el.style.opacity   = '0'
      el.style.transform = 'translateY(32px)'
      el.style.transition = `
        opacity  700ms cubic-bezier(0.16,1,0.3,1) ${i * 80}ms,
        transform 700ms cubic-bezier(0.16,1,0.3,1) ${i * 80}ms
      `
    })

    // Curtain reveal título + stagger cards
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return

        if (line1Ref.current) line1Ref.current.style.transform = 'translateY(0)'
        setTimeout(() => {
          if (line2Ref.current) line2Ref.current.style.transform = 'translateY(0)'
        }, 90)

        cardRefs.current.forEach((el, i) => {
          if (!el) return
          setTimeout(() => {
            el.style.opacity   = '1'
            el.style.transform = 'translateY(0)'
          }, 300 + i * 80)
        })

        obs.disconnect()
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)

    return () => obs.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="experiencia"
      style={{
        backgroundColor: DS.bg,
        padding: 'clamp(80px, 1vw, 180px) clamp(40px, 7vw, 130px)',
      }}
    >
      {/* Título — curtain reveal */}
      <h2 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 'clamp(40px, 5vw, 64px)',
        fontWeight: 300,
        lineHeight: 1.1,
        color: DS.textPrimary,
        margin: '0 0 64px',
        maxWidth: '640px',
      }}>
        <div style={{ overflow: 'hidden', paddingBottom: '0.06em' }}>
          <span
            ref={line1Ref}
            style={{
              display: 'block',
              transform: 'translateY(110%)',
              transition: 'transform 950ms cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            Empresas y proyectos
          </span>
        </div>
        <div style={{ overflow: 'hidden', paddingBottom: '0.06em' }}>
          <em
            ref={line2Ref}
            style={{
              display: 'block',
              fontStyle: 'italic',
              transform: 'translateY(110%)',
              transition: 'transform 950ms cubic-bezier(0.16,1,0.3,1) 90ms',
            }}
          >
            que me formaron.
          </em>
        </div>
      </h2>

      {/* Cards con stagger */}
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
        {ITEMS.map((item, i) => (
          <div key={item.id} ref={(el) => { cardRefs.current[i] = el }} style={{ flex: '1 1 0', minWidth: 0, maxWidth: '280px' }}>
            <ExperienceCard
              item={item}
              onOpenModal={() => setActiveModal(item)}
            />
          </div>
        ))}
      </div>

      {activeModal && (
        <Modal item={activeModal} onClose={() => setActiveModal(null)} />
      )}
    </section>
  )
}

// ── Experience Card ────────────────────────────────────────────────────────

function ExperienceCard({ item, onOpenModal }) {
  const bgRef  = useRef(null)
  const btnRef = useRef(null)

  const onEnter = () => {
    if (bgRef.current) {
      bgRef.current.style.filter    = 'grayscale(0) brightness(0.85)'
      bgRef.current.style.transform = 'scale(1.07)'
    }
  }
  const onLeave = () => {
    if (bgRef.current) {
      bgRef.current.style.filter    = 'grayscale(1) brightness(0.55)'
      bgRef.current.style.transform = 'scale(1)'
    }
  }

  const onBtnEnter = () => {
    if (btnRef.current) {
      btnRef.current.style.backgroundColor = '#ffffff'
      btnRef.current.style.color           = '#0a0a0a'
      btnRef.current.style.borderColor     = '#ffffff'
    }
  }
  const onBtnLeave = () => {
    if (btnRef.current) {
      btnRef.current.style.backgroundColor = 'rgba(255,255,255,0.1)'
      btnRef.current.style.color           = '#ffffff'
      btnRef.current.style.borderColor     = 'rgba(255,255,255,0.35)'
    }
  }

  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        width: '100%',
        height: 'clamp(300px, 24vw, 380px)',
        position: 'relative',
        borderRadius: '12px',
        overflow: 'hidden',
        cursor: 'default',
      }}
    >
      {/* Background */}
      <div
        ref={bgRef}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: item.bgColor,
          ...(item.bgImage && {
            backgroundImage: `url(${item.bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }),
          filter: 'grayscale(1) brightness(0.55)',
          transform: 'scale(1)',
          transition: 'filter 0.55s cubic-bezier(0.16,1,0.3,1), transform 0.55s cubic-bezier(0.16,1,0.3,1)',
        }}
      />

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.75) 100%)',
        zIndex: 1,
      }} />

      {/* Type tag */}
      <span style={{
        position: 'absolute',
        top: '14px',
        left: '14px',
        zIndex: 2,
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '10px',
        fontWeight: 400,
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        color: '#f0f0f0',
        border: '1px solid rgba(240,240,240,0.35)',
        padding: '4px 10px',
        borderRadius: '999px',
        backgroundColor: 'rgba(0,0,0,0.3)',
      }}>
        {item.type}
      </span>

      {/* Bottom content */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 2,
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}>
        <div>
          <h3 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(18px, 1.6vw, 22px)',
            fontWeight: 300,
            color: '#ffffff',
            margin: '0 0 6px',
            lineHeight: 1.15,
          }}>
            {item.name}
          </h3>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '13px',
            fontWeight: 300,
            color: 'rgba(255,255,255,0.65)',
            margin: 0,
            letterSpacing: '0.01em',
          }}>
            {item.role} · {item.period}
          </p>
        </div>

        <button
          ref={btnRef}
          onClick={onOpenModal}
          onMouseEnter={onBtnEnter}
          onMouseLeave={onBtnLeave}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '13px',
            fontWeight: 400,
            color: '#ffffff',
            backgroundColor: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.35)',
            borderRadius: '999px',
            padding: '10px 20px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            transition: 'background-color 250ms, color 250ms, border-color 250ms',
            width: '100%',
          }}
        >
          Qué desarrollé
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

// ── Modal ──────────────────────────────────────────────────────────────────

function Modal({ item, onClose }) {
  const overlayRef = useRef(null)

  const onOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose()
  }

  return (
    <div
      ref={overlayRef}
      onClick={onOverlayClick}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div style={{
        backgroundColor: '#111111',
        border: '1px solid #2a2a2a',
        borderRadius: '20px',
        width: '100%',
        maxWidth: '640px',
        padding: 'clamp(32px, 5vw, 56px)',
        position: 'relative',
      }}>
        <CloseButton onClose={onClose} />

        <span style={{
          display: 'inline-block',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '10px',
          fontWeight: 400,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: DS.textSecondary,
          border: '1px solid #2a2a2a',
          padding: '4px 12px',
          borderRadius: '999px',
          marginBottom: '24px',
        }}>
          {item.type}
        </span>

        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(28px, 4vw, 42px)',
          fontWeight: 300,
          color: DS.textPrimary,
          margin: '0 0 8px',
          lineHeight: 1.15,
        }}>
          {item.name}
        </h2>

        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '14px',
          fontWeight: 300,
          color: DS.textSecondary,
          margin: '0 0 40px',
        }}>
          {item.role} · {item.period}
        </p>

        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '14px',
          fontWeight: 300,
          lineHeight: 1.75,
          color: DS.textSecondary,
          margin: '0 0 24px',
        }}>
          {item.description}
        </p>

        {item.link && (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '13px',
              fontWeight: 400,
              color: DS.textPrimary,
              textDecoration: 'none',
              border: '1px solid #2a2a2a',
              borderRadius: '999px',
              padding: '10px 20px',
              transition: 'border-color 250ms, background-color 250ms',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#ffffff'; e.currentTarget.style.backgroundColor = '#1a1a1a' }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#2a2a2a'; e.currentTarget.style.backgroundColor = 'transparent' }}
          >
            Visitar sitio
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        )}
      </div>
    </div>
  )
}

function CloseButton({ onClose }) {
  const ref = useRef(null)
  return (
    <button
      ref={ref}
      onClick={onClose}
      onMouseEnter={() => { if (ref.current) { ref.current.style.backgroundColor = '#2a2a2a'; ref.current.style.borderColor = '#3a3a3a' } }}
      onMouseLeave={() => { if (ref.current) { ref.current.style.backgroundColor = 'transparent'; ref.current.style.borderColor = '#2a2a2a' } }}
      style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        border: '1px solid #2a2a2a',
        backgroundColor: 'transparent',
        color: DS.textSecondary,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background-color 200ms, border-color 200ms',
      }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    </button>
  )
}
