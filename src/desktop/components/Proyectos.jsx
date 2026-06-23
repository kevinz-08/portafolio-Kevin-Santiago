import { useState, useEffect, useRef } from 'react'
import {
  SiHtml5, SiCss3, SiJavascript, SiBootstrap,
  SiReact, SiTypescript, SiNextdotjs, SiTailwindcss,
  SiNodedotjs, SiExpress, SiPostgresql, SiMongodb,
  SiGithub,
} from 'react-icons/si'
import { FiExternalLink, FiGithub } from 'react-icons/fi'

const DS = {
  bg: '#0a0a0a',
  surface: '#111111',
  surfaceAlt: '#171717',
  border: '#2a2a2a',
  borderLight: '#3a3a3a',
  textPrimary: '#f0f0f0',
  textSecondary: '#a0a0a0',
  textTertiary: '#505050',
}

const PROJECTS = [
  {
    name: "Andes 3d E-commerce",
    description:
      "Tienda de Materiales didácticos y de accesibilidad fabricados en impresión 3D para instituciones en Colombia, cree una landing profesional y mobile-first, +10 productos con diseño 3d totalmente funcional, dashboard admin funcional, chatbot con ia integrada e integracion de imagen a 3d potenciado por ia.",
    quote:
      '"En este proyecto lideré equipos y fortalecí mi capacidad de trabajar bajo presión. Además, integré modelos 3D en páginas web dinámicas."',
    stack: [
      { name: "Typescript", Icon: SiTypescript, color: "#1572B6" },
      { name: "Next.js", Icon: SiNextdotjs, color: "#000000" },
      { name: "TailwindCSS", Icon: SiTailwindcss, color: "#06B6D4" },
      { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
    ],
    liveUrl: "https://andes3d.vercel.app/",
    repoUrl: "#",
    accent: "#6366f1",
  },
  {
    name: "Recipe Finder App",
    description:
      "Desarrollé una aplicación de gestión de recetas con consumo de API y sistema de roles. Incluye dashboards personalizados, creación de planes de alimentación semanal, gestión de favoritos, perfiles de usuario y listas de compras automatizadas.",
    quote:
      '"Más que consumir una API, aprendí a estructurar la experiencia del usuario final, transformando datos en herramientas de valor como planes nutricionales y sistemas de gestión personalizados."',
    stack: [
      { name: "React", Icon: SiReact, color: "#61DAFB" },
      { name: "TailwindCSS", Icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Typescript", Icon: SiTypescript, color: "#3178C6" },
      { name: "NodeJS", Icon: SiNodedotjs, color: "#5FA04E" },
      { name: "ExpressJS", Icon: SiExpress, color: "#ffffff" },
      { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
    ],
    liveUrl: "https://recipe-finder-ksga.vercel.app/",
    repoUrl: "https://github.com/kevinz-08/recipe-finder-app",
    accent: "#ef4444",
  },
  {
    name: "Prototipo Inclusivo",
    description:
      "Aplicación web con juego interactivo diseñado para personas con dificultades visuales. La accesibilidad como centro de cada decisión de desarrollo.",
    quote:
      '"Diseñar para todos me cambió la perspectiva. La accesibilidad no es opcional, es responsabilidad."',
    stack: [
      { name: "HTML", Icon: SiHtml5, color: "#E34F26" },
      { name: "CSS", Icon: SiCss3, color: "#1572B6" },
      { name: "JS", Icon: SiJavascript, color: "#F7DF1E" },
    ],
    liveUrl:
      "https://kevinz-08.github.io/prototipo-interactivo-de-pagina-web-para-personas-con-dificultades-visuales/views/black-home.html",
    repoUrl:
      "https://github.com/kevinz-08/prototipo-interactivo-de-pagina-web-para-personas-con-dificultades-visuales",
    accent: "#10b981",
  },
];

export default function Proyectos() {
  const [active, setActive]       = useState(0)
  const [animating, setAnimating] = useState(false)
  const timerRef      = useRef(null)
  const sectionRef    = useRef(null)
  const line1Ref      = useRef(null)
  const line2Ref      = useRef(null)
  const carouselRef   = useRef(null)
  const bottomRef     = useRef(null)

  const goTo = (index) => {
    if (animating || index === active) return
    setAnimating(true)
    setActive(index)
    setTimeout(() => setAnimating(false), 600)
  }

  // ── Auto-rotate ───────────────────────────────────────────────────────
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % PROJECTS.length)
    }, 3000)
    return () => clearInterval(timerRef.current)
  }, [])

  const handleDotClick = (i) => {
    clearInterval(timerRef.current)
    goTo(i)
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % PROJECTS.length)
    }, 3000)
  }

  // ── Entry animations ──────────────────────────────────────────────────
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return

        // Curtain reveal título
        if (line1Ref.current) line1Ref.current.style.transform = 'translateY(0)'
        setTimeout(() => {
          if (line2Ref.current) line2Ref.current.style.transform = 'translateY(0)'
        }, 90)

        // Carousel fade-up
        setTimeout(() => {
          if (carouselRef.current) {
            carouselRef.current.style.opacity   = '1'
            carouselRef.current.style.transform = 'translateY(0)'
          }
        }, 250)

        // Quote + dots fade-up
        setTimeout(() => {
          if (bottomRef.current) {
            bottomRef.current.style.opacity   = '1'
            bottomRef.current.style.transform = 'translateY(0)'
          }
        }, 480)

        obs.disconnect()
      },
      { threshold: 0.12 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="proyectos"
      style={{
        backgroundColor: DS.bg,
        padding: 'clamp(64px, 8vw, 110px) clamp(40px, 6vw, 96px)',
      }}
    >
      {/* Título — curtain reveal */}
      <h2 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 'clamp(48px, 6vw, 88px)',
        fontWeight: 300,
        lineHeight: 1.0,
        letterSpacing: '-0.02em',
        color: DS.textPrimary,
        margin: '0 0 64px',
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
            Lo que he
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
            construido.
          </em>
        </div>
      </h2>

      {/* Carousel — fade-up como bloque */}
      <div
        ref={carouselRef}
        style={{
          position: 'relative',
          height: '460px',
          marginBottom: '48px',
          opacity: 0,
          transform: 'translateY(36px)',
          transition: 'opacity 800ms cubic-bezier(0.16,1,0.3,1), transform 800ms cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {PROJECTS.map((project, i) => {
          let offset = i - active
          if (offset < 0) offset += PROJECTS.length
          const isActive = offset === 0
          const visible  = offset <= 2

          const top    = offset === 0 ? 80 : offset === 1 ? 44 : 12
          const hInset = offset === 0 ? '0%' : offset === 1 ? '2%' : '4.5%'
          const opacity = !visible ? 0 : isActive ? 1 : offset === 1 ? 0.65 : 0.35
          const blur    = isActive || !visible ? 'none' : `blur(${offset === 1 ? 1.5 : 3}px)`

          return (
            <div
              key={project.name}
              style={{
                position: 'absolute',
                top:    `${top}px`,
                left:   hInset,
                right:  hInset,
                height: '380px',
                opacity,
                filter: blur,
                zIndex: !visible ? 0 : 10 - offset,
                pointerEvents: isActive ? 'auto' : 'none',
                transition: 'top 0.6s cubic-bezier(0.16,1,0.3,1), left 0.6s cubic-bezier(0.16,1,0.3,1), right 0.6s cubic-bezier(0.16,1,0.3,1), opacity 0.6s cubic-bezier(0.16,1,0.3,1), filter 0.6s cubic-bezier(0.16,1,0.3,1)',
              }}
            >
              <ProjectCard project={project} />
            </div>
          )
        })}
      </div>

      {/* Quote + dots — fade-up como bloque */}
      <div
        ref={bottomRef}
        style={{
          opacity: 0,
          transform: 'translateY(24px)',
          transition: 'opacity 700ms cubic-bezier(0.16,1,0.3,1), transform 700ms cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* Quote */}
        <div style={{
          textAlign: 'center',
          margin: '0 auto 40px',
          maxWidth: '720px',
          minHeight: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}>
          {PROJECTS.map((project, i) => (
            <p
              key={project.name}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(18px, 2vw, 24px)',
                fontWeight: 300,
                fontStyle: 'italic',
                lineHeight: 1.5,
                color: DS.textSecondary,
                margin: 0,
                position: 'absolute',
                opacity: i === active ? 1 : 0,
                transform: i === active ? 'translateY(0)' : 'translateY(8px)',
                transition: 'opacity 0.5s, transform 0.5s',
              }}
            >
              {project.quote}
            </p>
          ))}
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '40px' }}>
          {PROJECTS.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDotClick(i)}
              style={{
                width:  i === active ? '24px' : '8px',
                height: '8px',
                borderRadius: '999px',
                backgroundColor: i === active ? DS.textPrimary : DS.border,
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'width 0.35s cubic-bezier(0.16,1,0.3,1), background-color 0.35s',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project }) {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: DS.surface,
      border: `1px solid ${DS.border}`,
      borderRadius: '16px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Browser chrome header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 20px',
        borderBottom: `1px solid ${DS.border}`,
        flexShrink: 0,
      }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={DS.textTertiary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
          {[0,1,2].map(i => (
            <div key={i} style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: DS.textTertiary }} />
          ))}
        </div>
      </div>

      {/* Content grid */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1fr 340px',
        overflow: 'hidden',
      }}>
        {/* Left */}
        <div style={{
          padding: '40px 44px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          <div>
            <h3 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(26px, 2.8vw, 36px)',
              fontWeight: 300,
              lineHeight: 1.1,
              color: DS.textPrimary,
              margin: '0 0 16px',
            }}>
              {project.name}
            </h3>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '14px',
              fontWeight: 300,
              lineHeight: 1.75,
              color: DS.textSecondary,
              margin: 0,
              maxWidth: '480px',
            }}>
              {project.description}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '18px 20px',
                backgroundColor: DS.surfaceAlt,
                border: `1px solid ${DS.border}`,
                borderRadius: '10px',
                textDecoration: 'none',
                color: DS.textSecondary,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '13px',
                fontWeight: 400,
                transition: 'border-color 250ms, color 250ms',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = DS.borderLight; e.currentTarget.style.color = DS.textPrimary }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = DS.border; e.currentTarget.style.color = DS.textSecondary }}
            >
              <FiGithub size={18} style={{ flexShrink: 0 }} />
              Ver Repositorio
            </a>

            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '18px 20px',
                backgroundColor: DS.surfaceAlt,
                border: `1px solid ${DS.border}`,
                borderRadius: '10px',
                textDecoration: 'none',
                color: DS.textSecondary,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '13px',
                fontWeight: 400,
                transition: 'border-color 250ms, color 250ms',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = DS.borderLight; e.currentTarget.style.color = DS.textPrimary }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = DS.border; e.currentTarget.style.color = DS.textSecondary }}
            >
              <FiExternalLink size={18} style={{ flexShrink: 0 }} />
              Ver Proyecto
            </a>
          </div>
        </div>

        {/* Right — stack */}
        <div style={{
          backgroundColor: DS.surfaceAlt,
          borderLeft: `1px solid ${DS.border}`,
          padding: '40px 32px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '11px',
            fontWeight: 400,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: DS.textTertiary,
            margin: '0 0 24px',
          }}>
            Stack utilizado
          </p>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            flex: 1,
            alignContent: 'flex-start',
          }}>
            {project.stack.map(({ name, Icon, color }) => (
              <StackChip key={name} name={name} Icon={Icon} color={color} />
            ))}
          </div>

          <div style={{
            height: '3px',
            borderRadius: '999px',
            backgroundColor: project.accent,
            marginTop: '32px',
            opacity: 0.6,
          }} />
        </div>
      </div>
    </div>
  )
}

function StackChip({ name, Icon, color }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '7px',
        padding: '8px 14px',
        border: `1px solid ${hovered ? DS.borderLight : DS.border}`,
        borderRadius: '6px',
        background: hovered ? '#1e1e1e' : 'transparent',
        transition: 'border-color 200ms, background 200ms',
        cursor: 'default',
      }}
    >
      <Icon
        size={16}
        style={{ color: hovered ? color : DS.textTertiary, transition: 'color 200ms', flexShrink: 0 }}
      />
      <span style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '12px',
        fontWeight: 400,
        color: hovered ? DS.textSecondary : DS.textTertiary,
        transition: 'color 200ms',
        whiteSpace: 'nowrap',
      }}>
        {name}
      </span>
    </div>
  )
}
