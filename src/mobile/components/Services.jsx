import { useState, useEffect, useRef } from 'react'
import {
  SiHtml5, SiCss3, SiJavascript, SiBootstrap,
} from 'react-icons/si'
import { FiExternalLink, FiGithub } from 'react-icons/fi'

const DS = {
  bg:            '#0a0a0a',
  surface:       '#111111',
  surfaceAlt:    '#171717',
  border:        '#2a2a2a',
  borderLight:   '#3a3a3a',
  textPrimary:   '#f0f0f0',
  textSecondary: '#a0a0a0',
  textTertiary:  '#505050',
}

const PROJECTS = [
  {
    name: 'E-Commerce de Ropa',
    description: 'Tienda de ropa online con catálogo de productos, carrito de compras y diseño propio. Construida desde cero con atención a la experiencia de usuario y consistencia visual.',
    quote: '"Mi primer proyecto completo. Cada decisión de diseño fue intencional, cada línea de código fue un aprendizaje."',
    stack: [
      { name: 'HTML',      Icon: SiHtml5,      color: '#E34F26' },
      { name: 'CSS',       Icon: SiCss3,       color: '#1572B6' },
      { name: 'JS',        Icon: SiJavascript, color: '#F7DF1E' },
      { name: 'Bootstrap', Icon: SiBootstrap,  color: '#7952B3' },
    ],
    liveUrl: 'https://kevinz-08.github.io/app_de_ecommerce_de_ropa/',
    repoUrl: 'https://github.com/kevinz-08/app_de_ecommerce_de_ropa',
    accent:  '#6366f1',
  },
  {
    name: 'Formula 1 Website',
    description: 'Recreación de la página principal de Formula 1 con pantalla de login y navegación temática. Enfocado en fidelidad visual y detalles de marca.',
    quote: '"Replicar un diseño real me enseñó más sobre CSS y atención al detalle que cualquier tutorial."',
    stack: [
      { name: 'HTML', Icon: SiHtml5,      color: '#E34F26' },
      { name: 'CSS',  Icon: SiCss3,       color: '#1572B6' },
      { name: 'JS',   Icon: SiJavascript, color: '#F7DF1E' },
    ],
    liveUrl: 'https://jdmeneses27.github.io/formula1/login.html',
    repoUrl: 'https://github.com/JDMeneses27/formula1',
    accent:  '#ef4444',
  },
  {
    name: 'Prototipo Inclusivo',
    description: 'Aplicación web con juego interactivo diseñado para personas con dificultades visuales. La accesibilidad como centro de cada decisión de desarrollo.',
    quote: '"Diseñar para todos me cambió la perspectiva. La accesibilidad no es opcional, es responsabilidad."',
    stack: [
      { name: 'HTML', Icon: SiHtml5,      color: '#E34F26' },
      { name: 'CSS',  Icon: SiCss3,       color: '#1572B6' },
      { name: 'JS',   Icon: SiJavascript, color: '#F7DF1E' },
    ],
    liveUrl: 'https://kevinz-08.github.io/prototipo-interactivo-de-pagina-web-para-personas-con-dificultades-visuales/views/black-home.html',
    repoUrl: 'https://github.com/kevinz-08/prototipo-interactivo-de-pagina-web-para-personas-con-dificultades-visuales',
    accent:  '#10b981',
  },
]

