import { useEffect, useRef, useState } from 'react'
import {
  SiReact, SiVuedotjs, SiNextdotjs, SiJavascript, SiTypescript, SiBootstrap, SiThreedotjs,
  SiNodedotjs, SiExpress, SiNestjs, SiPython, SiDjango, SiPhp, SiLaravel, SiClerk,
  SiPostgresql, SiPrisma, SiMysql, SiMongodb,
  SiOpenai, SiN8N, SiLangchain, SiOllama, SiAnthropic,
  SiGit, SiGithub, SiVercel, SiRailway, SiRender, SiPostman, SiJira,
} from 'react-icons/si'

function OpenClaw({ size = 24, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C9.5 2 7.5 3.5 6.5 5.5C5.2 5.2 3.5 6 2.8 7.5C2 9 2.3 10.8 3.3 12C2.5 13.2 2.3 14.8 3 16.2C3.7 17.6 5.1 18.4 6.5 18.4C7 19.5 8 20.5 9.3 21C10.6 21.5 12 21.3 13.1 20.7C14.2 21.3 15.6 21.5 16.9 21C18.2 20.5 19.1 19.5 19.5 18.4C20.9 18.4 22.3 17.6 23 16.2C23.7 14.8 23.5 13.2 22.7 12C23.7 10.8 24 9 23.2 7.5C22.5 6 20.8 5.2 19.5 5.5C18.5 3.5 16.5 2 14 2C13.3 2 12.6 2.1 12 2.3C11.4 2.1 10.7 2 10 2" fill={color}/>
      <path d="M9 10.5C9 9.1 10.1 8 11.5 8H12.5C13.9 8 15 9.1 15 10.5V14C15 15.1 14.1 16 13 16H11C9.9 16 9 15.1 9 14V10.5Z" fill={color === 'currentColor' ? 'currentColor' : '#0a0a0a'}/>
    </svg>
  )
}

function HermesAgent({ size = 24, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L3 7V17L12 22L21 17V7L12 2Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M12 2V22" stroke={color} strokeWidth="1.5"/>
      <path d="M3 7L21 17" stroke={color} strokeWidth="1.5"/>
      <path d="M21 7L3 17" stroke={color} strokeWidth="1.5"/>
    </svg>
  )
}

const DS = {
  bg: '#0a0a0a',
  border: '#2a2a2a',
  textPrimary: '#f0f0f0',
  textSecondary: '#a0a0a0',
  textTertiary: '#404040',
}

