import slider1 from '../img/slider1-1.png'
import slider2 from '../img/slider1-2.png'
import slider3 from '../img/slider1-3.png'
import slider4 from '../img/slider1-4.png'
import slider5 from '../img/slider1-5.png'
import slider6 from '../img/slider1-6.png'
import slider7 from '../img/slider1-7.png'
import slider8 from '../img/slider1-8.png'
import slider9 from '../img/slider1-9.png'

const technologies = [
  { name: 'HTML', image: slider1, url: 'https://lenguajecss.com/' },
  { name: 'CSS', image: slider2, url: 'https://lenguajecss.com/' },
  { name: 'JavaScript', image: slider3, url: 'https://lenguajejs.com/javascript/' },
  { name: 'Python', image: slider4, url: 'https://www.python.org/' },
  { name: 'Tailwind CSS', image: slider5, url: 'https://tailwindcss.com/' },
  { name: 'React', image: slider6, url: 'https://es.react.dev/' },
  { name: 'Bootstrap', image: slider7, url: 'https://getbootstrap.com/' },
  { name: 'PHP', image: slider8, url: 'https://www.php.net/' },
  { name: 'MySQL', image: slider9, url: 'https://www.mysql.com/' },
]

export default function Technologies() {
  return (
    <div id="technologies" className="scroll-mt-32 mt-48 md:mt-64 mb-24 px-5">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-center text-3xl md:text-4xl lg:text-5xl font-lato-bold font-semibold mb-12 text-text-primary dark:text-text-primary" data-aos="fade-right">
          Technologies and Languages
        </h1>

        <div className="slider-container relative w-full h-[130px] overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, #000 10% 90%, transparent)' }}>
          <div className="slider-list flex w-full min-w-[900px] relative">
            {technologies.map((tech, index) => (
              <TechnologyItem key={index} tech={tech} position={index + 1} total={technologies.length} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function TechnologyItem({ tech, position, total }) {
  const delay = ((10 / total) * (position - 1) - 10).toFixed(2)
  
  return (
    <div
      className="slider-item w-[100px] h-[100px] absolute left-full"
      style={{
        animation: `autoRun 10s linear infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      <a href={tech.url} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
        <img
          src={tech.image}
          alt={tech.name}
          className="w-full h-full object-contain transition-all duration-400 hover:scale-[1.15] hover:drop-shadow-lg"
        />
      </a>
    </div>
  )
}