export default function Services() {
  const [active,    setActive]    = useState(0)
  const [animating, setAnimating] = useState(false)
  const timerRef   = useRef(null)
  const sectionRef = useRef(null)
  const line1Ref   = useRef(null)
  const line2Ref   = useRef(null)
  const cardRef    = useRef(null)
  const bottomRef  = useRef(null)

  useEffect(() => {
    timerRef.current = setInterval(() => setActive(p => (p + 1) % PROJECTS.length), 4000)
    return () => clearInterval(timerRef.current)
  }, [])

  const goTo = (i) => {
    if (animating || i === active) return
    clearInterval(timerRef.current)
    setAnimating(true)
    setActive(i)
    setTimeout(() => setAnimating(false), 500)
    timerRef.current = setInterval(() => setActive(p => (p + 1) % PROJECTS.length), 4000)
  }

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      if (line1Ref.current) line1Ref.current.style.transform = 'translateY(0)'
      setTimeout(() => { if (line2Ref.current) line2Ref.current.style.transform = 'translateY(0)' }, 90)
      setTimeout(() => { if (cardRef.current)   { cardRef.current.style.opacity = '1';   cardRef.current.style.transform = 'translateY(0)' } }, 250)
      setTimeout(() => { if (bottomRef.current) { bottomRef.current.style.opacity = '1'; bottomRef.current.style.transform = 'translateY(0)' } }, 450)
      obs.disconnect()
    }, { threshold: 0.1 })
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="proyectos" style={{ backgroundColor: DS.bg, padding: '96px 24px 0' }}>
      {/* Headline — curtain reveal */}
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(36px, 9vw, 64px)', fontWeight: 300, lineHeight: 1.0, letterSpacing: '-0.02em', color: DS.textPrimary, margin: '0 0 48px' }}>
        <div style={{ overflow: 'hidden', paddingBottom: '0.06em' }}>
          <span ref={line1Ref} style={{ display: 'block', transform: 'translateY(110%)', transition: 'transform 950ms cubic-bezier(0.16,1,0.3,1)' }}>
            Lo que he
          </span>
        </div>
        <div style={{ overflow: 'hidden', paddingBottom: '0.06em' }}>
          <em ref={line2Ref} style={{ display: 'block', fontStyle: 'italic', transform: 'translateY(110%)', transition: 'transform 950ms cubic-bezier(0.16,1,0.3,1) 90ms' }}>
            construido.
          </em>
        </div>
      </h2>

      {/* Card */}
      <div ref={cardRef} style={{ opacity: 0, transform: 'translateY(28px)', transition: 'opacity 700ms cubic-bezier(0.16,1,0.3,1), transform 700ms cubic-bezier(0.16,1,0.3,1)', marginBottom: '32px' }}>
        <div style={{ backgroundColor: DS.surface, border: `1px solid ${DS.border}`, borderRadius: '16px', overflow: 'hidden' }}>
          {/* Browser chrome */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', borderBottom: `1px solid ${DS.border}` }}>
            <div style={{ display: 'flex', gap: '5px' }}>
              {['#ff5f57','#febc2e','#28c840'].map((c, i) => (
                <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: c, opacity: 0.75 }} />
              ))}
            </div>
            <div style={{ display: 'flex', gap: '4px' }}>
              {[0,1,2].map(i => <div key={i} style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: DS.textTertiary }} />)}
            </div>
          </div>

          {/* Content */}
          <div style={{ padding: '28px 24px' }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(22px, 6vw, 32px)', fontWeight: 300, lineHeight: 1.1, color: DS.textPrimary, margin: '0 0 14px' }}>
              {PROJECTS[active].name}
            </h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 300, lineHeight: 1.75, color: DS.textSecondary, margin: '0 0 24px' }}>
              {PROJECTS[active].description}
            </p>

            {/* Stack */}
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase', color: DS.textTertiary, margin: '0 0 12px' }}>
              Stack utilizado
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
              {PROJECTS[active].stack.map(({ name, Icon, color }) => (
                <StackChip key={name} name={name} Icon={Icon} color={color} />
              ))}
            </div>
            <div style={{ height: '3px', borderRadius: '999px', backgroundColor: PROJECTS[active].accent, marginBottom: '24px', opacity: 0.6 }} />

            {/* Links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { href: PROJECTS[active].repoUrl, icon: FiGithub,      label: 'Ver Repositorio' },
                { href: PROJECTS[active].liveUrl, icon: FiExternalLink, label: 'Ver Proyecto'   },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 16px', backgroundColor: DS.surfaceAlt, border: `1px solid ${DS.border}`, borderRadius: '10px', textDecoration: 'none', color: DS.textSecondary, fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 400, transition: 'border-color 250ms, color 250ms' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = DS.borderLight; e.currentTarget.style.color = DS.textPrimary }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = DS.border;      e.currentTarget.style.color = DS.textSecondary }}
                >
                  <Icon size={15} style={{ flexShrink: 0 }} />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quote + dots */}
      <div ref={bottomRef} style={{ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 600ms cubic-bezier(0.16,1,0.3,1), transform 600ms cubic-bezier(0.16,1,0.3,1)' }}>
        <div style={{ minHeight: '72px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', marginBottom: '28px', padding: '0 8px' }}>
          {PROJECTS.map((p, i) => (
            <p
              key={p.name}
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(15px, 4vw, 20px)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.5, color: DS.textSecondary, margin: 0, position: 'absolute', textAlign: 'center', opacity: i === active ? 1 : 0, transform: i === active ? 'translateY(0)' : 'translateY(8px)', transition: 'opacity 0.5s, transform 0.5s' }}
            >
              {p.quote}
            </p>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
          {PROJECTS.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} style={{ width: i === active ? '24px' : '8px', height: '8px', borderRadius: '999px', backgroundColor: i === active ? DS.textPrimary : DS.border, border: 'none', cursor: 'pointer', padding: 0, transition: 'width 0.35s cubic-bezier(0.16,1,0.3,1), background-color 0.35s' }} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StackChip({ name, Icon, color }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', border: `1px solid ${hovered ? DS.borderLight : DS.border}`, borderRadius: '6px', background: hovered ? '#1e1e1e' : 'transparent', transition: 'border-color 200ms, background 200ms', cursor: 'default' }}
    >
      <Icon size={14} style={{ color: hovered ? color : DS.textTertiary, transition: 'color 200ms', flexShrink: 0 }} />
      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 400, color: hovered ? DS.textSecondary : DS.textTertiary, transition: 'color 200ms', whiteSpace: 'nowrap' }}>
        {name}
      </span>
    </div>
  )
}
