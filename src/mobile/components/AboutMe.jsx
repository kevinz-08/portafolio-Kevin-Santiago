import { useEffect, useRef } from 'react'
import cvPdf from '../../img/Kevin Gutierrez - HV.pdf'
import foto  from '../../img/miHistoriaImage.jpg'

const DS = {
  bg:            '#0a0a0a',
  border:        '#2a2a2a',
  textPrimary:   '#f0f0f0',
  textSecondary: '#a0a0a0',
  textTertiary:  '#505050',
}

const SKILLS = [
  'React','NextJS','JavaScript','Typescript',
  'TailwindCSS','Nodejs','ExpressJS','NestJS',
  'PostgreSQL','Mysql','Inteligencia Artificial',
  'Adaptable','Organizado','Proactivo','Analítico','Colaborativo',
]

const EXPERIENCE = [
  { role: 'Desarrollador Web',  company: 'CampusLands',     year: '2024 — 2025' },
  { role: 'Aprendiz Globant',   company: 'Globant',          year: '2025 — 2026' },
  { role: 'Proyecto Freelance', company: 'H2R Online Store', year: '2026'        },
]

const DESC = 'Soy Santiago Gutierrez, desarrollador de software formado en CampusLands y estudiante activo de las Unidades Tecnológicas de Santander. Me especializo en construir apps web con Typescript, NextJS y NodeJs, con foco en soluciones claras, mantenibles y bien pensadas.'

