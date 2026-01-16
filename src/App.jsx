import { useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import Technologies from './components/Technologies'
import AboutMe from './components/AboutMe'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'
import { useTheme } from './hooks/useTheme'

function App() {
  const { theme } = useTheme()

  useEffect(() => {
    // Inicializar AOS después de que el DOM esté listo
    const initAOS = () => {
      if (typeof window !== 'undefined' && window.AOS) {
        window.AOS.init({
          duration: 1000,
          once: false,
        })
      }
    }

    // Esperar a que AOS esté disponible
    if (typeof window !== 'undefined') {
      if (window.AOS) {
        initAOS()
      } else {
        // Si AOS no está disponible inmediatamente, esperar un poco
        setTimeout(initAOS, 100)
      }
    }
  }, [])

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <main className="pt-16">
        <Services />
        <Technologies />
        <AboutMe />
        <ContactForm />
      </main>
      <Footer />
    </div>
  )
}

export default App
