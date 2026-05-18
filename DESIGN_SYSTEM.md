# Design System — Portfolio Santiago

---

## 1. Paleta de colores

### Colores base

| Token | Hex | Uso |
|---|---|---|
| `bg` | `#0a0a0a` | Fondo principal de toda la página |
| `surface` | `#111111` | Cards principales (ProjectCard) |
| `surfaceAlt` | `#171717` | Panel derecho de ProjectCard, hover de TechCard |
| `border` | `#2a2a2a` | Bordes sutiles, divisores, separadores de sección |
| `borderLight` | `#3a3a3a` | Bordes en hover (links, chips) |

### Colores de texto

| Token | Hex | Uso |
|---|---|---|
| `textPrimary` | `#f0f0f0` | Headlines, nombre de proyecto activo, dots activos |
| `textSecondary` | `#a0a0a0` | Subtítulos, descripciones, roles, tags |
| `textTertiary` | `#404040–#606060` | Labels, íconos en reposo, metadata (varía por sección) |

> **Nota sobre textTertiary:** el valor exacto difiere por componente — `#404040` en Stack, `#505050` en MiHistoria y Proyectos, `#606060` en Experiencia. Usar `#505050` como referencia canónica.

### Acento dorado (uso limitado)

| Token | Hex | Uso |
|---|---|---|
| `gold` | `#d4a843` | Definido en el DS de Experiencia; reservado para CTA o énfasis futuro |

> El dorado está activo en **Formacion** (acento izquierdo en hover, badge "En curso", números de índice), **ComoTrabajo** (divisor, em del headline, números de steps) y **Aprendiendo** (dots de navegación). Hero, MiHistoria, Stack y Proyectos no lo utilizan.

### Paleta de Hero (blanco sobre negro)

| Valor | Uso |
|---|---|
| `#ffffff` | Headline principal |
| `rgba(255,255,255,0.9)` | Texto de botones |
| `rgba(255,255,255,0.55)` | Párrafo descriptivo, dot del badge |
| `rgba(255,255,255,0.3)` | Labels del scroll indicator |
| `rgba(255,255,255,0.15)` | Líneas del scroll indicator |
| `rgba(255,255,255,0.1)` | Border interior del mouse icon |
| `rgba(255,255,255,0.05)` | Fondo del badge de eyebrow |

### Acentos de proyecto (Proyectos — accent bar)

Cada proyecto tiene un color de acento individual, usado en la barra inferior del panel de stack:

| Proyecto | Hex |
|---|---|
| E-Commerce de Ropa | `#6366f1` (índigo) |
| Formula 1 Website | `#ef4444` (rojo) |
| Prototipo Inclusivo | `#10b981` (verde) |

---

## 2. Tipografía

### Fuentes

| Rol | Familia | Peso | Fuente |
|---|---|---|---|
| Headlines | Cormorant Garamond | 300 Light · 500 | Google Fonts |
| Cuerpo, UI, labels | DM Sans | 300 Light · 400 Regular · 500 Medium | Google Fonts |

### Escala tipográfica real (extraída de componentes)

| Nivel | Fuente | Tamaño | Peso | Uso |
|---|---|---|---|---|
| `hero-h1` | Cormorant Garamond | `clamp(40px, 5.5vw, 78px)` | 500 | Hero headline |
| `section-h1` | Cormorant Garamond | `clamp(56px, 7.5vw, 108px)` | 300 | MiHistoria |
| `section-h2` | Cormorant Garamond | `clamp(40px, 5vw, 72px)` | 300 | Stack · Experiencia |
| `proyectos-h2` | Cormorant Garamond | `clamp(48px, 6vw, 88px)` | 300 | Proyectos headline |
| `card-h3` | Cormorant Garamond | `clamp(26px, 2.8vw, 36px)` | 300 | Nombre de proyecto en card |
| `experience-h3` | Cormorant Garamond | `clamp(18px, 1.6vw, 22px)` | 300 | Nombre en tarjeta Experiencia |
| `body` | DM Sans | `clamp(15px, 1.2vw, 18px)` | 300 | Párrafos descriptivos |
| `body-sm` | DM Sans | `14px–15px` | 300 | Descripción en cards, roles |
| `ui` | DM Sans | `13px` | 400 | Skills tags, chips, categorías inactivas |
| `label` | DM Sans | `11px` · `letter-spacing: 0.2em` | 400 | Eyebrows uppercase ("Stack utilizado") |
| `micro` | DM Sans | `10px–12px` · `letter-spacing: 0.05–0.25em` | 400 | Badge hero, tipo de experiencia, scroll label |