export default function AboutMe() {
  const sectionRef = useRef(null)
  const photoRef   = useRef(null)
  const textRef    = useRef(null)
  const div1Ref    = useRef(null)
  const div2Ref    = useRef(null)
  const skillRefs  = useRef([])
  const rowRefs    = useRef([])
  const borderRefs = useRef([])

  useEffect(() => {
    // Photo + text fade-in
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      if (photoRef.current) {
        photoRef.current.style.opacity   = '1'
        photoRef.current.style.transform = 'translateY(0)'
      }
      setTimeout(() => {
        if (textRef.current) {
          textRef.current.style.opacity   = '1'
          textRef.current.style.transform = 'translateY(0)'
        }
        if (div1Ref.current) div1Ref.current.style.transform = 'scaleX(1)'
      }, 150)
      obs.disconnect()
    }, { threshold: 0.08 })
    if (sectionRef.current) obs.observe(sectionRef.current)

    // Skill tags stagger
    skillRefs.current.forEach((el, i) => {
      if (!el) return
      el.style.opacity   = '0'
      el.style.transform = 'translateY(12px)'
      el.style.transition = `opacity 450ms cubic-bezier(0.16,1,0.3,1) ${i * 28}ms, transform 450ms cubic-bezier(0.16,1,0.3,1) ${i * 28}ms`
      const so = new IntersectionObserver(([e]) => {
        if (!e.isIntersecting) return
        el.style.opacity   = '1'
        el.style.transform = 'translateY(0)'
        so.disconnect()
      }, { threshold: 0.1 })
      so.observe(el)
    })

    // Divider 2 draw
    if (div2Ref.current) {
      const d = new IntersectionObserver(([e]) => {
        if (!e.isIntersecting) return
        div2Ref.current.style.transform = 'scaleX(1)'
        d.disconnect()
      }, { threshold: 0.1 })
      d.observe(div2Ref.current)
    }

    // Experience rows
    rowRefs.current.forEach((row, i) => {
      if (!row) return
      row.style.opacity   = '0'
      row.style.transform = 'translateX(-16px)'
      row.style.transition = `opacity 600ms cubic-bezier(0.16,1,0.3,1) ${i * 60}ms, transform 600ms cubic-bezier(0.16,1,0.3,1) ${i * 60}ms`
      const ro = new IntersectionObserver(([e]) => {
        if (!e.isIntersecting) return
        const border = borderRefs.current[i]
        if (border) setTimeout(() => { border.style.transform = 'scaleX(1)' }, i * 50)
        setTimeout(() => {
          row.style.opacity   = '1'
          row.style.transform = 'translateX(0)'
        }, i * 60 + 40)
        ro.disconnect()
      }, { threshold: 0.04 })
      ro.observe(row)
    })

    return () => obs.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="mi-historia"
      style={{ backgroundColor: DS.bg, padding: '96px 24px 0' }}
    >
      {/* Photo */}
      <div
        ref={photoRef}
        style={{
          opacity:    0,
          transform:  'translateY(32px)',
          transition: 'opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.75s cubic-bezier(0.16,1,0.3,1)',
          marginBottom: '40px',
        }}
      >
        <img
          src={foto}
          alt="Kevin Santiago Gutiérrez"
          style={{ width: '100%', borderRadius: '4px', display: 'block', maxHeight: '420px', objectFit: 'cover', objectPosition: 'center 35%' }}
        />
      </div>

      {/* Text column */}
      <div
        ref={textRef}
        style={{
          opacity:    0,
          transform:  'translateY(24px)',
          transition: 'opacity 0.75s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.75s cubic-bezier(0.16,1,0.3,1) 0.1s',
        }}
      >
        {/* Headline */}
        <h1 style={{
          fontFamily:    "'Cormorant Garamond', serif",
          fontSize:      'clamp(40px, 10vw, 72px)',
          fontWeight:    300,
          lineHeight:    1.0,
          letterSpacing: '-0.02em',
          color:         DS.textPrimary,
          margin:        '0 0 28px',
        }}>
          Conoce a<br />
          <em style={{ fontStyle: 'italic' }}>Santiago.</em>
        </h1>

        {/* Description */}
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize:   '15px',
          fontWeight: 300,
          lineHeight: 1.75,
          color:      DS.textSecondary,
          margin:     '0 0 32px',
        }}>
          {DESC}
        </p>

        {/* Divider 1 */}
        <div
          ref={div1Ref}
          style={{
            height:          '1px',
            backgroundColor: DS.border,
            transform:       'scaleX(0)',
            transformOrigin: 'left',
            transition:      'transform 750ms cubic-bezier(0.16,1,0.3,1)',
            margin:          '0 0 28px',
          }}
        />

        {/* Skill tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '28px' }}>
          {SKILLS.map((skill, i) => (
            <span
              key={skill}
              ref={(el) => { skillRefs.current[i] = el }}
              style={{
                fontFamily:    "'DM Sans', sans-serif",
                fontSize:      '12px',
                fontWeight:    400,
                color:         DS.textSecondary,
                border:        `1px solid ${DS.border}`,
                borderRadius:  '4px',
                padding:       '5px 12px',
                letterSpacing: '0.01em',
                whiteSpace:    'nowrap',
              }}
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Divider 2 */}
        <div
          ref={div2Ref}
          style={{
            height:          '1px',
            backgroundColor: DS.border,
            transform:       'scaleX(0)',
            transformOrigin: 'left',
            transition:      'transform 750ms cubic-bezier(0.16,1,0.3,1)',
          }}
        />

        {/* Experience rows */}
        <div style={{ marginBottom: '36px' }}>
          {EXPERIENCE.map((item, i) => (
            <div key={i} style={{ position: 'relative' }}>
              <div
                ref={(el) => { borderRefs.current[i] = el }}
                style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                  backgroundColor: DS.border, transform: 'scaleX(0)', transformOrigin: 'left',
                  transition: `transform 700ms cubic-bezier(0.16,1,0.3,1) ${i * 50}ms`,
                }}
              />
              <div
                ref={(el) => { rowRefs.current[i] = el }}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 0', gap: '12px' }}
              >
                <div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 400, color: DS.textSecondary, margin: 0 }}>{item.role}</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', fontWeight: 300, color: DS.textTertiary, margin: '3px 0 0' }}>{item.company}</p>
                </div>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', fontWeight: 300, color: DS.textTertiary, whiteSpace: 'nowrap' }}>{item.year}</span>
              </div>
            </div>
          ))}
          <div style={{ height: '1px', backgroundColor: DS.border }} />
        </div>

        {/* CV Link */}
        <a
          href={cvPdf}
          download
          style={{
            display:        'inline-flex',
            alignItems:     'center',
            gap:            '8px',
            fontFamily:     "'DM Sans', sans-serif",
            fontSize:       '13px',
            fontWeight:     400,
            color:          DS.textSecondary,
            textDecoration: 'none',
            border:         `1px solid ${DS.border}`,
            borderRadius:   '6px',
            padding:        '10px 20px',
            transition:     'color 250ms, border-color 250ms',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = DS.textPrimary; e.currentTarget.style.borderColor = '#3a3a3a' }}
          onMouseLeave={(e) => { e.currentTarget.style.color = DS.textSecondary; e.currentTarget.style.borderColor = DS.border }}
        >
          Descargar CV
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 1v7M2 9h8M4 6l2 2 2-2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </section>
  )
}
