import Header from './components/Header'
import Hero from './components/Hero'
import AboutMe from './components/AboutMe'
import Technologies from './components/Technologies'
import Experiencia from './components/Experiencia'
import Services from './components/Services'
import Formacion from './components/Formacion'
import Aprendiendo from './components/Aprendiendo'
import ContactForm from './components/ContactForm'

const Divider = () => (
  <div style={{ height: '1px', background: '#2a2a2a', margin: '64px 24px 0' }} />
)

function MobileApp() {
  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh' }}>
      <Header />
      <Hero />
      <main>
        <AboutMe />
        <Divider />
        <Technologies />
        <Divider />
        <Experiencia />
        <Divider />
        <Services />
        <Divider />
        <Formacion />
        <Divider />
        <Aprendiendo />
        <ContactForm />
      </main>
    </div>
  )
}

export default MobileApp
