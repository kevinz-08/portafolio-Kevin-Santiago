import { useEffect, useRef } from 'react'

const DS = {
  bg: '#0a0a0a',
  surface: '#111111',
  border: '#2a2a2a',
  textPrimary: '#f0f0f0',
  textSecondary: '#a0a0a0',
  textTertiary: '#505050',
  gold: '#d4a843',
}

const ITEMS = [
  {
    id: 1,
    index: '01',
    type: 'Universidad',
    institution: 'Unidades Tecnologicas de Santander',
    degree: 'Ingeniería de Sistemas',
    period: '2026 — Actualmente',
    status: 'En curso',
    active: true,
  },
  {
    id: 2,
    index: '02',
    type: 'Curso',
    institution: 'Harvard CS50',
    degree: 'CS50s Web Programming with Python and JavaScript',
    period: '2026',
    status: 'En curso',
    active: true,
  },
  {
    id: 3,
    index: '03',
    type: 'Bootcamp',
    institution: 'Campuslands',
    degree: 'Formación en Desarrollo de Software',
    period: '2024 — 2025',
    status: 'Completado',
    active: false,
  },
  {
    id: 4,
    index: '04',
    type: 'Centro de Formación',
    institution: 'Servicio Nacional de Aprendizaje',
    degree: 'Técnico en Programación de Software',
    period: '2023-2024',
    status: 'Completado',
    active: false,
  },
]

