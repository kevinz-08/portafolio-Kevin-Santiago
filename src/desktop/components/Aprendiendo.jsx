import { useState, useRef, useEffect } from 'react'

// ── Design tokens ─────────────────────────────────────────────────────────────
const DS = {
  bg: '#0a0a0a',
  surface: '#111111',
  border: '#2a2a2a',
  textPrimary: '#f0f0f0',
  textSecondary: '#a0a0a0',
  textTertiary: '#505050',
  gold: '#d4a843',
}

// Syntax highlight colors (code editor palette)
const CL = {
  kw:   '#7dd3fc',  // keywords     — sky blue
  str:  '#86efac',  // strings      — green
  cm:   '#6b7280',  // comments     — slate
  fn:   '#c4b5fd',  // functions    — violet
  pr:   '#f9a8d4',  // properties   — pink
  nm:   '#fbbf24',  // numbers      — amber
  base: '#e2e8f0',  // default text — near white
}

// ── Code snippets ─────────────────────────────────────────────────────────────
// Each line: [{t: 'text', c: 'colorKey'}, ...] | null for blank line
const SNIPPETS = [
  // 0 — Integración de IA
  [
    [{ t: '// anthropic-client.js', c: 'cm' }],
    [{ t: 'import ', c: 'kw' }, { t: 'Anthropic ' }, { t: 'from ', c: 'kw' }, { t: "'@anthropic-ai/sdk'", c: 'str' }],
    null,
    [{ t: 'const ', c: 'kw' }, { t: 'client = ' }, { t: 'new ', c: 'kw' }, { t: 'Anthropic', c: 'fn' }, { t: '()' }],
    null,
    [{ t: 'export ', c: 'kw' }, { t: 'async ', c: 'kw' }, { t: 'function ', c: 'kw' }, { t: 'ask', c: 'fn' }, { t: '(prompt) {' }],
    [{ t: '  const ', c: 'kw' }, { t: '{ content } = ' }, { t: 'await ', c: 'kw' }],
    [{ t: '    client.messages.' }, { t: 'create', c: 'fn' }, { t: '({' }],
    [{ t: "      model: " }, { t: "'claude-sonnet-4-6'", c: 'str' }, { t: ',' }],
    [{ t: '      max_tokens: ' }, { t: '1024', c: 'nm' }, { t: ',' }],
    [{ t: '      messages: [{ role: ' }, { t: "'user'", c: 'str' }, { t: ', content: prompt }],' }],
    [{ t: '    })' }],
    [{ t: '  return ', c: 'kw' }, { t: 'content[' }, { t: '0', c: 'nm' }, { t: '].text' }],
    [{ t: '}' }],
  ],

  // 1 — LLMs
  [
    [{ t: '# llm-pipeline.py', c: 'cm' }],
    [{ t: 'from ', c: 'kw' }, { t: 'transformers ' }, { t: 'import ', c: 'kw' }, { t: 'pipeline', c: 'fn' }],
    [{ t: 'import ', c: 'kw' }, { t: 'torch', c: 'fn' }],
    null,
    [{ t: 'pipe = ' }, { t: 'pipeline', c: 'fn' }, { t: '(' }],
    [{ t: "    'text-generation'", c: 'str' }, { t: ',' }],
    [{ t: '    model=' }, { t: "'meta-llama/Llama-3.2-3B'", c: 'str' }, { t: ',' }],
    [{ t: '    torch_dtype=' }, { t: 'torch', c: 'fn' }, { t: '.float' }, { t: '16', c: 'nm' }, { t: ',' }],
    [{ t: ')' }],
    null,
    [{ t: 'out = ' }, { t: 'pipe', c: 'fn' }, { t: '(' }],
    [{ t: "    'Explain the attention mechanism'", c: 'str' }, { t: ',' }],
    [{ t: '    max_new_tokens=' }, { t: '256', c: 'nm' }, { t: ',' }],
    [{ t: '    temperature=' }, { t: '0.7', c: 'nm' }, { t: ',' }],
    [{ t: ')' }],
  ],

  // 2 — Agentes de IA
  [
    [{ t: '// ai-agent.js', c: 'cm' }],
    [{ t: 'const ', c: 'kw' }, { t: 'tools ', c: 'base' }, { t: '= [{' }],
    [{ t: '  name: ' }, { t: "'web_search'", c: 'str' }, { t: ',' }],
    [{ t: '  description: ' }, { t: "'Buscar en la web'", c: 'str' }, { t: ',' }],
    [{ t: '  input_schema: { type: ' }, { t: "'object'", c: 'str' }, { t: ',' }],
    [{ t: '    properties: { query: { type: ' }, { t: "'string'", c: 'str' }, { t: ' }},' }],
    [{ t: '  }' }],
    [{ t: '}]' }],
    null,
    [{ t: 'const ', c: 'kw' }, { t: '{ content } = ' }, { t: 'await ', c: 'kw' }],
    [{ t: '  client.messages.' }, { t: 'create', c: 'fn' }, { t: '({' }],
    [{ t: '    model: ' }, { t: "'claude-opus-4-7'", c: 'str' }, { t: ',' }],
    [{ t: '    tools,' }],
    [{ t: '    messages,' }],
    [{ t: '  })' }],
  ],

  // 3 — MCPs
  [
    [{ t: '// mcp-server.js', c: 'cm' }],
    [{ t: 'import ', c: 'kw' }, { t: '{ McpServer } ' }, { t: 'from ', c: 'kw' }, { t: "'@modelcontextprotocol/sdk'", c: 'str' }],
    null,
    [{ t: 'const ', c: 'kw' }, { t: 'server = ' }, { t: 'new ', c: 'kw' }, { t: 'McpServer', c: 'fn' }, { t: '({' }],
    [{ t: '  name: ' }, { t: "'mi-servidor-mcp'", c: 'str' }, { t: ',' }],
    [{ t: '  version: ' }, { t: "'1.0.0'", c: 'str' }, { t: ',' }],
    [{ t: '})' }],
    null,
    [{ t: 'server.' }, { t: 'tool', c: 'fn' }, { t: '(' }, { t: "'get_weather'", c: 'str' }, { t: ', {' }],
    [{ t: '  description: ' }, { t: "'Obtener el clima actual'", c: 'str' }, { t: ',' }],
    [{ t: '  parameters: { city: { type: ' }, { t: "'string'", c: 'str' }, { t: ' } },' }],
    [{ t: '  async ', c: 'kw' }, { t: 'execute', c: 'fn' }, { t: '({ city }) {' }],
    [{ t: '    return ', c: 'kw' }, { t: 'await ', c: 'kw' }, { t: 'fetchWeather', c: 'fn' }, { t: '(city)' }],
    [{ t: '  }' }],
    [{ t: '})' }],
  ],
]

