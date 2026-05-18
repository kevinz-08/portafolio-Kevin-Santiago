import { useState } from 'react'
import {
  SiReact, SiVuedotjs, SiNextdotjs, SiJavascript, SiTypescript, SiBootstrap, SiThreedotjs,
  SiNodedotjs, SiExpress, SiNestjs, SiPython, SiDjango, SiClerk,
  SiPostgresql, SiPrisma, SiMysql, SiMongodb,
  SiOpenai, SiN8N, SiLangchain, SiOllama, SiAnthropic,
  SiGit, SiGithub, SiVercel, SiRailway, SiRender, SiPostman, SiJira,
} from 'react-icons/si'

const DS = {
  bg:            '#0a0a0a',
  surface:       '#111111',
  border:        '#2a2a2a',
  borderLight:   '#3a3a3a',
  textPrimary:   '#f0f0f0',
  textSecondary: '#a0a0a0',
  textTertiary:  '#404040',
}

const GROUPS = [
  {
    label: 'Frontend',
    description: 'Interfaces rápidas, accesibles y bien diseñadas. Combino rendimiento y estética.',
    items: [
      { name: 'React',      Icon: SiReact,      color: '#61DAFB' },
      { name: 'Vue',        Icon: SiVuedotjs,   color: '#42B883' },
      { name: 'Next.js',    Icon: SiNextdotjs,  color: '#ffffff' },
      { name: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E' },
      { name: 'TypeScript', Icon: SiTypescript, color: '#3178C6' },
      { name: 'Bootstrap',  Icon: SiBootstrap,  color: '#7952B3' },
      { name: 'Three.js',   Icon: SiThreedotjs, color: '#ffffff' },
    ],
  },
  {
    label: 'Backend',
    description: 'APIs robustas y escalables. Diseño la lógica de negocio con arquitecturas claras.',
    items: [
      { name: 'Node.js', Icon: SiNodedotjs, color: '#339933' },
      { name: 'Express', Icon: SiExpress,   color: '#ffffff'  },
      { name: 'NestJS',  Icon: SiNestjs,    color: '#E0234E'  },
      { name: 'Python',  Icon: SiPython,    color: '#3776AB'  },
      { name: 'Django',  Icon: SiDjango,    color: '#092E20'  },
      { name: 'Clerk',   Icon: SiClerk,     color: '#6C47FF'  },
    ],
  },
  {
    label: 'Bases de datos',
    description: 'Gestión eficiente con bases relacionales y no relacionales.',
    items: [
      { name: 'PostgreSQL', Icon: SiPostgresql, color: '#4169E1' },
      { name: 'Prisma',     Icon: SiPrisma,     color: '#ffffff' },
      { name: 'MySQL',      Icon: SiMysql,      color: '#4479A1' },
      { name: 'MongoDB',    Icon: SiMongodb,    color: '#47A248' },
    ],
  },
  {
    label: 'IA',
    description: 'Integrando LLMs, agentes y flujos de automatización inteligente.',
    items: [
      { name: 'Claude', Icon: SiAnthropic, color: '#D97757' },
      { name: 'OpenAI', Icon: SiOpenai,    color: '#ffffff'  },
      { name: 'N8N',    Icon: SiN8N,       color: '#EA4B71'  },
      { name: 'Langchain', Icon: SiLangchain, color: '#1C3C3C' },
      { name: 'Ollama', Icon: SiOllama,    color: '#ffffff'  },
    ],
  },
  {
    label: 'Herramientas',
    description: 'Control de versiones, despliegue y colaboración efectiva.',
    items: [
      { name: 'Git',     Icon: SiGit,     color: '#F05032' },
      { name: 'GitHub',  Icon: SiGithub,  color: '#ffffff' },
      { name: 'Vercel',  Icon: SiVercel,  color: '#ffffff' },
      { name: 'Railway', Icon: SiRailway, color: '#9B59B6' },
      { name: 'Render',  Icon: SiRender,  color: '#46E3B7' },
      { name: 'Postman', Icon: SiPostman, color: '#FF6C37' },
      { name: 'Jira',    Icon: SiJira,    color: '#0052CC' },
    ],
  },
]

export default function Technologies() {
  const [active, setActive] = useState(0)

  return (
    <section id="stack" style={{ backgroundColor: DS.bg, padding: '96px 24px 0' }}>
      {/* Header */}
      <h2 style={{
        fontFamily:    "'Cormorant Garamond', serif",
        fontSize:      'clamp(36px, 9vw, 64px)',
        fontWeight:    300,
        lineHeight:    1.0,
        letterSpacing: '-0.02em',
        color:         DS.textPrimary,
        margin:        '0 0 16px',
      }}>
        Mi Stack <em style={{ fontStyle: 'italic' }}>tecnológico.</em>
      </h2>
      <p style={{
        fontFamily:   "'DM Sans', sans-serif",
        fontSize:     '14px',
        fontWeight:   300,
        color:        DS.textSecondary,
        lineHeight:   1.7,
        margin:       '0 0 36px',
      }}>
        Las herramientas con las que construyo. Desde el frontend hasta la infraestructura.
      </p>

      {/* Category tabs — horizontal scroll */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', marginBottom: '20px', scrollbarWidth: 'none' }}>
        {GROUPS.map((group, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              flexShrink:    0,
              fontFamily:    "'DM Sans', sans-serif",
              fontSize:      '12px',
              fontWeight:    400,
              letterSpacing: '0.04em',
              color:         active === i ? '#0a0a0a' : DS.textSecondary,
              backgroundColor: active === i ? DS.textPrimary : 'transparent',
              border:        `1px solid ${active === i ? 'transparent' : DS.border}`,
              borderRadius:  '999px',
              padding:       '8px 18px',
              cursor:        'pointer',
              transition:    'background-color 300ms, color 300ms, border-color 300ms',
            }}
          >
            {group.label}
          </button>
        ))}
      </div>

      {/* Category description */}
      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize:   '13px',
        fontWeight: 300,
        color:      DS.textSecondary,
        lineHeight: 1.7,
        margin:     '0 0 28px',
      }}>
        {GROUPS[active].description}
      </p>

      {/* Tech grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
        {GROUPS[active].items.map(({ name, Icon, color }) => (
          <TechCard key={name} name={name} Icon={Icon} color={color} />
        ))}
      </div>
    </section>
  )
}

function TechCard({ name, Icon, color }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display:         'flex',
        flexDirection:   'column',
        alignItems:      'center',
        gap:             '10px',
        padding:         '20px 12px',
        border:          `1px solid ${hovered ? '#3a3a3a' : '#2a2a2a'}`,
        borderRadius:    '10px',
        background:      hovered ? '#111111' : 'transparent',
        transition:      'border-color 250ms, background 250ms',
        cursor:          'default',
      }}
    >
      <Icon
        size={28}
        style={{ color: hovered ? color : '#404040', transition: 'color 250ms', flexShrink: 0 }}
      />
      <span style={{
        fontFamily:  "'DM Sans', sans-serif",
        fontSize:    '11px',
        fontWeight:  400,
        color:       hovered ? '#a0a0a0' : '#404040',
        transition:  'color 250ms',
        textAlign:   'center',
        letterSpacing: '0.02em',
        lineHeight:  1.3,
      }}>
        {name}
      </span>
    </div>
  )
}