const GROUPS = [
  {
    label: 'Frontend',
    description:
      'Interfaces rápidas, accesibles y bien diseñadas. Construyo experiencias web que combinan rendimiento y estética.',
    items: [
      { name: 'React',       Icon: SiReact,       color: '#61DAFB' },
      { name: 'Vue',         Icon: SiVuedotjs,    color: '#42B883' },
      { name: 'Next.js',     Icon: SiNextdotjs,   color: '#ffffff' },
      { name: 'JavaScript',  Icon: SiJavascript,  color: '#F7DF1E' },
      { name: 'TypeScript',  Icon: SiTypescript,  color: '#3178C6' },
      { name: 'Bootstrap',   Icon: SiBootstrap,   color: '#7952B3' },
      { name: 'Three.js',    Icon: SiThreedotjs,  color: '#ffffff' },
    ],
  },
  {
    label: 'Backend',
    description:
      'APIs robustas y escalables. Diseño la lógica de negocio con arquitecturas claras y bien organizadas.',
    items: [
      { name: 'Node.js', Icon: SiNodedotjs, color: '#339933' },
      { name: 'Express', Icon: SiExpress,   color: '#ffffff' },
      { name: 'NestJS',  Icon: SiNestjs,    color: '#E0234E' },
      { name: 'Python',  Icon: SiPython,    color: '#3776AB' },
      { name: 'Django',  Icon: SiDjango,    color: '#092E20' },
      { name: 'PHP',     Icon: SiPhp,       color: '#777BB4' },
      { name: 'Laravel', Icon: SiLaravel,   color: '#FF2D20' },
      { name: 'Clerk',   Icon: SiClerk,     color: '#6C47FF' },
    ],
  },
  {
    label: 'Bases de datos',
    description:
      'Gestión eficiente de datos con bases relacionales y no relacionales. Diseño esquemas claros y consultas optimizadas.',
    items: [
      { name: 'PostgreSQL', Icon: SiPostgresql, color: '#4169E1' },
      { name: 'Prisma',     Icon: SiPrisma,     color: '#ffffff' },
      { name: 'MySQL',      Icon: SiMysql,      color: '#4479A1' },
      { name: 'MongoDB',    Icon: SiMongodb,    color: '#47A248' },
    ],
  },
  {
    label: 'Inteligencia Artificial',
    description:
      'En este momento me encuentro aprendiendo sobre la integración de modelos de lenguaje y automatización inteligente. Construyendo flujos y agentes.',
    items: [
      { name: 'OpenClaw',    Icon: OpenClaw,    color: '#D97757' },
      { name: 'Claude Code', Icon: SiAnthropic, color: '#D97757' },
      { name: 'OpenAI',      Icon: SiOpenai,    color: '#ffffff' },
      { name: 'N8N',         Icon: SiN8N,       color: '#EA4B71' },
      { name: 'Langchain',   Icon: SiLangchain, color: '#1C3C3C' },
      { name: 'Ollama',      Icon: SiOllama,    color: '#ffffff' },
      { name: 'Hermes',      Icon: HermesAgent, color: '#7B5EA7' },
    ],
  },
  {
    label: 'Herramientas',
    description:
      'El ecosistema que rodea el desarrollo: control de versiones, despliegue y colaboración efectiva.',
    items: [
      { name: 'Git',     Icon: SiGit,     color: '#F05032' },
      { name: 'GitHub',  Icon: SiGithub,  color: '#ffffff' },
      { name: 'Vercel',  Icon: SiVercel,  color: '#ffffff' },
      { name: 'Railway', Icon: SiRailway, color: '#0B0D0E' },
      { name: 'Render',  Icon: SiRender,  color: '#46E3B7' },
      { name: 'Postman', Icon: SiPostman, color: '#FF6C37' },
      { name: 'Jira',    Icon: SiJira,    color: '#0052CC' },
    ],
  },
]

const DESC_LEFT = 'Las herramientas con las que construyo. Desde el frontend hasta la infraestructura, cada tecnología tiene su propósito.'

