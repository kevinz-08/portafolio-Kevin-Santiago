import { useEffect, useRef } from 'react'

const DS = {
  bg:            '#0a0a0a',
  surface:       '#111111',
  border:        '#2a2a2a',
  textPrimary:   '#f0f0f0',
  textSecondary: '#a0a0a0',
  textTertiary:  '#505050',
  gold:          '#d4a843',
}

const ITEMS = [
  {
    id: 1, index: '01', type: 'Universidad',
    institution: 'Unidades Tecnológicas de Santander',
    degree: 'Ingeniería de Sistemas',
    period: '2026 — Actualmente', status: 'En curso', active: true,
  },
  {
    id: 2, index: '02', type: 'Curso',
    institution: 'Harvard CS50',
    degree: 'CS50s Web Programming with Python and JavaScript',
    period: '2026', status: 'En curso', active: true,
  },
  {
    id: 3, index: '03', type: 'Bootcamp',
    institution: 'Campuslands',
    degree: 'Formación en Desarrollo de Software',
    period: '2024 — 2025', status: 'Completado', active: false,
  },
  {
    id: 4, index: '04', type: 'Centro de Formación',
    institution: 'Servicio Nacional de Aprendizaje',
    degree: 'Técnico en Programación de Software',
    period: '2023 — 2024', status: 'Completado', active: false,
  },
]

let _injected = false
function injectKeyframes() {
  if (_injected || typeof document === 'undefined') return
  _injected = true
  const s = document.createElement('style')
  s.textContent = `
    @keyframes fm-badge-pulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(212,168,67,0.5); }
      60%       { box-shadow: 0 0 0 8px rgba(212,168,67,0); }
    }
  `
  document.head.appendChild(s)
}

function scrambleText(el, finalValue, duration = 500) {
  const chars = '0123456789'
  const start = performance.now()
  const tick = (now) => {
    const t = Math.min((now - start) / duration, 1)
    if (t < 1) {
      el.textContent = chars[Math.floor(Math.random() * 10)] + chars[Math.floor(Math.random() * 10)]
      requestAnimationFrame(tick)
    } else {
      el.textContent = finalValue
    }
  }
  requestAnimationFrame(tick)
}

export default function Formacion() {
  const sectionRef = useRef(null)
  const line1Ref   = useRef(null)
  const line2Ref   = useRef(null)
  const rowRefs    = useRef([])
  const borderRefs = useRef([])
  const indexRefs  = useRef([])

  useEffect(() => {
    injectKeyframes()

    const headerObs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      if (line1Ref.current) line1Ref.current.style.transform = 'translateY(0)'
      setTimeout(() => {
        if (line2Ref.current) line2Ref.current.style.transform = 'translateY(0)'
      }, 90)
      headerObs.disconnect()
    }, { threshold: 0.15 })
    if (sectionRef.current) headerObs.observe(sectionRef.current)

    rowRefs.current.forEach((row, i) => {
      if (!row) return
      row.style.opacity   = '0'
      row.style.transform = 'translateX(-20px)'
      row.style.transition = `opacity 700ms cubic-bezier(0.16,1,0.3,1) ${i * 65}ms, transform 700ms cubic-bezier(0.16,1,0.3,1) ${i * 65}ms`

      const obs = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return
        const border = borderRefs.current[i]
        if (border) setTimeout(() => { border.style.transform = 'scaleX(1)' }, i * 55)
        setTimeout(() => {
          row.style.opacity   = '1'
          row.style.transform = 'translateX(0)'
        }, i * 65 + 50)
        const idx = indexRefs.current[i]
        if (idx) setTimeout(() => scrambleText(idx, ITEMS[i].index, 480), i * 65 + 150)
        obs.disconnect()
      }, { threshold: 0.04 })
      obs.observe(row)
    })

    return () => headerObs.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="formacion" style={{ backgroundColor: DS.bg, padding: '96px 24px 0' }}>
      <h2 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 'clamp(36px, 9vw, 60px)',
        fontWeight: 300,
        lineHeight: 1.1,
        letterSpacing: '-0.02em',
        color: DS.textPrimary,
        margin: '0 0 48px',
      }}>
        <div style={{ overflow: 'hidden', paddingBottom: '0.06em' }}>
          <span ref={line1Ref} style={{ display: 'block', transform: 'translateY(110%)', transition: 'transform 950ms cubic-bezier(0.16,1,0.3,1)' }}>
            Mi formación
          </span>
        </div>
        <div style={{ overflow: 'hidden', paddingBottom: '0.06em' }}>
          <em ref={line2Ref} style={{ display: 'block', fontStyle: 'italic', transform: 'translateY(110%)', transition: 'transform 950ms cubic-bezier(0.16,1,0.3,1) 90ms' }}>
            académica.
          </em>
        </div>
      </h2>

      <div>
        {ITEMS.map((item, i) => (
          <div key={item.id} style={{ position: 'relative' }}>
            <div
              ref={(el) => { borderRefs.current[i] = el }}
              style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                backgroundColor: DS.border, transform: 'scaleX(0)', transformOrigin: 'left',
                transition: `transform 750ms cubic-bezier(0.16,1,0.3,1) ${i * 55}ms`,
              }}
            />
            <div
              ref={(el) => { rowRefs.current[i] = el }}
              style={{ display: 'flex', gap: '14px', padding: '20px 0', alignItems: 'flex-start' }}
            >
              <span
                ref={(el) => { indexRefs.current[i] = el }}
                style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 400,
                  color: DS.textTertiary, letterSpacing: '0.1em', width: '24px', flexShrink: 0,
                  fontVariantNumeric: 'tabular-nums', paddingTop: '2px',
                }}
              >
                {item.index}
              </span>

              <div style={{ flex: 1, minWidth: 0 }}>
                <span style={{
                  display: 'inline-block',
                  fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 400,
                  letterSpacing: '0.2em', textTransform: 'uppercase', color: DS.textSecondary,
                  border: `1px solid ${DS.border}`, padding: '3px 10px', borderRadius: '999px',
                  marginBottom: '10px',
                }}>
                  {item.type}
                </span>

                <p style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: '18px', fontWeight: 300,
                  color: DS.textPrimary, margin: '0 0 4px', lineHeight: 1.25,
                }}>
                  {item.degree}
                </p>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 300,
                  color: DS.textSecondary, margin: '0 0 10px',
                }}>
                  {item.institution}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', fontWeight: 300, color: DS.textTertiary }}>
                    {item.period}
                  </span>
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 400,
                    letterSpacing: '0.15em', textTransform: 'uppercase',
                    color: item.active ? DS.gold : DS.textTertiary,
                    border: `1px solid ${item.active ? 'rgba(212,168,67,0.45)' : DS.border}`,
                    padding: '3px 10px', borderRadius: '999px',
                    backgroundColor: item.active ? 'rgba(212,168,67,0.07)' : 'transparent',
                    animation: item.active ? 'fm-badge-pulse 2.8s ease-in-out infinite' : 'none',
                  }}>
                    {item.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div style={{ height: '1px', backgroundColor: DS.border }} />
      </div>
    </section>
  )
}
