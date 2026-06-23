import { useState, useEffect, useRef } from 'react'
import globantLogo from '../../img/globantCompany-logo.webp'
import brainsolImage from '../../img/brainsol-image.png'
import ecommerceImage from '../../img/e-commerce-image.png'

const DS = {
  bg:            '#0a0a0a',
  border:        '#2a2a2a',
  textPrimary:   '#f0f0f0',
  textSecondary: '#a0a0a0',
  textTertiary:  '#505050',
}

const ITEMS = [
  { id: 1, type: 'Empresa',   name: 'Globant',          role: 'Frontend Developer',          period: '2024 – 2026', bgColor: '#2e2e2e', bgImage: globantLogo,
    description: 'Gestión integral de proyectos de software: desde el análisis y levantamiento de requerimientos hasta el desarrollo, pruebas de calidad y soporte técnico especializado, siempre alineado con las necesidades operativas de la empresa.' },
  { id: 2, type: 'Freelance', name: 'E-Commerce Store', role: 'React · Node.js · Tailwind',  period: '2026',            bgColor: '#262626', bgImage: ecommerceImage,
    description: 'E-commerce especializado en la comercialización de productos, diseñado con una interfaz funcional para la gestión eficiente de catálogos y transacciones. La plataforma integra herramientas de automatización para optimizar la experiencia de compra y el procesamiento de pedidos, facilitando la operatividad comercial para sus usuarios.' },
  { id: 3, type: 'Freelance', name: 'Brain Solutions',  role: 'Next.js · Framer Motion',     period: '2026',            bgColor: '#333333', bgImage: brainsolImage,
    link: 'https://brainsol.vercel.app/',
    description: 'Consultoría de software escalable: análisis, arquitectura, desarrollo y despliegue de soluciones digitales a medida.' },
]

export default function Experiencia() {
  const sectionRef = useRef(null)
  const line1Ref   = useRef(null)
  const line2Ref   = useRef(null)
  const cardRefs   = useRef([])

  useEffect(() => {
    cardRefs.current.forEach((el, i) => {
      if (!el) return
      el.style.opacity   = '0'
      el.style.transform = 'translateY(28px)'
      el.style.transition = `opacity 650ms cubic-bezier(0.16,1,0.3,1) ${i * 80}ms, transform 650ms cubic-bezier(0.16,1,0.3,1) ${i * 80}ms`
    })

    const obs = new IntersectionObserver(([entry]) => {
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
        }, 250 + i * 80)
      })
      obs.disconnect()
    }, { threshold: 0.1 })
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="experiencia" style={{ backgroundColor: DS.bg, padding: '96px 24px 0' }}>
      {/* Headline — curtain reveal */}
      <h2 style={{
        fontFamily:    "'Cormorant Garamond', serif",
        fontSize:      'clamp(36px, 9vw, 60px)',
        fontWeight:    300,
        lineHeight:    1.1,
        letterSpacing: '-0.02em',
        color:         DS.textPrimary,
        margin:        '0 0 48px',
      }}>
        <div style={{ overflow: 'hidden', paddingBottom: '0.06em' }}>
          <span ref={line1Ref} style={{ display: 'block', transform: 'translateY(110%)', transition: 'transform 950ms cubic-bezier(0.16,1,0.3,1)' }}>
            Empresas y proyectos
          </span>
        </div>
        <div style={{ overflow: 'hidden', paddingBottom: '0.06em' }}>
          <em ref={line2Ref} style={{ display: 'block', fontStyle: 'italic', transform: 'translateY(110%)', transition: 'transform 950ms cubic-bezier(0.16,1,0.3,1) 90ms' }}>
            que me formaron.
          </em>
        </div>
      </h2>

      {/* Cards — vertical stack */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {ITEMS.map((item, i) => (
          <div key={item.id} ref={(el) => { cardRefs.current[i] = el }}>
            <ExperienceCard item={item} />
          </div>
        ))}
      </div>
    </section>
  )
}

function ExperienceCard({ item }) {
  const [open,    setOpen]    = useState(false)
  const bgRef  = useRef(null)
  const btnRef = useRef(null)

  const onEnter = () => {
    if (bgRef.current) {
      bgRef.current.style.filter    = 'grayscale(0) brightness(0.85)'
      bgRef.current.style.transform = 'scale(1.05)'
    }
  }
  const onLeave = () => {
    if (bgRef.current) {
      bgRef.current.style.filter    = 'grayscale(1) brightness(0.55)'
      bgRef.current.style.transform = 'scale(1)'
    }
  }

  return (
    <div onMouseEnter={onEnter} onMouseLeave={onLeave} style={{ position: 'relative', width: '100%', height: '200px', borderRadius: '12px', overflow: 'hidden', cursor: 'default' }}>
      {/* Background */}
      <div
        ref={bgRef}
        style={{
          position:         'absolute',
          inset:            0,
          backgroundColor:  item.bgColor,
          ...(item.bgImage && { backgroundImage: `url(${item.bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }),
          filter:           'grayscale(1) brightness(0.55)',
          transform:        'scale(1)',
          transition:       'filter 0.55s cubic-bezier(0.16,1,0.3,1), transform 0.55s cubic-bezier(0.16,1,0.3,1)',
        }}
      />

      {/* Gradient overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.75) 100%)', zIndex: 1 }} />

      {/* Type tag */}
      <span style={{
        position: 'absolute', top: '12px', left: '12px', zIndex: 2,
        fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 400, letterSpacing: '0.25em', textTransform: 'uppercase',
        color: '#f0f0f0', border: '1px solid rgba(240,240,240,0.35)', padding: '3px 10px', borderRadius: '999px', backgroundColor: 'rgba(0,0,0,0.3)',
      }}>
        {item.type}
      </span>

      {/* Bottom content */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 2, padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', fontWeight: 300, color: '#ffffff', margin: '0 0 4px', lineHeight: 1.15 }}>{item.name}</h3>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', fontWeight: 300, color: 'rgba(255,255,255,0.65)', margin: 0 }}>{item.role} · {item.period}</p>
        </div>

        <button
          ref={btnRef}
          onClick={() => setOpen(o => !o)}
          style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: '12px', fontWeight: 400, color: '#ffffff',
            backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.35)',
            borderRadius: '999px', padding: '8px 16px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
            transition: 'background-color 250ms, color 250ms',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#ffffff'; e.currentTarget.style.color = '#0a0a0a' }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#ffffff' }}
        >
          {open ? 'Cerrar' : 'Qué desarrollé'}
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <path d={open ? 'M10 2L2 10M2 2H8M2 2V8' : 'M2 10L10 2M10 2H4M10 2V8'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Expanded info overlay */}
      {open && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 10, backgroundColor: 'rgba(10,10,10,0.92)', backdropFilter: 'blur(8px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center' }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', fontWeight: 300, lineHeight: 1.7, color: 'rgba(255,255,255,0.7)', margin: '0 0 16px' }}>
            {item.description}
          </p>
          {item.link && (
            <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 400, color: '#ffffff', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.35)', borderRadius: '999px', padding: '8px 16px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              Visitar sitio
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          )}
        </div>
      )}
    </div>
  )
}