### Reglas tipográficas
- `line-height: 1.0` en headlines con `clamp` grande — compresión visual
- `line-height: 1.75` en párrafos descriptivos de sección
- `letter-spacing: -0.02em` en headlines de sección para ajuste óptico
- La `em` cursiva se usa en una frase por headline (ej. Experiencia: *"que me formaron."*)
- Hero h1 usa `fontWeight: 500` — excepción al 300 general (más peso por el efecto BlurText)

---

## 3. Espaciado y layout

### Padding de sección

| Sección | Padding |
|---|---|
| Hero | Sin padding — centrado con flexbox, `maxWidth: 980px` en el contenido |
| MiHistoria | `clamp(64px, 8vw, 110px)` vertical · `clamp(40px, 6vw, 96px)` horizontal |
| Stack | Sticky left: `clamp(56px, 7vw, 100px)` v · `clamp(40px, 6vw, 96px)` h |
| Experiencia | `clamp(80px, 1vw, 180px)` vertical · `clamp(40px, 7vw, 130px)` horizontal |
| Proyectos | `clamp(64px, 8vw, 110px)` vertical · `clamp(40px, 6vw, 96px)` horizontal |

### Divisores entre secciones (App.jsx)

```css
height: 1px;
background: #2a2a2a;
margin: 64px clamp(40px, 6vw, 96px) 0;
```
Aparece entre Stack / Experiencia / Proyectos.

### Bordes y esquinas

```css
border-radius: 4px    /* skill tags en MiHistoria */
border-radius: 6px    /* stack chips en Proyectos */
border-radius: 8px    /* botones Hero */
border-radius: 10px   /* TechCard en Stack, links de proyecto */
border-radius: 12px   /* cards de Experiencia */
border-radius: 16px   /* ProjectCard principal */
border-radius: 20px   /* modal de Experiencia */
border-radius: 999px  /* badges, type tags, dots de navegación */
```

---

## 4. Secciones y estructura

### Orden de secciones

```
00 · IntroAnimation (cortina de entrada)
01 · Hero
02 · Mi Historia
── divisor 1px ──
03 · Stack
── divisor 1px ──
04 · Experiencia
── divisor 1px ──
05 · Proyectos
── divisor 1px ──
06 · Formación
── divisor 1px ──
07 · Aprendiendo
08 · Contáctame (incluye Footer integrado)
```

> `ComoTrabajo` existe como componente (`src/desktop/components/ComoTrabajo.jsx`) pero no está montado en `DesktopApp` actualmente.

### Layout por sección

#### 01 — Hero
```
Viewport: 100vh, overflow hidden
Layout: una columna centrada · maxWidth 980px · padding 0 48px
Fondo: SmokeShader (WebGL shader animado en canvas) sobre #0a0a0a
Fade bottom: gradiente linear transparent→#0a0a0a de 260px
Parallax: el contenido sube (translateY × 0.28 scroll) y se desvanece al hacer scroll

Eyebrow badge:
  · bg rgba(255,255,255,0.05) · border rgba(255,255,255,0.1)
  · dot blanco 6px + label DM Sans 12px uppercase

Headline:
  · Cormorant 500 · clamp(40px, 5.5vw, 78px)
  · color #ffffff · line-height 1.0
  · animación BlurText: cada carácter con blur → opacity 0→1, stagger 35ms

Descripción:
  · DM Sans 300 · 15px · color rgba(255,255,255,0.55)
  · animación blurIn a los 1.4s post-intro

Botones (×2, misma apariencia):
  · Fondo: gradient border blanco sobre rgba(10,10,10,0.85)
  · border-radius 8px · padding 13px 30px · DM Sans 500 14px
  · hover: intensifica el border blanco + box-shadow blanco sutil
  · sin distinción visual entre primario y secundario

Scroll indicator:
  · líneas 110px × 1px · color rgba(255,255,255,0.15)
  · mouse icon 20×32px · dot animado scrollBob 1.5s
  · labels "Scroll down" / "to see projects" · DM Sans 11px · ls 0.1em
```

