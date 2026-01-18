import { useTypewriter } from '../hooks/useTypewriter'
import { useCounter } from '../hooks/useCounter'
import { useParallax } from '../hooks/useParallax'
import { useTheme } from '../hooks/useTheme'
import logoWhite from '../img/logo-white.png'
import logoBlack from '../img/logo-black.png'
import cvPdf from '../img/Kevin Gutierrez - HV.pdf'
import heroImage from '../img/kevin 16-9.png'

const texts = ['Backend Developer', 'Frontend Developer', 'Fullstack Developer']

const stats = [
  { label: 'Experiences', target: 3 },
  { label: 'Projects Done', target: 10 },
  { label: 'Happy Clients', target: 5 },
]

export default function Hero() {
  const displayText = useTypewriter(texts)
  const { theme } = useTheme()
  const { getParallaxStyle } = useParallax()

  const handleHireMe = () => {
    const correo = 'kevingadev@gmail.com'
    const asunto = 'Consulta desde el portafolio web'
    const cuerpo = 'Hola Kevin, me gustaria contactarme contigo para una posible oportunidad, consulta, diagnostico, etc.'
    window.location.href = `mailto:${correo}?subject=${encodeURIComponent(asunto)}&body=${cuerpo}`
  }

  const handleArrowClick = () => {
    document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Hero Section con imagen de fondo */}
      <div className="relative h-screen w-full flex flex-col items-center justify-center text-center px-5 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${heroImage})`, backgroundPosition: '45% center' }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70 z-0"></div>
        <h1
          className="text-4xl md:text-5xl lg:text-6xl mb-8 md:mb-16 text-gray-100 font-lato-bold z-10 relative"
          style={getParallaxStyle()}
        >
          Always Learning.<br />Always Creating
        </h1>
        <div
          onClick={handleArrowClick}
          className="text-gray-100 text-2xl md:text-4xl animate-bounce-slow z-10 relative cursor-pointer"
        >
          <i className="fa-solid fa-angle-down"></i>
        </div>
      </div>

      {/* Sección Home */}
      <section id="home" className="scroll-mt-16 pt-20 px-5 md:px-20">
        <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto">
          {/* Contenido de texto */}
          <div className="mt-20 md:mt-28 flex flex-col w-full md:w-1/2">
            <div className="mb-6">
              <p className="text-text-secondary dark:text-text-secondary text-xl md:text-2xl font-lato-semibold">
                Hi I am
              </p>
              <h1 className="text-text-primary dark:text-text-primary text-2xl md:text-3xl lg:text-4xl font-lato-bold">
                Kevin Gutierrez
              </h1>
            </div>

            <h4 className="text-3xl md:text-4xl lg:text-5xl font-lato-black text-gradient mb-8">
              {displayText}
              <span className="animate-pulse">|</span>
            </h4>

            {/* Links sociales */}
            <div className="flex gap-8 mb-8">
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-primary dark:text-text-primary bg-border border-border rounded-full w-10 h-10 flex items-center justify-center text-xl md:text-2xl hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/kevin-gutierrez-b4214535b/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-primary dark:text-text-primary bg-border border-border rounded-full w-10 h-10 flex items-center justify-center text-xl md:text-2xl hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <i className="fa-brands fa-linkedin"></i>
              </a>
              <a
                href="https://github.com/kevinz-08"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-primary dark:text-text-primary bg-border border-border rounded-full w-10 h-10 flex items-center justify-center text-xl md:text-2xl hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <i className="fa-brands fa-github"></i>
              </a>
            </div>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-4 md:gap-5 mb-10">
              <button
                onClick={handleHireMe}
                className="w-full sm:w-36 md:w-40 h-10 md:h-12 rounded-lg bg-gradient-primary text-white font-lato-bold text-base md:text-lg font-semibold cursor-pointer transition-all duration-400 hover:scale-105 hover:shadow-lg hover:shadow-primary/50"
              >
                Hire Me
              </button>
              <a
                href={cvPdf}
                download
                className="w-full sm:w-36 md:w-40 h-10 md:h-12 rounded-lg bg-transparent text-text-primary dark:text-text-primary border-2 border-text-primary dark:border-text-primary flex items-center justify-center font-lato-bold text-base md:text-lg font-semibold cursor-pointer transition-all duration-400 hover:scale-105 hover:bg-text-primary dark:hover:bg-text-primary hover:text-bg-primary dark:hover:text-bg-primary"
              >
                Download CV
              </a>
            </div>

            {/* Stats Box */}
            <StatsBox stats={stats} />
          </div>

          {/* Foto/Logo */}
          <div className="mt-10 md:mt-0 md:ml-12 lg:ml-48 bg-bg-card dark:bg-bg-card rounded-full flex items-center justify-center" data-aos="fade-left">
            <img
              src={theme === 'dark' ? logoWhite : logoBlack}
              alt="Logo Kevin Gutierrez"
              className="w-32 md:w-48 lg:w-64 h-auto"
            />
          </div>
        </div>
      </section>
    </>
  )
}

function StatsBox({ stats }) {
  return (
    <div
      className="w-full md:w-[534px] h-auto md:h-[125px] bg-bg-card dark:bg-bg-card rounded-lg flex flex-col md:flex-row gap-4 md:gap-8 p-6 md:p-0 font-lato-bold mt-10"
      data-aos="fade-up"
    >
      {stats.map((stat, index) => (
        <StatItem key={index} label={stat.label} target={stat.target} isLast={index === stats.length - 1} />
      ))}
    </div>
  )
}

function StatItem({ label, target, isLast }) {
  const { count, elementRef } = useCounter(target)

  return (
    <div
      ref={elementRef}
      className={`flex-1 md:flex-none md:w-36 text-center md:text-left ${
        !isLast ? 'md:border-r-2 border-primary pb-4 md:pb-0' : ''
      } ${isLast ? '' : 'md:pl-6'} md:pt-6`}
    >
      <h1 className="text-text-primary dark:text-text-primary text-2xl md:text-3xl">
        +{count}
      </h1>
      <p className="text-text-primary dark:text-text-primary text-sm md:text-base mt-3">
        {label}
      </p>
    </div>
  )
}
