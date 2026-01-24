import cvPdf from '../img/Kevin Gutierrez - HV.pdf'
import profileImage from '../img/logo-white.png'

export default function AboutMe() {
  return (
    <section id="about-me" className="scroll-mt-16 mt-40 md:mt-48 px-5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-lato-bold text-text-dark dark:text-text-primary mb-4">
            About Me
          </h1>
          <p className="text-lg md:text-xl font-lato-medium text-text-secondary dark:text-text-secondary max-w-2xl mx-auto">
            Full Stack Developer in training with a focus on modern web development. Passionate about the frontend,
            backend logic and visual design.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 md:gap-24 lg:gap-32 mt-12 md:mt-16">
          {/* Imagen */}
          <div className= "relative w-64 md:w-80 lg:w-96 h-64 md:h-80 lg:h-96 flex items-center justify-center flex-shrink-0" data-aos="fade-right">
            <div className= "absolute inset-0 m-auto w-[90%] h-[90%] bg-bg-card dark:bg-bg-card rounded-full opacity-50 z-0"></div>
            <img
              src={profileImage}
              alt="Kevin Gutierrez"
              className="relative w-4/5 h-auto z-10 drop-shadow-2xl"
            />
          </div>

          {/* Texto */}
          <div className="w-full lg:w-[630px] max-w-full" data-aos="fade-left">
            <div className="text-base md:text-lg leading-relaxed text-text-secondary dark:text-text-secondary font-lato-medium space-y-4">
              <p>
                I'm <strong className="text-text-dark dark:text-text-primary">Kevin Santiago Gutiérrez Amorocho</strong>, a Software Development Technician with practical training at
                <strong className="text-text-dark dark:text-text-primary"> SENA </strong>
                and currently undergoing intensive training at <strong className="text-text-dark dark:text-text-primary">CampusLands</strong>.
                I have hands-on experience in building responsive and dynamic web applications using
                <strong className="text-text-dark dark:text-text-primary"> HTML, CSS, JavaScript</strong>, and API consumption.
                I work with modular structures (separate HTML, CSS, JS, PHP), version control with <strong className="text-text-dark dark:text-text-primary">Git & GitHub</strong>,
                and I also have knowledge in backend development with <strong className="text-text-dark dark:text-text-primary">Python</strong> (servers, routing, business logic).
              </p>
              <p>
                Additionally, I have experience with <strong className="text-text-dark dark:text-text-primary">React Native</strong> (Basic), <strong className="text-text-primary dark:text-text-primary">Tailwind CSS</strong> (Intermediate), <strong className="text-text-primary dark:text-text-primary">Bootstrap</strong> (Intermediate), <strong className="text-text-primary dark:text-text-primary">Vue.js</strong> (Basic),
                with modern frontend practices, and task automation.
                I am recognized for being a <strong className="text-text-dark dark:text-text-primary">self-taught learner</strong>, with strong problem-solving skills, analytical
                thinking, and a continuous drive to grow as a <strong className="text-text-dark dark:text-text-primary">junior full stack developer</strong>.
              </p>
            </div>
            <a
              href={cvPdf}
              download
              className="inline-block mt-6 px-5 py-2.5 rounded-lg bg-gradient-primary text-white font-lato-bold font-semibold transition-all duration-400 hover:scale-105 hover:shadow-lg hover:shadow-primary/50"
            >
              Download my CV
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