#### 02 — Mi Historia
```
id: #mi-historia
Layout: CSS Grid 2 columnas 1fr 1fr · height 100vh · overflow hidden

Columna izquierda (texto):
  · Headline: Cormorant 300 · clamp(56px, 7.5vw, 108px) · #f0f0f0
  · Párrafo: DM Sans 300 · clamp(15px, 1.2vw, 18px) · #a0a0a0 · maxWidth 540px
  · Divider: 1px solid #2a2a2a
  · Skills tags: border 1px #2a2a2a · borderRadius 4px · padding 6px 14px
    → sin fondo, sin hover — texto #a0a0a0 · DM Sans 400 · 13px
  · Divider: 1px solid #2a2a2a
  · Experience table: grid 3 columnas (rol / empresa / año)
    → rol: #a0a0a0 · empresa y año: #505050 · separados por borders

Columna derecha (foto):
  · img fill width · maxHeight 80vh · objectFit cover · objectPosition center 35%
  · borderRadius 4px · padding top 100px

Animación entrada:
  · ambas columnas: opacity 0 → 1 + translateY(40px) → 0
  · foto con delay 0.2s · easing cubic-bezier(0.16,1,0.3,1) 0.75s
  · trigger: IntersectionObserver threshold 0.12
```

#### 03 — Stack
```
id: #stack
Layout: CSS Grid 2 columnas — 400px fijos (izquierda) · 1fr (derecha)

Columna izquierda — sticky:
  · position sticky top 0 · height 100vh
  · Headline: Cormorant 300 · clamp(40px, 5vw, 72px)
  · Descripción: DM Sans 300 · clamp(13px, 1vw, 15px) · maxWidth 300px
  · Lista de categorías (scroll-spy activo):
    → inactivo: Cormorant 300 · clamp(15px, 1.5vw, 19px) · color #404040
    → activo: tamaño clamp(22px, 2.4vw, 32px) · color #f0f0f0 + descripción expandible
    → transición de font-size 0.45s · borderTop 1px #2a2a2a

Columna derecha — scrolleable:
  · Cada grupo ocupa 100vh de altura
  · TechCard: flex column · icono 52px · label 13px
    → reposo: icono #404040 · fondo transparent
    → hover: icono en color de marca · fondo #111111 · border #3a3a3a
    → padding 44px 36px · borderRadius 10px · minWidth 140px

Scroll behavior:
  · activeIndex = round(scrolledPx / innerHeight)
  · group inactivo: opacity 0.1 + translateY(20px)
  · group activo: opacity 1 + translateY(0)

Grupos (5):
  1. Frontend — React · Vue · Next.js · JS · TS · Bootstrap · Three.js
  2. Backend — Node.js · Express · NestJS · Python · Django · Clerk
  3. Bases de datos — PostgreSQL · Prisma · MySQL · MongoDB
  4. Inteligencia Artificial — Claude/Anthropic · OpenAI · N8N · Langchain · Ollama
  5. Herramientas — Git · GitHub · Vercel · Railway · Render · Postman · Jira
```

#### 04 — Experiencia
```
id: #experiencia
Layout: flex row · gap 20px · justifyContent center
Headline: Cormorant 300 · clamp(40px, 5vw, 64px) + em italic en segunda línea

Cards (4, formato retrato):
  · flex 1 1 0 · maxWidth 280px · height clamp(300px, 24vw, 380px)
  · borderRadius 12px · overflow hidden · position relative
  · Fondo: bgColor sólido o bgImage (ej. logo Globant)
    → estado reposo: grayscale(1) brightness(0.55)
    → hover: grayscale(0) brightness(0.85) + scale(1.07)
    → transición 0.55s cubic-bezier(0.16,1,0.3,1)
  · Overlay gradient: rgba(0,0,0,0.1) → rgba(0,0,0,0.75) bottom
  · Type tag (top-left): DM Sans 10px · ls 0.25em · uppercase
    · border rgba(240,240,240,0.35) · bg rgba(0,0,0,0.3) · pill
  · Nombre: Cormorant 300 · clamp(18px, 1.6vw, 22px) · #ffffff
  · Rol + período: DM Sans 300 · 13px · rgba(255,255,255,0.65)
  · Botón "Qué desarrollé":
    → bg rgba(255,255,255,0.1) · border rgba(255,255,255,0.35) · pill
    → hover: bg #ffffff · text #0a0a0a · border #ffffff

Modal al abrir card:
  · overlay: rgba(0,0,0,0.75) + backdropFilter blur(8px)
  · card: bg #111111 · border 1px #2a2a2a · borderRadius 20px · maxWidth 640px
  · type tag · headline Cormorant · role/period DM Sans
  · placeholder area: bg #1a1a1a · border dashed #2a2a2a · borderRadius 12px
```

