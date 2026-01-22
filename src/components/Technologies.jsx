import { useTheme } from '../hooks/useTheme'
// Importamos los iconos reales
import { FaHtml5, FaCss3Alt, FaJs, FaPython, FaReact, FaBootstrap, FaPhp } from "react-icons/fa";
import { SiTailwindcss, SiMysql } from "react-icons/si";

const technologies = [
  { name: 'HTML', Icon: FaHtml5, url: 'https://lenguajecss.com/' },
  { name: 'CSS', Icon: FaCss3Alt, url: 'https://lenguajecss.com/' },
  { name: 'JavaScript', Icon: FaJs, url: 'https://lenguajejs.com/javascript/' },
  { name: 'Python', Icon: FaPython, url: 'https://www.python.org/' },
  { name: 'Tailwind', Icon: SiTailwindcss, url: 'https://tailwindcss.com/' },
  { name: 'React', Icon: FaReact, url: 'https://es.react.dev/' },
  { name: 'Bootstrap', Icon: FaBootstrap, url: 'https://getbootstrap.com/' },
  { name: 'PHP', Icon: FaPhp, url: 'https://www.php.net/' },
  { name: 'MySQL', Icon: SiMysql, url: 'https://www.mysql.com/' },
]

export default function Technologies() {
  return (
    <div id="technologies" className="scroll-mt-32 mt-48 md:mt-64 mb-24 px-5">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-center text-3xl md:text-4xl lg:text-5xl font-lato-bold font-semibold mb-12 text-text-dark dark:text-text-primary" data-aos="fade-right">
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
  const IconComponent = tech.Icon; // Extraemos el componente
  
  return (
    <div
      className="slider-item w-[100px] h-[100px] absolute left-full flex items-center justify-center"
      style={{
        animation: `autoRun 10s linear infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      <a href={tech.url} target="_blank" rel="noopener noreferrer" className="block group">
        <IconComponent 
          className="text-7xl transition-all duration-400 group-hover:scale-[1.15] group-hover:drop-shadow-lg text-black dark:text-white" 
        />
      </a>
    </div>
  )
}