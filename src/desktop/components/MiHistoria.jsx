import { useEffect, useRef } from 'react'
import foto from '../../img/miHistoriaImage.jpg'

const DS = {
  bg: '#0a0a0a',
  surface: '#111111',
  border: '#2a2a2a',
  textPrimary: '#f0f0f0',
  textSecondary: '#a0a0a0',
  textTertiary: '#505050',
}

const SKILLS = [
  'React',
  'NextJS',
  'JavaScript',
  'Typescript',
  'TailwindCSS',
  'Nodejs',
  'ExpressJS',
  'NestJS',
  'PostgreSQL',
  'Mysql',
  'Inteligencia Artificial',
  'Adaptable',
  'Organizado',
  'Proactivo',
  'Analítico',
  'Colaborativo',
]

const EXPERIENCE = [
  { role: 'Desarrollador Web',   company: 'CampusLands',      year: '2024 — 2025' },
  { role: 'Aprendiz Globant',    company: 'Globant',           year: '2025 — 2026' },
  { role: 'Proyecto Freelance',  company: 'H2R Online Store',  year: '2026'        },
]

const DESC =
  'Soy Santiago Gutierrez, desarrollador de software formado en CampusLands y estudiante activo de las Unidades Tecnológicas de Santander. Me especializo en construir apps web con Typescript, NextJS y NodeJs, con foco en soluciones claras, mantenibles y bien pensadas.'