#### 05 — Proyectos (ComoTrabajo — no montado actualmente)

> `ComoTrabajo` está listo para insertar entre Proyectos y Formación cuando corresponda.

```
id: #como-trabajo
Layout: una columna · padding clamp(80px,10vw,180px) clamp(40px,7vw,130px)

Encabezado:
  · Divisor gold: 48×1px · color #d4a843 · marginBottom 48px
  · Section label: DM Sans 400 · 11px · ls 0.3em · uppercase · textTertiary
  · Headline: Cormorant 300 · clamp(40px, 5vw, 64px) · maxWidth 640px
    → segunda línea: <em> italic en color gold (#d4a843)
  · Animación: translateY(40px)→0 + opacity 0→1 · 0.7s · IntersectionObserver 0.15

Steps row (flex horizontal, 4 steps):
  · Cada step: flex 1 · número + título + descripción
  · Número: Cormorant 300 · clamp(48px, 5vw, 72px) · color gold · marginBottom 24px
  · Título: DM Sans 500 · 18px · ls -0.01em · textPrimary
  · Descripción: DM Sans 300 · 15px · lh 1.6 · textSecondary · maxWidth 220px
  · Connector line entre steps: flex 0 0 clamp(24px,4vw,56px) · 1px · color border (#2a2a2a)
    → marginTop clamp(24px,2.5vw,36px) para alinear con el número
  · Animación: cada step translateY(40px)→0 + opacity 0→1 · 0.7s · stagger 0.15s por step
```

#### 05 — Proyectos
```
id: #proyectos
Layout: apilamiento 3D (stack carousel)

Headline: Cormorant 300 · clamp(48px, 6vw, 88px) · ls -0.02em

Stack carousel:
  · Contenedor: height 460px · position relative
  · Cada card: position absolute · height 380px
  · offset 0 (activo): top 80px · inset 0% · opacity 1
  · offset 1: top 44px · inset 2% · opacity 0.65 · blur 1.5px
  · offset 2: top 12px · inset 4.5% · opacity 0.35 · blur 3px
  · Rotación automática cada 3s (clearInterval al click manual)
  · Transición: 0.6s cubic-bezier(0.16,1,0.3,1)

Dots de navegación:
  · activo: width 24px · color #f0f0f0
  · inactivo: width 8px · color #2a2a2a
  · height 8px · pill · transición width 0.35s

Quote (rotativo bajo carousel):
  · Cormorant 300 italic · clamp(18px, 2vw, 24px) · #a0a0a0
  · fade + translateY(8px)→0 en 0.5s

ProjectCard (interna):
  · bg #111111 · border 1px #2a2a2a · borderRadius 16px
  · Browser chrome header: iconos tertiary (#505050) · border bottom #2a2a2a
  · Grid 2 columnas: contenido 1fr · panel stack 340px fijos

  Columna contenido:
    · Nombre: Cormorant 300 · clamp(26px, 2.8vw, 36px) · #f0f0f0
    · Descripción: DM Sans 300 · 14px · #a0a0a0
    · Dos links (repo + live): bg #171717 · border #2a2a2a · borderRadius 10px
      → hover: border #3a3a3a · text #f0f0f0

  Columna stack:
    · bg #171717 · borderLeft 1px #2a2a2a
    · Label "Stack utilizado": DM Sans 400 · 11px · ls 0.2em · uppercase · #505050
    · StackChips: icono + nombre, border · borderRadius 6px
      → reposo: icono #505050 · texto #505050 · bg transparent
      → hover: icono en color de marca · texto #a0a0a0 · bg #1e1e1e · border #3a3a3a
    · Accent bar: 3px · borderRadius pill · color específico del proyecto · opacity 0.6
```

#### 06 — Formación