const TABS = [
  {
    label: 'Integración de IA',
    number: '01',
    filename: 'anthropic-client.js',
    title: 'Integración de IA',
    description:
      'Aprendo a conectar aplicaciones web con la API de Anthropic para construir productos potenciados por modelos de lenguaje a escala de producción.',
  },
  {
    label: 'LLMs',
    number: '02',
    filename: 'llm-pipeline.py',
    title: 'Large Language Models',
    description:
      'Exploro cómo funcionan los LLMs desde adentro: arquitectura transformer, fine-tuning, cuantización y despliegue local con Ollama y HuggingFace.',
  },
  {
    label: 'Agentes de IA',
    number: '03',
    filename: 'ai-agent.js',
    title: 'Agentes de IA',
    description:
      'Construyo agentes autónomos capaces de usar herramientas, razonar en múltiples pasos y ejecutar tareas complejas con mínima intervención humana.',
  },
  {
    label: 'MCPs',
    number: '04',
    filename: 'mcp-server.js',
    title: 'Model Context Protocol',
    description:
      'Aprendo a construir servidores MCP que exponen herramientas, recursos y prompts a cualquier cliente compatible — conectando modelos de IA con el mundo real.',
  },
]

export default function Aprendiendo() {
  const [active, setActive]     = useState(0)
  const sectionRef = useRef(null)
  const panelRef   = useRef(null)
  const line1Ref   = useRef(null)
  const line2Ref   = useRef(null)
  const contentRef = useRef(null)

  // ── Scroll reveal ──────────────────────────────────────────────────
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        if (line1Ref.current) line1Ref.current.style.transform = 'translateY(0)'
        setTimeout(() => {
          if (line2Ref.current) line2Ref.current.style.transform = 'translateY(0)'
        }, 90)
        setTimeout(() => {
          if (panelRef.current) {
            panelRef.current.style.opacity   = '1'
            panelRef.current.style.transform = 'translateY(0)'
          }
        }, 250)
        obs.disconnect()
      },
      { threshold: 0.18 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  // ── Tab switch with fade ───────────────────────────────────────────
  const switchTab = (index) => {
    if (index === active) return
    if (contentRef.current) {
      contentRef.current.style.opacity   = '0'
      contentRef.current.style.transform = 'translateY(10px)'
    }
    setTimeout(() => {
      setActive(index)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (contentRef.current) {
            contentRef.current.style.opacity   = '1'
            contentRef.current.style.transform = 'translateY(0)'
          }
        })
      })
    }, 230)
  }

  return (
    <section
      ref={sectionRef}
      id="aprendiendo"
      style={{ backgroundColor: DS.bg, padding: 'clamp(80px, 8vw, 110px) clamp(40px, 7vw, 130px)' }}
    >
      {/* ── Title ──────────────────────────────────────────────────── */}
      <h2
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(40px, 5vw, 64px)',
          fontWeight: 300,
          lineHeight: 1.1,
          color: DS.textPrimary,
          margin: '0 0 64px',
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
            Qué me encuentro
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
            aprendiendo.
          </em>
        </div>
      </h2>

      {/* ── Panel ──────────────────────────────────────────────────── */}
      <div
        ref={panelRef}
        style={{
          border: `1px solid ${DS.border}`,
          borderRadius: '20px',
          overflow: 'hidden',
          opacity: 0,
          transform: 'translateY(28px)',
          transition: 'opacity 750ms cubic-bezier(0.16,1,0.3,1), transform 750ms cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* ── Tab bar ──────────────────────────────────────────────── */}
        <div style={{ display: 'flex', borderBottom: `1px solid ${DS.border}` }}>
          {TABS.map((tab, i) => (
            <TabButton
              key={i}
              label={tab.label}
              active={active === i}
              isLast={i === TABS.length - 1}
              onClick={() => switchTab(i)}
            />
          ))}
        </div>

        {/* ── Content ──────────────────────────────────────────────── */}
        <div
          ref={contentRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0',
            padding: 'clamp(36px, 5vw, 64px)',
            transition: 'opacity 230ms cubic-bezier(0.16,1,0.3,1), transform 230ms cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          {/* Left — code card */}
          <div style={{ flex: '0 0 50%', paddingRight: '5%' }}>
            <CodeCard snippet={SNIPPETS[active]} filename={TABS[active].filename} />
          </div>

          {/* Right — info */}
          <div style={{ flex: 1 }}>
            <span
              style={{
                display: 'block',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '12px',
                fontWeight: 400,
                color: DS.textTertiary,
                letterSpacing: '0.12em',
                marginBottom: '18px',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {TABS[active].number}
            </span>

            <h3
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(28px, 2.8vw, 42px)',
                fontWeight: 300,
                color: DS.textPrimary,
                margin: '0 0 20px',
                lineHeight: 1.15,
              }}
            >
              {TABS[active].title}
            </h3>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 'clamp(14px, 1.1vw, 16px)',
                fontWeight: 300,
                color: DS.textSecondary,
                lineHeight: 1.8,
                margin: 0,
              }}
            >
              {TABS[active].description}
            </p>

            {/* Pill dots navigator */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '40px' }}>
              {TABS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => switchTab(i)}
                  style={{
                    height: '7px',
                    width: i === active ? '26px' : '7px',
                    borderRadius: '4px',
                    backgroundColor: i === active ? DS.gold : DS.border,
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    transition:
                      'width 350ms cubic-bezier(0.16,1,0.3,1), background-color 350ms cubic-bezier(0.16,1,0.3,1)',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── TabButton ─────────────────────────────────────────────────────────────────

function TabButton({ label, active, isLast, onClick }) {
  const ref = useRef(null)

  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseEnter={() => {
        if (!active && ref.current) ref.current.style.color = DS.textSecondary
      }}
      onMouseLeave={() => {
        if (!active && ref.current) ref.current.style.color = DS.textTertiary
      }}
      style={{
        flex: 1,
        padding: '18px 24px',
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '11px',
        fontWeight: 400,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: active ? '#0a0a0a' : DS.textTertiary,
        backgroundColor: active ? DS.textPrimary : 'transparent',
        border: 'none',
        borderRight: isLast ? 'none' : `1px solid ${DS.border}`,
        cursor: 'pointer',
        transition:
          'background-color 350ms cubic-bezier(0.16,1,0.3,1), color 350ms cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      {label}
    </button>
  )
}

// ── CodeCard ──────────────────────────────────────────────────────────────────

function CodeCard({ snippet, filename }) {
  return (
    <div
      style={{
        backgroundColor: '#0d1117',
        border: '1px solid #1e2733',
        borderRadius: '14px',
        overflow: 'hidden',
        boxShadow:
          '0 0 0 1px rgba(125,211,252,0.04), 0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(125,211,252,0.04)',
      }}
    >
      {/* Window chrome */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '12px 16px',
          borderBottom: '1px solid #1a2233',
          backgroundColor: '#090e17',
        }}
      >
        <div style={{ display: 'flex', gap: '6px' }}>
          {['#ff5f57', '#febc2e', '#28c840'].map((color, i) => (
            <div
              key={i}
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: color,
                opacity: 0.75,
              }}
            />
          ))}
        </div>
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '11px',
            fontWeight: 400,
            color: '#4b5563',
            letterSpacing: '0.04em',
          }}
        >
          {filename}
        </span>
      </div>

      {/* Code body */}
      <div style={{ padding: '20px 20px 24px' }}>
        <pre
          style={{
            fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
            fontSize: '12.5px',
            lineHeight: '1.72',
            margin: 0,
            padding: 0,
            overflowX: 'auto',
          }}
        >
          {snippet.map((line, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: '20px',
                minHeight: '1.72em',
              }}
            >
              {/* Line number */}
              <span
                style={{
                  color: '#3a4455',
                  minWidth: '18px',
                  textAlign: 'right',
                  flexShrink: 0,
                  userSelect: 'none',
                  fontSize: '11px',
                  paddingTop: '0.06em',
                }}
              >
                {i + 1}
              </span>

              {/* Line content */}
              <span>
                {line
                  ? line.map((seg, j) => (
                      <span key={j} style={{ color: CL[seg.c] || CL.base }}>
                        {seg.t}
                      </span>
                    ))
                  : null}
              </span>
            </div>
          ))}
        </pre>
      </div>
    </div>
  )
}