export default function Stack() {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef  = useRef(null)
  const line1Ref      = useRef(null)
  const line2Ref      = useRef(null)
  const descRef       = useRef(null)
  const catBorderRefs = useRef([])

  // ── Scroll-driven active group ────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      const { top } = containerRef.current.getBoundingClientRect()
      const raw   = -top / window.innerHeight
      setActiveIndex(Math.max(0, Math.min(Math.round(raw), GROUPS.length - 1)))
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ── One-time entry animations ─────────────────────────────────────────
  useEffect(() => {
    // Curtain reveal título + word fade desc
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
            }, 200 + i * 24)
          })
        }

        // Border draw categorías — escalonado
        catBorderRefs.current.forEach((el, i) => {
          if (!el) return
          setTimeout(() => {
            el.style.transform = 'scaleX(1)'
          }, 300 + i * 80)
        })

        headerObs.disconnect()
      },
      { threshold: 0.15 }
    )
    if (containerRef.current) headerObs.observe(containerRef.current)

    return () => headerObs.disconnect()
  }, [])

  return (
    <section
      id="stack"
      ref={containerRef}
      style={{
        backgroundColor: DS.bg,
        display: 'grid',
        gridTemplateColumns: '400px 1fr',
      }}
    >
      {/* ── Left — sticky ────────────────────────────────────────────── */}
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'clamp(56px, 7vw, 100px) 40px clamp(48px, 6vw, 72px) clamp(40px, 6vw, 96px)',
        backgroundColor: DS.bg,
        zIndex: 1,
      }}>
        {/* Headline — curtain reveal */}
        <div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(40px, 5vw, 72px)',
            fontWeight: 300,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: DS.textPrimary,
            margin: '0 0 20px',
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
                Mi Stack
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
                tecnológico.
              </em>
            </div>
          </h2>

          {/* Descripción — word fade */}
          <p
            ref={descRef}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 'clamp(13px, 1vw, 15px)',
              fontWeight: 300,
              lineHeight: 1.75,
              color: DS.textSecondary,
              margin: 0,
              maxWidth: '300px',
            }}
          >
            {DESC_LEFT.split(' ').map((word, i) => (
              <span
                key={i}
                data-word
                style={{
                  display: 'inline-block',
                  opacity: 0,
                  transform: 'translateY(10px)',
                  transition:
                    'opacity 400ms cubic-bezier(0.16,1,0.3,1), transform 400ms cubic-bezier(0.16,1,0.3,1)',
                  marginRight: '0.28em',
                }}
              >
                {word}
              </span>
            ))}
          </p>
        </div>

        {/* Categorías — border draw + scale activo */}
        <div>
          {GROUPS.map((group, i) => {
            const active = activeIndex === i
            return (
              <div
                key={group.label}
                style={{ padding: '16px 0', position: 'relative' }}
              >
                {/* Border animado */}
                <div
                  ref={(el) => { catBorderRefs.current[i] = el }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '1px',
                    backgroundColor: DS.border,
                    transform: 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 650ms cubic-bezier(0.16,1,0.3,1)',
                  }}
                />
                <span style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: active ? 'clamp(22px, 2.4vw, 32px)' : 'clamp(15px, 1.5vw, 19px)',
                  fontWeight: 300,
                  lineHeight: 1.1,
                  color: active ? DS.textPrimary : DS.textTertiary,
                  display: 'block',
                  transition: 'font-size 0.45s cubic-bezier(0.16,1,0.3,1), color 0.4s',
                }}>
                  {group.label}
                </span>
                <div style={{
                  overflow: 'hidden',
                  maxHeight: active ? '80px' : '0px',
                  opacity: active ? 1 : 0,
                  marginTop: active ? '8px' : '0',
                  transition: 'max-height 0.45s cubic-bezier(0.16,1,0.3,1), opacity 0.4s, margin-top 0.4s',
                }}>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '12px',
                    fontWeight: 300,
                    lineHeight: 1.7,
                    color: DS.textSecondary,
                    margin: 0,
                  }}>
                    {group.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Right — secciones scrolleables ───────────────────────────── */}
      <div>
        {GROUPS.map((group, gi) => {
          const active = activeIndex === gi
          return (
            <div
              key={group.label}
              style={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                padding: '0 clamp(40px, 6vw, 96px) 0 40px',
              }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {group.items.map((tech, ci) => (
                  <TechCard key={tech.name} tech={tech} active={active} cardIndex={ci} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function TechCard({ tech, active, cardIndex }) {
  const [hovered, setHovered] = useState(false)
  const { name, Icon, color } = tech

  const delay = active ? `${cardIndex * 48}ms` : '0ms'
  const duration = active ? '550ms' : '220ms'

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '18px',
        padding: '44px 36px',
        border: `1px solid ${hovered ? '#3a3a3a' : DS.border}`,
        borderRadius: '10px',
        cursor: 'default',
        minWidth: '140px',
        opacity: active ? 1 : 0.06,
        transform: active ? 'translateY(0)' : 'translateY(16px)',
        transition: `
          opacity ${duration} cubic-bezier(0.16,1,0.3,1) ${delay},
          transform ${duration} cubic-bezier(0.16,1,0.3,1) ${delay},
          border-color 250ms,
          background 250ms
        `,
        background: hovered ? '#111111' : 'transparent',
      }}
    >
      <Icon
        size={52}
        style={{
          color: hovered ? color : DS.textTertiary,
          transition: 'color 250ms',
          flexShrink: 0,
        }}
      />
      <span style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '13px',
        fontWeight: 400,
        color: hovered ? DS.textSecondary : DS.textTertiary,
        letterSpacing: '0.03em',
        transition: 'color 250ms',
        whiteSpace: 'nowrap',
        textAlign: 'center',
      }}>
        {name}
      </span>
    </div>
  )
}