```
id: #formacion
Layout: una columna · padding clamp(80px,8vw,110px) clamp(40px,7vw,130px)

Header (flex row space-between, alineado al bottom):
  · Headline: Cormorant 300 · clamp(40px, 5vw, 64px) · lh 1.1
    → línea 1 "Mi formación" + línea 2 <em italic> "académica."
    → animación curtain reveal: cada línea en overflow:hidden · translateY(110%)→0
      · línea 1: 950ms · línea 2: 950ms con delay 90ms
  · Descripción (derecha): DM Sans 300 · clamp(14px, 1.1vw, 16px) · lh 1.8 · maxWidth 360px
    → animación: cada palabra como <span data-word> · fade+translateY(10px)→0
      · stagger 26ms por palabra · delay inicial 220ms tras trigger de sección

Filas de formación (tabla animada):
  · Layout: flex row · padding 26px 12px · borderRadius 6px
  · Columnas: índice (28px) · tipo-chip · grado+institución (flex 1) · período (140px) · badge-estado (100px) · flecha (13px)
  · Fondo reposo: transparent → hover: radial-gradient gold 5% desde izquierda
  · Barra dorada izquierda: 3px × 48% height · color gold · visible solo en hover con glow pulsante
    → animación: fm-accent-glow 2.2s infinite al hover
  · Índice: DM Sans 400 · 11px · ls 0.1em · textTertiary → hover #909090

  Chip tipo:
    · border 1px #2a2a2a · pill (999px) · DM Sans 400 10px · ls 0.2em · uppercase
    · width fijo 116px · textAlign center · textSecondary

  Grado + institución:
    · grado: Cormorant 300 · clamp(17px, 1.45vw, 22px) · textPrimary · lh 1.2 · truncado
    · institución: DM Sans 300 · 13px · textSecondary

  Período: DM Sans 300 · 13px · textTertiary · width 140px · textAlign right

  Badge estado:
    · activo ("En curso"): color gold · border rgba(212,168,67,0.45) · bg rgba(212,168,67,0.07)
      → animación: fm-badge-pulse 2.8s infinite
    · completado: color textTertiary · border #2a2a2a · bg transparent
    · DM Sans 400 10px · ls 0.15em · uppercase · pill · width 100px

  Flecha: SVG 13×13 · color textTertiary → hover textPrimary
    · hover: translate(5px, -5px) — movimiento diagonal · transición 280ms

Animaciones de entrada por fila (IntersectionObserver threshold 0.04):
  · Border top: scaleX(0)→scaleX(1) · transformOrigin left · 750ms · stagger 55ms por fila
  · Fila: translateX(-20px)→0 + opacity 0→1 · 700ms · stagger 65ms
  · Índice: efecto scramble (caracteres random 0-9) → valor final · 480ms · delay 150ms
```

#### 07 — Aprendiendo

```
id: #aprendiendo
Layout: una columna · padding clamp(80px,8vw,110px) clamp(40px,7vw,130px)

Headline:
  · Cormorant 300 · clamp(40px, 5vw, 64px) · lh 1.1 · marginBottom 64px
  · Dos líneas con curtain reveal igual al de Formación (translateY(110%)→0, 950ms)
  · línea 2 <em italic> "aprendiendo."

Panel principal (card con borde):
  · border 1px #2a2a2a · borderRadius 20px · overflow hidden
  · Entrada: opacity 0→1 + translateY(28px)→0 · 750ms · delay 250ms tras trigger

Tab bar:
  · Flex row · borderBottom 1px #2a2a2a
  · 4 tabs: Integración de IA · LLMs · Agentes de IA · MCPs
  · activo: bg #f0f0f0 · color #0a0a0a
  · inactivo: bg transparent · color textTertiary → hover textSecondary
  · DM Sans 400 · 11px · ls 0.18em · uppercase · padding 18px 24px
  · borderRight 1px #2a2a2a entre tabs (no en el último)
  · transición bg+color 350ms

Content (padding clamp(36px,5vw,64px)):
  · Grid 2 columnas: CodeCard (50%) · info panel (flex 1)
  · Switch de tab: fade out 230ms (opacity+translateY(10px)) → setActive → fade in

CodeCard (editor simulado):
  · bg #0d1117 · border 1px #1e2733 · borderRadius 14px · overflow hidden
  · box-shadow: glow sutil sky-blue rgba(125,211,252,0.04)
  · Chrome: bg #090e17 · dots macOS (rojo #ff5f57, amarillo #febc2e, verde #28c840) · filename DM Sans 11px #4b5563
  · Cuerpo código: padding 20px 20px 24px · font JetBrains Mono 12.5px · lh 1.72
  · Líneas numeradas (número en #3a4455) + tokens con syntax highlighting:
    → kw #7dd3fc (keywords · sky blue)
    → str #86efac (strings · green)
    → cm #6b7280 (comments · slate)
    → fn #c4b5fd (functions · violet)
    → pr #f9a8d4 (properties · pink)
    → nm #fbbf24 (numbers · amber)
    → base #e2e8f0 (default · near white)

Info panel:
  · Número: DM Sans 400 · 12px · ls 0.12em · textTertiary · tabular-nums
  · Título: Cormorant 300 · clamp(28px, 2.8vw, 42px) · lh 1.15 · textPrimary
  · Descripción: DM Sans 300 · clamp(14px, 1.1vw, 16px) · lh 1.8 · textSecondary
  · Pill dots (×4):
    · activo: width 26px · color gold (#d4a843)
    · inactivo: width 7px · color #2a2a2a
    · height 7px · borderRadius 4px · transición width+bg 350ms

Tabs disponibles:
  1. Integración de IA — anthropic-client.js (Claude SDK)
  2. LLMs — llm-pipeline.py (HuggingFace / Llama)
  3. Agentes de IA — ai-agent.js (tool use con Claude)
  4. MCPs — mcp-server.js (Model Context Protocol)
```

