import { useEffect, useRef } from 'react'

const DS = {
  bg: '#0a0a0a',
  border: '#2a2a2a',
  textPrimary: '#f0f0f0',
  textSecondary: '#a0a0a0',
  textTertiary: '#606060',
  gold: '#d4a843',
}

const STEPS = [
  {
    number: '01',
    title: 'Escuchar',
    description: 'Entiendo el problema antes de escribir una sola línea de código.',
  },
  {
    number: '02',
    title: 'Planear',
    description: 'Defino la arquitectura, el flujo de datos y los límites del sistema.',
  },
  {
    number: '03',
    title: 'Construir',
    description: 'Desarrollo iterativamente, con código limpio y componentes reutilizables.',
  },
  {
    number: '04',
    title: 'Refinar',
    description: 'Pruebo, ajusto y entrego algo que realmente funciona.',
  },
]

export default function ComoTrabajo() {
  const headlineRef = useRef(null)
  const stepRefs    = useRef([])

  useEffect(() => {
    const targets = [headlineRef.current, ...stepRefs.current].filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity   = '1'
            entry.target.style.transform = 'translateY(0)'
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )

    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="como-trabajo"
      style={{
        backgroundColor: DS.bg,
        padding: 'clamp(80px, 10vw, 180px) clamp(40px, 7vw, 130px)',
      }}
    >
      {/* Gold divider */}
      <div style={{
        width: '48px',
        height: '1px',
        backgroundColor: DS.gold,
        marginBottom: '48px',
      }} />

      {/* Section label */}
      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '11px',
        fontWeight: 400,
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        color: DS.textTertiary,
        margin: '0 0 48px',
      }}>
        04 — Cómo trabajo
      </p>

      {/* Headline */}
      <h2
        ref={headlineRef}
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(40px, 5vw, 64px)',
          fontWeight: 300,
          lineHeight: 1.1,
          color: DS.textPrimary,
          margin: '0 0 96px',
          maxWidth: '640px',
          opacity: 0,
          transform: 'translateY(40px)',
          transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        Un proceso simple.<br />
        <em style={{ fontStyle: 'italic', color: DS.gold }}>Resultados concretos.</em>
      </h2>

      {/* Steps row */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 0,
      }}>
        {STEPS.map((step, i) => (
          <>
            {/* Step */}
            <div
              key={step.number}
              ref={(el) => (stepRefs.current[i] = el)}
              style={{
                flex: 1,
                opacity: 0,
                transform: 'translateY(40px)',
                transition: `opacity 0.7s ${i * 0.15}s cubic-bezier(0.16,1,0.3,1), transform 0.7s ${i * 0.15}s cubic-bezier(0.16,1,0.3,1)`,
              }}
            >
              {/* Number */}
              <span style={{
                display: 'block',
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(48px, 5vw, 72px)',
                fontWeight: 300,
                lineHeight: 1,
                color: DS.gold,
                marginBottom: '24px',
              }}>
                {step.number}
              </span>

              {/* Title */}
              <h3 style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '18px',
                fontWeight: 500,
                color: DS.textPrimary,
                margin: '0 0 12px',
                letterSpacing: '-0.01em',
              }}>
                {step.title}
              </h3>

              {/* Description */}
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '15px',
                fontWeight: 300,
                lineHeight: 1.6,
                color: DS.textSecondary,
                margin: 0,
                maxWidth: '220px',
              }}>
                {step.description}
              </p>
            </div>

            {/* Connector line — not after the last step */}
            {i < STEPS.length - 1 && (
              <div
                key={`connector-${i}`}
                style={{
                  // Align with the vertical center of the number (~36px from top)
                  marginTop: 'clamp(24px, 2.5vw, 36px)',
                  flex: '0 0 clamp(24px, 4vw, 56px)',
                  height: '1px',
                  backgroundColor: DS.border,
                }}
              />
            )}
          </>
        ))}
      </div>
    </section>
  )
}