// ── Keyframes injected once ───────────────────────────────────────────────────
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
    @keyframes fm-accent-glow {
      0%, 100% { box-shadow: 4px 0 10px rgba(212,168,67,0.2); }
      50%       { box-shadow: 4px 0 26px rgba(212,168,67,0.55); }
    }
  `
  document.head.appendChild(s)
}

// Scramble el texto de un elemento durante ~duration ms y termina en finalValue
function scrambleText(el, finalValue, duration = 500) {
  const chars = '0123456789'
  const start = performance.now()
  const tick = (now) => {
    const t = Math.min((now - start) / duration, 1)
    if (t < 1) {
      el.textContent =
        chars[Math.floor(Math.random() * 10)] +
        chars[Math.floor(Math.random() * 10)]
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
  const descRef    = useRef(null)
  const rowRefs    = useRef([])
  const borderRefs = useRef([])
  const indexRefs  = useRef([])

  useEffect(() => {
    injectKeyframes()

    // ── 1. Curtain reveal del título + fade palabras descripción ──────
    const headerObs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return

        if (line1Ref.current) line1Ref.current.style.transform = 'translateY(0)'
        setTimeout(() => {
          if (line2Ref.current) line2Ref.current.style.transform = 'translateY(0)'
        }, 90)

        if (descRef.current) {
          descRef.current.querySelectorAll('span[data-word]').forEach((w, i) => {
            setTimeout(() => {
              w.style.opacity   = '1'
              w.style.transform = 'translateY(0)'
            }, 220 + i * 26)
          })
        }

        headerObs.disconnect()
      },
      { threshold: 0.25 }
    )
    if (sectionRef.current) headerObs.observe(sectionRef.current)

    // ── 2. Por cada fila: border draw + slide-in + scramble ───────────
    rowRefs.current.forEach((row, i) => {
      if (!row) return

      row.style.opacity   = '0'
      row.style.transform = 'translateX(-20px)'
      row.style.transition = `
        opacity  700ms cubic-bezier(0.16,1,0.3,1) ${i * 65}ms,
        transform 700ms cubic-bezier(0.16,1,0.3,1) ${i * 65}ms,
        background 300ms cubic-bezier(0.16,1,0.3,1)
      `

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return

          // Border se despliega de izquierda a derecha
          const border = borderRefs.current[i]
          if (border) {
            setTimeout(() => {
              border.style.transform = 'scaleX(1)'
            }, i * 55)
          }

          // Fila aparece
          setTimeout(() => {
            row.style.opacity   = '1'
            row.style.transform = 'translateX(0)'
          }, i * 65 + 50)

          // Scramble en el número de índice
          const idx = indexRefs.current[i]
          if (idx) {
            setTimeout(() => scrambleText(idx, ITEMS[i].index, 480), i * 65 + 150)
          }

          obs.disconnect()
        },
        { threshold: 0.04 }
      )
      obs.observe(row)
    })

    return () => headerObs.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="formacion"
      style={{ backgroundColor: DS.bg, padding: 'clamp(80px, 8vw, 110px) clamp(40px, 7vw, 130px)' }}
    >
      {/* ── Header ───────────────────────────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: '80px',
          gap: '48px',
        }}
      >
        {/* Título con curtain reveal línea a línea */}
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(40px, 5vw, 64px)',
            fontWeight: 300,
            lineHeight: 1.1,
            color: DS.textPrimary,
            margin: 0,
          }}
        >
          <div style={{ overflow: 'hidden', paddingBottom: '0.06em' }}>
            <span
              ref={line1Ref}
              style={{
                display: 'block',
                transform: 'translateY(110%)',
                transition: 'transform 950ms cubic-bezier(0.16,1,0.3,1)',
              }}
            >
              Mi formación
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
              académica.
            </em>
          </div>
        </h2>

        {/* Descripción con fade palabra a palabra */}
        <p
          ref={descRef}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 'clamp(14px, 1.1vw, 16px)',
            fontWeight: 300,
            color: DS.textSecondary,
            lineHeight: 1.8,
            maxWidth: '360px',
            margin: 0,
            flexShrink: 0,
            paddingBottom: '6px',
          }}
        >
          {'Aprendizaje continuo que fundamenta mi práctica como desarrollador — desde fundamentos universitarios hasta certificaciones de la industria.'
            .split(' ')
            .map((word, i) => (
              <span
                key={i}
                data-word
                style={{
                  display: 'inline-block',
                  opacity: 0,
                  transform: 'translateY(10px)',
                  transition:
                    'opacity 420ms cubic-bezier(0.16,1,0.3,1), transform 420ms cubic-bezier(0.16,1,0.3,1)',
                  marginRight: '0.28em',
                }}
              >
                {word}
              </span>
            ))}
        </p>
      </div>

      {/* ── Filas ────────────────────────────────────────────────────── */}
      <div>
        {ITEMS.map((item, i) => (
          <div key={item.id} style={{ position: 'relative' }}>
            {/* Border animado — se dibuja de izquierda a derecha */}
            <div
              ref={(el) => { borderRefs.current[i] = el }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '1px',
                backgroundColor: DS.border,
                transform: 'scaleX(0)',
                transformOrigin: 'left',
                transition: `transform 750ms cubic-bezier(0.16,1,0.3,1) ${i * 55}ms`,
              }}
            />
            <FormacionRow
              item={item}
              rowRef={(el) => { rowRefs.current[i] = el }}
              indexRef={(el) => { indexRefs.current[i] = el }}
            />
          </div>
        ))}
        <div style={{ height: '1px', backgroundColor: DS.border }} />
      </div>
    </section>
  )
}

// ── FormacionRow ──────────────────────────────────────────────────────────────

function FormacionRow({ item, rowRef, indexRef }) {
  const rowEl   = useRef(null)
  const accent  = useRef(null)
  const arrow   = useRef(null)
  const indexEl = useRef(null)

  const setRowRef = (el) => {
    rowEl.current = el
    if (rowRef) rowRef(el)
  }
  const setIndexRef = (el) => {
    indexEl.current = el
    if (indexRef) indexRef(el)
  }

  const onEnter = () => {
    if (rowEl.current)
      rowEl.current.style.background =
        `radial-gradient(ellipse 55% 80% at 0% 50%, rgba(212,168,67,0.05) 0%, ${DS.surface} 65%)`

    if (accent.current) {
      accent.current.style.opacity   = '1'
      accent.current.style.animation = 'fm-accent-glow 2.2s ease-in-out infinite'
    }
    if (arrow.current) {
      arrow.current.style.transform = 'translate(5px, -5px)'
      arrow.current.style.color     = DS.textPrimary
    }
    if (indexEl.current) indexEl.current.style.color = '#909090'
  }

  const onLeave = () => {
    if (rowEl.current) rowEl.current.style.background = 'transparent'
    if (accent.current) {
      accent.current.style.opacity   = '0'
      accent.current.style.animation = 'none'
    }
    if (arrow.current) {
      arrow.current.style.transform = 'translate(0, 0)'
      arrow.current.style.color     = DS.textTertiary
    }
    if (indexEl.current) indexEl.current.style.color = DS.textTertiary
  }

  return (
    <div
      ref={setRowRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: '28px',
        padding: '26px 12px',
        borderRadius: '6px',
        cursor: 'default',
      }}
    >
      {/* Barra dorada izquierda — visible al hover con glow pulsante */}
      <div
        ref={accent}
        style={{
          position: 'absolute',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          width: '3px',
          height: '48%',
          backgroundColor: DS.gold,
          borderRadius: '0 2px 2px 0',
          opacity: 0,
          transition: 'opacity 280ms cubic-bezier(0.16,1,0.3,1)',
        }}
      />

      {/* Índice — scrambled al entrar en viewport */}
      <span
        ref={setIndexRef}
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '11px',
          fontWeight: 400,
          color: DS.textTertiary,
          letterSpacing: '0.1em',
          width: '28px',
          flexShrink: 0,
          paddingLeft: '12px',
          transition: 'color 280ms cubic-bezier(0.16,1,0.3,1)',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {item.index}
      </span>

      {/* Chip de tipo */}
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '10px',
          fontWeight: 400,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: DS.textSecondary,
          border: `1px solid ${DS.border}`,
          padding: '4px 12px',
          borderRadius: '999px',
          flexShrink: 0,
          width: '116px',
          textAlign: 'center',
        }}
      >
        {item.type}
      </span>

      {/* Título del grado + institución */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(17px, 1.45vw, 22px)',
            fontWeight: 300,
            color: DS.textPrimary,
            margin: '0 0 5px',
            lineHeight: 1.2,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {item.degree}
        </p>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '13px',
            fontWeight: 300,
            color: DS.textSecondary,
            margin: 0,
            letterSpacing: '0.01em',
          }}
        >
          {item.institution}
        </p>
      </div>

      {/* Período */}
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '13px',
          fontWeight: 300,
          color: DS.textTertiary,
          flexShrink: 0,
          width: '140px',
          textAlign: 'right',
          letterSpacing: '0.02em',
        }}
      >
        {item.period}
      </span>

      {/* Badge de estado */}
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '10px',
          fontWeight: 400,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: item.active ? DS.gold : DS.textTertiary,
          border: `1px solid ${item.active ? 'rgba(212,168,67,0.45)' : DS.border}`,
          padding: '5px 12px',
          borderRadius: '999px',
          flexShrink: 0,
          backgroundColor: item.active ? 'rgba(212,168,67,0.07)' : 'transparent',
          width: '100px',
          textAlign: 'center',
          animation: item.active ? 'fm-badge-pulse 2.8s ease-in-out infinite' : 'none',
        }}
      >
        {item.status}
      </span>

      {/* Flecha — se mueve en diagonal al hover */}
      <span
        ref={arrow}
        style={{
          color: DS.textTertiary,
          flexShrink: 0,
          paddingRight: '8px',
          display: 'flex',
          alignItems: 'center',
          transition:
            'transform 280ms cubic-bezier(0.16,1,0.3,1), color 280ms cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
          <path
            d="M2 11L11 2M11 2H4.5M11 2V8.5"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </div>
  )
}