#### 08 — Contáctame

```
id: #contactame
Layout: position relative · overflow hidden · sin padding exterior en la sección

Fondo:
  · SmokeShader (mismo WebGL que Hero) con parallax · posición absolute inset con ±220px headroom
  · Parallax: translateY(rect.top × 0.28) en scroll · igual que Hero
  · Gradiente top: linear #0a0a0a→transparent de 50% altura · oculta la transición entre secciones

Tokens de color (sobre fondo oscuro/smoke — distintos a otras secciones):
  · textPrimary: #ffffff · textSecondary: rgba(255,255,255,0.55) · textTertiary: rgba(255,255,255,0.28)
  · border: rgba(255,255,255,0.1) · borderFocus: rgba(255,255,255,0.55)
  · gold: #d4a843 · goldDim: #a07830

Contenido (padding clamp(110px,13vw,190px) clamp(40px,7vw,130px) 0 · z-index 3):
  · Section label: DM Sans 400 · 11px · ls 0.3em · uppercase · textTertiary
  · Grid 2 columnas: 1fr (izquierda) · 1.2fr (derecha)
  · Ambas columnas: opacity 0→1 + translateY(40px)→0 · 0.75s · derecha con delay 0.15s

Columna izquierda:
  · Headline: Cormorant italic 300 · clamp(40px, 5vw, 64px) · lh 1.1 · #ffffff
  · Párrafo: DM Sans 300 · 16px · lh 1.75 · textSecondary · maxWidth 400px
  · Social links (×3): GitHub · LinkedIn · Email
    → icono en círculo 40×40 · border rgba(255,255,255,0.1) · DM Sans 300 14px
    → hover: icono y texto a #ffffff · fondo glass-border gradient (igual botón Hero) · border glass

Columna derecha — formulario:
  · Grid 2 cols (nombre + email) · textarea mensaje (6 rows)
  · Campos: bg rgba(0,0,0,0.35) · border rgba(255,255,255,0.1) · borderRadius 8px
    → focus: border rgba(255,255,255,0.55) · transición 250ms
  · Botón enviar: mismo glass-border que Hero · DM Sans 500 14px · padding 13px 30px
  · Estados: sending (opacity 0.5, cursor not-allowed) · success (gold msg) · error (#e05c5c msg)
  · EmailJS: serviceId service_bkp9ew4 · templateId template_7b6zssd

Footer (integrado dentro de Contactame):
  · position relative · z-index 3 · borderTop rgba(255,255,255,0.08) · backdropFilter blur(4px)
  · Fila superior: nombre+tagline · nav links · iconos sociales
    · Nombre: Cormorant italic 300 · 18px · rgba(255,255,255,0.45)
    · Tagline: DM Sans 300 · 12px · ls 0.05em · rgba(255,255,255,0.22)
    · Nav: 8 links · DM Sans 300 · 13px · rgba(255,255,255,0.28) → hover #ffffff · 250ms
    · Iconos: GitHub + LinkedIn · 16px · rgba(255,255,255,0.28) → hover #ffffff
  · Fila inferior (borderTop rgba(255,255,255,0.06)):
    · Copyright y "Diseñado y construido con precision" (em italic gold)
    · DM Sans 300 · 12px · rgba(255,255,255,0.18)
```

---

## 5. Animaciones

### Principios
- **Propósito ante todo** — cada animación comunica algo, no decora
- **Duración**: `200ms` micro-hover · `550–600ms` transiciones de sección · `750ms` entradas con observer
- **Easing estándar**: `cubic-bezier(0.16, 1, 0.3, 1)` — arranque rápido, desaceleración suave
- **Sin loop infinito** salvo scrollBob del hero

### Animaciones por componente

