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

> El dorado está **declarado pero no activo** en las secciones actuales. Hero, MiHistoria, Stack y Proyectos no lo utilizan.

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
06 · Métricas
07 · Contáctame
08 · Footer
```

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

*Versión 2.0 — actualizada con implementación real de Hero, MiHistoria, Stack, Experiencia y Proyectos.*
