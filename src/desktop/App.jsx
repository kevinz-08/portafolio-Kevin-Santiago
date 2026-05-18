import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import Header from './components/Header'
import IntroAnimation from './components/IntroAnimation'
import MiHistoria from './components/MiHistoria'
import Stack from './components/Stack'
import Experiencia from './components/Experiencia'
import Formacion from './components/Formacion'
import Aprendiendo from './components/Aprendiendo'
import Proyectos from './components/Proyectos'
import Contactame from './components/Contactame'
import { useTheme } from '../hooks/useTheme'

function DesktopApp() {
  useTheme()
  const [introComplete, setIntroComplete] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const init = () => window.AOS?.init({ duration: 1000, once: true })
      window.AOS ? init() : setTimeout(init, 100)
    }
  }, [])

  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh' }}>
      <IntroAnimation onComplete={() => setIntroComplete(true)} />
      <Header visible={introComplete} />
      <Hero introComplete={introComplete} />
      <MiHistoria />
      <div style={{ height: '1px', backgroundColor: '#2a2a2a', margin: '64px clamp(40px, 6vw, 96px) 0' }} />
      <Stack />
      <div style={{ height: '1px', backgroundColor: '#2a2a2a', margin: '64px clamp(40px, 6vw, 96px) 0' }} />
      <Experiencia />
      <div style={{ height: '1px', backgroundColor: '#2a2a2a', margin: '64px clamp(40px, 6vw, 96px) 0' }} />
      <Proyectos />
      <div style={{ height: '1px', backgroundColor: '#2a2a2a', margin: '64px clamp(40px, 6vw, 96px) 0' }} />
      <Formacion />
      <div style={{ height: '1px', backgroundColor: '#2a2a2a', margin: '64px clamp(40px, 6vw, 96px) 0' }} />
      <Aprendiendo />
      <Contactame />
    </div>
  )
}

export default DesktopApp