#### Hero
```
blurIn: opacity 0→1 + filter blur(8px)→blur(0)
  · Headline: char por char · stagger 35ms · duración 0.55s · delay post-intro
  · Párrafo: animación blurIn 0.8s · delay 1.4s
  · Botones: fadeSlideUp 0.6s · delay 2.0s
scrollBob: dot del mouse icon sube/baja · 1.5s ease-in-out infinite
Parallax: translateY(-scrollY × 0.28) + opacity fade al 65% del vh
```

#### MiHistoria
```
IntersectionObserver threshold 0.12:
  · columna texto: translateY(40px)→0 + opacity 0→1 · 0.75s
  · columna foto: misma animación · delay 0.2s
```

#### Stack
```
Scroll-spy: activeIndex = round(scrolled / innerHeight)
  · Categoría activa: font-size crece + descripción expand (max-height 0→80px)
  · Grid de íconos activo: opacity 0.1→1 + translateY(20px)→0 · 0.55s
  · Grid inactivo: opacity→0.1 + translateY(20px) · 0.55s
```

#### Experiencia
```
Card hover: bg filter grayscale(1) br(0.55) → grayscale(0) br(0.85) + scale(1.07) · 0.55s
Botón hover: bg+color+border en 250ms
Modal: aparece con backdrop blur
```

#### Proyectos
```
Stack carousel: top/left/right/opacity/filter en 0.6s cubic por slot
Quote: opacity + translateY(8px)→0 en 0.5s
Dot activo: width 8px→24px en 0.35s
```

#### Formación
```
Curtain reveal headline (igual Aprendiendo):
  · Cada línea envuelta en overflow:hidden + paddingBottom 0.06em
  · span/em: translateY(110%)→0 · 950ms cubic
  · línea 2 con delay 90ms

Word fade descripción:
  · Cada palabra en <span data-word> inline-block
  · opacity 0→1 + translateY(10px)→0 · 420ms cubic · stagger 26ms · delay inicial 220ms

Border draw por fila (IntersectionObserver threshold 0.04):
  · div absolute top 0 left 0 right 0 height 1px
  · transform scaleX(0)→scaleX(1) · transformOrigin left · 750ms · stagger 55ms

Slide-in por fila:
  · translateX(-20px)→0 + opacity 0→1 · 700ms cubic · stagger 65ms · delay 50ms tras border

Scramble de índice:
  · Caracteres random de "0123456789" · requestAnimationFrame 480ms → valor final
  · delay 150ms tras slide-in

Hover por fila:
  · Fondo: radial-gradient ellipse 55% 80% at 0% 50% gold 5% → surface 65% · transición 300ms
  · Barra dorada izquierda: opacity 0→1 · 280ms + animation fm-accent-glow al entrar
  · Índice: color textTertiary→#909090 · 280ms
  · Flecha: translate(0)→translate(5px,-5px) + color→textPrimary · 280ms

Keyframes:
  fm-badge-pulse: box-shadow 0→8px gold · 2.8s ease-in-out infinite (badges "En curso")
  fm-accent-glow: box-shadow lateral gold 0.2→0.55 opacity · 2.2s ease-in-out infinite
```

#### Aprendiendo
```
Curtain reveal headline: idéntico al de Formación (950ms, delay 90ms en línea 2)

Panel entrada:
  · opacity 0→1 + translateY(28px)→0 · 750ms cubic · delay 250ms

Tab switch:
  · Fade out: opacity 0 + translateY(10px) · 230ms → setActive()
  · Fade in: opacity 1 + translateY(0) · 230ms (doble rAF para forzar repaint)

Tab button hover:
  · inactivo: color textTertiary → textSecondary · 350ms
  · activo ↔ inactivo: bg #f0f0f0↔transparent + color #0a0a0a↔textTertiary · 350ms

Pill dots:
  · activo: width 7px→26px + bg border→gold · 350ms cubic
```

#### Contáctame
```
Parallax shader: mismo mecanismo que Hero — translateY(rect.top × 0.28) en scroll (passive)

Content fade-in (IntersectionObserver threshold 0.08):
  · columna izquierda: opacity 0→1 + translateY(40px)→0 · 0.75s cubic
  · columna derecha: igual con delay 0.15s

Social link hover:
  · texto: textSecondary→#ffffff · 250ms
  · círculo icono: border glass-gradient + bg glass-gradient · 250ms

Submit button hover:
  · bg: gradientBorder(0.55)→gradientBorder(0.9) · 200ms
  · color: rgba(255,255,255,0.9)→#ffffff · 200ms
  · box-shadow: none→rgba(255,255,255,0.08) 14px · 200ms

Field focus: borderColor rgba(255,255,255,0.1)→rgba(255,255,255,0.55) · 250ms
```

