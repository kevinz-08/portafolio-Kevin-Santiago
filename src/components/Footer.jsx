import signature from '../img/firma.png'

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#services', label: 'Services' },
  { href: '#technologies', label: 'Technologies' },
  { href: '#about-me', label: 'About Me' },
  { href: '#contact-me', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="mt-48 md:mt-64 bg-bg-primary dark:bg-bg-primary text-text-primary dark:text-text-primary py-10 px-5 font-lato-medium transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-between gap-10 mb-8">
          {/* Logo y descripción */}
          <div className="footer-logo">
            <img src={signature} alt="Logo Kevin Gutierrez" className="max-w-[150px] mb-2.5" />
            <p className="text-sm text-text-secondary dark:text-text-secondary">
              Building web experiences with passion and precision.
            </p>
          </div>

          {/* Navegación */}
          <div className="footer-links">
            <h3 className="font-lato-bold mb-2.5 text-primary">Navigation</h3>
            <ul className="list-none p-0">
              {navLinks.map((link) => (
                <li key={link.href} className="mb-2">
                  <a
                    href={link.href}
                    className="text-text-primary dark:text-text-primary no-underline transition-colors duration-300 hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Redes sociales */}
          <div className="footer-social">
            <h3 className="font-lato-bold mb-2.5 text-primary">Follow Me</h3>
            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/in/kevin-gutierrez-b4214535b/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl text-text-primary dark:text-text-primary transition-colors duration-300 hover:text-primary"
                aria-label="LinkedIn"
              >
                <i className="fa-brands fa-linkedin"></i>
              </a>
              <a
                href="https://github.com/kevinz-08"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl text-text-primary dark:text-text-primary transition-colors duration-300 hover:text-primary"
                aria-label="GitHub"
              >
                <i className="fa-brands fa-github"></i>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl text-text-primary dark:text-text-primary transition-colors duration-300 hover:text-primary"
                aria-label="Instagram"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="text-center mt-8 pt-4 border-t border-border text-sm text-text-secondary dark:text-text-secondary">
          <p>&copy; 2025 Kevin Gutierrez. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