export default function MiHistoria() {
  const sectionRef   = useRef(null)
  const line1Ref     = useRef(null)
  const line2Ref     = useRef(null)
  const descRef      = useRef(null)
  const photoRef     = useRef(null)
  const div1Ref      = useRef(null)
  const div2Ref      = useRef(null)
  const skillRefs    = useRef([])
  const expRowRefs   = useRef([])
  const expBorderRefs = useRef([])

  useEffect(() => {
    // ── 1. Curtain reveal título + word fade desc ─────────────────────
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
            }, 220 + i * 22)
          })
        }

        // Primer divider se dibuja junto con el título
        setTimeout(() => {
          if (div1Ref.current) div1Ref.current.style.transform = 'scaleX(1)'
        }, 500)

        headerObs.disconnect()
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) headerObs.observe(sectionRef.current)

    // ── 2. Skill tags — stagger fade-up ──────────────────────────────
    skillRefs.current.forEach((el, i) => {
      if (!el) return
      el.style.opacity   = '0'
      el.style.transform = 'translateY(14px)'
      el.style.transition = `
        opacity  500ms cubic-bezier(0.16,1,0.3,1) ${i * 32}ms,
        transform 500ms cubic-bezier(0.16,1,0.3,1) ${i * 32}ms
      `
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return
          el.style.opacity   = '1'
          el.style.transform = 'translateY(0)'
          obs.disconnect()
        },
        { threshold: 0.1 }
      )
      obs.observe(el)
    })

    // ── 3. Segundo divider ────────────────────────────────────────────
    if (div2Ref.current) {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return
          div2Ref.current.style.transform = 'scaleX(1)'
          obs.disconnect()
        },
        { threshold: 0.1 }
      )
      obs.observe(div2Ref.current)
    }

    // ── 4. Experience rows — border draw + slide-in ───────────────────
    expRowRefs.current.forEach((row, i) => {
      if (!row) return
      row.style.opacity   = '0'
      row.style.transform = 'translateX(-20px)'
      row.style.transition = `
        opacity  700ms cubic-bezier(0.16,1,0.3,1) ${i * 65}ms,
        transform 700ms cubic-bezier(0.16,1,0.3,1) ${i * 65}ms
      `
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return

          const border = expBorderRefs.current[i]
          if (border) {
            setTimeout(() => {
              border.style.transform = 'scaleX(1)'
            }, i * 55)
          }

          setTimeout(() => {
            row.style.opacity   = '1'
            row.style.transform = 'translateX(0)'
          }, i * 65 + 50)

          obs.disconnect()
        },
        { threshold: 0.04 }
      )
      obs.observe(row)
    })

    // ── 5. Photo — fade-in desde la derecha ───────────────────────────
    const photoObs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        if (photoRef.current) {
          photoRef.current.style.opacity   = '1'
          photoRef.current.style.transform = 'translateX(0)'
        }
        photoObs.disconnect()
      },
      { threshold: 0.08 }
    )
    if (photoRef.current) photoObs.observe(photoRef.current)

    return () => headerObs.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="mi-historia"
      style={{
        backgroundColor: DS.bg,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* ── Left column ──────────────────────────────────────────────── */}
      <div
        style={{
          padding: 'clamp(64px, 8vw, 110px) clamp(40px, 6vw, 96px) clamp(64px, 8vw, 110px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}
      >
        {/* Título — curtain reveal línea a línea */}
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(56px, 7.5vw, 108px)',
            fontWeight: 300,
            lineHeight: 1.0,
            letterSpacing: '-0.02em',
            color: DS.textPrimary,
            margin: '0 0 32px',
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
              Conoce a
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
              Santiago.
            </em>
          </div>
        </h1>

        {/* Descripción — word-by-word fade */}
        <p
          ref={descRef}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 'clamp(15px, 1.2vw, 18px)',
            fontWeight: 300,
            lineHeight: 1.75,
            color: DS.textSecondary,
            margin: '0 0 40px',
            maxWidth: '540px',
          }}
        >
          {DESC.split(' ').map((word, i) => (
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

        {/* Divider 1 — border draw */}
        <div
          ref={div1Ref}
          style={{
            height: '1px',
            backgroundColor: DS.border,
            transform: 'scaleX(0)',
            transformOrigin: 'left',
            transition: 'transform 750ms cubic-bezier(0.16,1,0.3,1)',
            margin: '0 0 36px',
          }}
        />

        {/* Skills — stagger fade-up */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '40px' }}>
          {SKILLS.map((skill, i) => (
            <span
              key={skill}
              ref={(el) => { skillRefs.current[i] = el }}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '13px',
                fontWeight: 400,
                color: DS.textSecondary,
                border: `1px solid ${DS.border}`,
                borderRadius: '4px',
                padding: '6px 14px',
                letterSpacing: '0.01em',
                whiteSpace: 'nowrap',
              }}
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Divider 2 — border draw */}
        <div
          ref={div2Ref}
          style={{
            height: '1px',
            backgroundColor: DS.border,
            transform: 'scaleX(0)',
            transformOrigin: 'left',
            transition: 'transform 750ms cubic-bezier(0.16,1,0.3,1)',
          }}
        />

        {/* Experience rows — slide-in + border draw */}
        <div>
          {EXPERIENCE.map((item, i) => (
            <div key={i} style={{ position: 'relative' }}>
              {/* Border animado por fila */}
              <div
                ref={(el) => { expBorderRefs.current[i] = el }}
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
              <div
                ref={(el) => { expRowRefs.current[i] = el }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr auto',
                  gap: '8px',
                  padding: '22px 0',
                  alignItems: 'center',
                }}
              >
                <span style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '14px',
                  fontWeight: 400,
                  color: DS.textSecondary,
                }}>
                  {item.role}
                </span>
                <span style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '14px',
                  fontWeight: 300,
                  color: DS.textTertiary,
                }}>
                  {item.company}
                </span>
                <span style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '14px',
                  fontWeight: 300,
                  color: DS.textTertiary,
                  textAlign: 'right',
                  whiteSpace: 'nowrap',
                }}>
                  {item.year}
                </span>
              </div>
            </div>
          ))}
          {/* Border final */}
          <div style={{ height: '1px', backgroundColor: DS.border }} />
        </div>
      </div>

      {/* ── Right column — photo ──────────────────────────────────────── */}
      <div
        ref={photoRef}
        style={{
          opacity: 0,
          transform: 'translateX(30px)',
          transition: 'opacity 900ms cubic-bezier(0.16,1,0.3,1) 300ms, transform 900ms cubic-bezier(0.16,1,0.3,1) 300ms',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '100px 48px 48px 32px',
        }}
      >
        <img
          src={foto}
          alt="Kevin Santiago Gutiérrez"
          style={{
            width: '100%',
            maxHeight: '80vh',
            objectFit: 'cover',
            objectPosition: 'center 35%',
            display: 'block',
            borderRadius: '4px',
          }}
        />
      </div>
    </section>
  )
}