#### ComoTrabajo (componente no montado)
```
Headline entrance (IntersectionObserver threshold 0.15):
  · opacity 0→1 + translateY(40px)→0 · 0.7s cubic

Steps entrance (mismo observer):
  · Cada step: opacity 0→1 + translateY(40px)→0 · 0.7s cubic · stagger 0.15s por step
```

---

## 6. Componentes UI

### Botones

```
Hero (glass border):
  fondo: gradient(rgba(10,10,10,0.85)) padding-box + gradient blanco border-box
  texto: rgba(255,255,255,0.9)
  padding: 13px 30px · radius 8px · DM Sans 500 14px
  hover: intensifica blanco en border + box-shadow rgba(255,255,255,0.08)

Experiencia card CTA:
  bg: rgba(255,255,255,0.1) · border: rgba(255,255,255,0.35) · pill
  hover: bg #ffffff · text #0a0a0a

Modal close button:
  40×40px · circle · border #2a2a2a
  hover: bg #2a2a2a · border #3a3a3a
```

### Tags / Chips

```
Skill tags (MiHistoria):
  border: 1px solid #2a2a2a · radius 4px · padding 6px 14px
  texto: #a0a0a0 · DM Sans 400 13px · sin fondo · sin hover

Stack chips (Proyectos):
  border: 1px solid #2a2a2a → hover #3a3a3a · radius 6px · padding 8px 14px
  reposo: icono + texto #505050 · bg transparent
  hover: icono en color de marca · texto #a0a0a0 · bg #1e1e1e

Type tag (Experiencia):
  uppercase · ls 0.25em · DM Sans 400 10px · pill
  en card: border rgba(240,240,240,0.35) · bg rgba(0,0,0,0.3) · texto #f0f0f0
  en modal: border #2a2a2a · texto #a0a0a0
```

### Scroll indicator (Hero)
```
Texto "Scroll down" / "to see projects": DM Sans 11px · ls 0.1em · rgba(255,255,255,0.3)
Líneas laterales: 110×1px · rgba(255,255,255,0.15)
Mouse icon: 20×32px · border rgba(255,255,255,0.28) · radius 10px
Dot interior: 2×6px · rgba(255,255,255,0.55) · animación scrollBob
```

---

## 7. IntroAnimation

```
Cortina negra que se retira al cargar la página
Al completarse, activa:
  · Header visible
  · BlurText del headline
  · Animaciones con delay (párrafo 1.4s, botones 2.0s)
Prop introComplete: boolean pasado a Hero
```

---

## 8. Navbar (Header)

```
Posición: fixed top · z alto
Fondo: transparent → rgba(10,10,10,0.85) al hacer scroll + backdrop-filter blur
Links: DM Sans · color textTertiary · hover gold (reservado) o textPrimary
Border-bottom: 1px solid #2a2a2a · aparece al hacer scroll
```

---

## 9. Assets y recursos

### Fuentes (Google Fonts)
```
https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,500;1,300&family=DM+Sans:wght@300;400;500&display=swap
```

### Íconos
```
react-icons/si — iconos de marca para tecnologías (con colores de marca en hover)
react-icons/fi — Feather icons para UI (FiGithub, FiExternalLink) — color textTertiary/textSecondary
Tamaño estándar UI: 18px · Tamaño TechCard: 52px
```

### Imágenes
```
src/img/miHistoriaImage.jpg — foto de perfil (MiHistoria, col. derecha)
src/img/globantCompany-logo.webp — fondo card Experiencia (Globant)
```

---

## 10. Responsive

> El diseño desktop está definido y activo. El responsive se gestiona con `useDevice` que monta `DesktopApp` o `MobileApp` según el viewport.

| Breakpoint | Dispositivo |
|---|---|
| `< umbral` | MobileApp (src/mobile/) |
| `≥ umbral` | DesktopApp (src/desktop/) |

Los layouts de las secciones documentadas en este archivo corresponden exclusivamente a **DesktopApp**.

---

*Versión 3.0 — actualizada con Formación, Aprendiendo, Contáctame/Footer y ComoTrabajo (no montado). Animaciones curtain reveal, scramble, border draw y parallax shader documentadas.*
