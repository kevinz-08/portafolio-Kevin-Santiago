const services = [
  {
    title: 'Formula 1 Website',
    description: 'This project was based on the creation of the main page of Formula 1.',
    pageUrl: 'https://jdmeneses27.github.io/formula1/login.html',
    repoUrl: 'https://github.com/JDMeneses27/formula1',
    icon: 'fa-regular fa-user',
  },
  {
    title: 'E-Commerce Website',
    description: 'This project was based on the creation of a clothing ecommerce page, with many sections and unique details.',
    pageUrl: 'https://kevinz-08.github.io/app_de_ecommerce_de_ropa/',
    repoUrl: 'https://github.com/kevinz-08/app_de_ecommerce_de_ropa',
    icon: 'fa-regular fa-user',
  },
  {
    title: 'Inclusive Web Prototivo',
    description: 'This project was based on the creation of a website, innovating with an inclusive game for all types of people.',
    pageUrl: 'https://kevinz-08.github.io/prototipo-interactivo-de-pagina-web-para-personas-con-dificultades-visuales/views/black-home.html',
    repoUrl: 'https://github.com/kevinz-08/prototipo-interactivo-de-pagina-web-para-personas-con-dificultades-visuales',
    icon: 'fa-regular fa-user',
  },
]

export default function Services() {
  return (
    <section id="services" className="scroll-mt-16 mt-32 md:mt-40 px-5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-20">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-lato-bold text-text-primary dark:text-text-primary mb-4">
            Services
          </h1>
          <p className="text-lg md:text-xl font-lato-medium text-text-secondary dark:text-text-secondary max-w-2xl mx-auto">
            Here are some of the services and/or projects I have completed so far
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-10" data-aos="zoom-in-up">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ service }) {
  return (
    <div className="bg-bg-card dark:bg-bg-card w-full sm:w-[350px] min-h-[400px] p-8 rounded-3xl flex flex-col justify-between text-center transition-all duration-300 hover:-translate-y-2.5 hover:shadow-xl">
      <div className="flex flex-col items-center justify-center gap-4 mb-6">
        <i className={`${service.icon} text-primary text-5xl md:text-7xl`}></i>
        <h1 className="font-lato-bold text-primary text-xl md:text-2xl">{service.title}</h1>
      </div>

      <p className="text-text-secondary dark:text-text-secondary text-base md:text-lg font-lato-medium mb-6 flex-grow">
        {service.description}
      </p>

      <div className="flex flex-col gap-3">
        <a
          href={service.pageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-lg bg-gradient-primary text-white text-center font-lato-bold font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/50"
        >
          View the Page
        </a>
        <a
          href={service.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-lg bg-gradient-primary text-white text-center font-lato-bold font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/50"
        >
          Access the Repository
        </a>
      </div>
    </div>
  )
}
