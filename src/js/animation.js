AOS.init({
  duration: 1000,
  once: false,
});

const sections = document.querySelectorAll(
  "section, .about-me, .main, .services"
);

function isSectionVisible(el) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom >= 0;
}

let activeSections = new Set();

document.addEventListener("scroll", () => {
  sections.forEach((section) => {
    const id = section.getAttribute("id") || section.className;
    if (isSectionVisible(section)) {
      if (!activeSections.has(id)) {
        activeSections.add(id);
        AOS.refreshHard(); // refresca las animaciones al entrar de nuevo
      }
    } else {
      activeSections.delete(id); // permite volver a activar al entrar de nuevo
    }
  });
});


/* Efecto de Capsula en el navMenu */
const navMenu = document.getElementById('navMenu');

window.addEventListener('scroll', () => {
  if (window.scrollY > 250) {
    navMenu.classList.add('capsule');
  } else {
    navMenu.classList.remove('capsule');
  }
}); 
/* funcion para hacer el scroll con la flecha de abajo */
document.querySelector('.arrow-down').addEventListener('click', () => {
document.querySelector('#home').scrollIntoView({ behavior: 'smooth' });
});

/* * Efecto de escritura y borrado de texto */

const texts = ["Backend Developer", "Frontend Developer", "Fullstack Developer"];
let currentIndex = 0;
let i = 0;
let isDeleting = false;

const typedText = document.getElementById("typedText");

function typeWriter() {
  const currentText = texts[currentIndex];

  if (!isDeleting) {
    // Escritura
    typedText.textContent = currentText.slice(0, i);
    i++;
    if (i <= currentText.length) {
      setTimeout(typeWriter, 200);
    } else {
      isDeleting = true;
      setTimeout(typeWriter, 2500);
    }
  } else {
    // Borrado
    i--;
    typedText.textContent = currentText.slice(0, i);
    if (i >= 0) {
      setTimeout(typeWriter, 40);
    } else {
      // Fin del borrado: limpia y prepara nuevo texto
      typedText.textContent = "";                                     // limpiar 100%
      isDeleting = false;
      currentIndex = (currentIndex + 1) % texts.length;
      i = 0;                                                          // reinicia indice antes de escribir
      setTimeout(typeWriter, 300);                                   // pausa antes de comenzar
    }
  }
}

typeWriter();

// animacion parallax 
function applyParallax() {
  const scrollY = window.scrollY;

  const title = document.querySelector(".parallax-text");
  const screenWidth = window.innerWidth;

  // Solo aplicar parallax si el ancho es mayor a 768px
  if (screenWidth > 768) {
    title.style.transform = `translateY(${scrollY * 0.4}px)`;
    title.style.opacity = 1 - scrollY / 400;
  } else {
    // se quita en celular para evitar el bug
    title.style.transform = "translateY(0)";
    title.style.opacity = 1;
  }
}

window.addEventListener("scroll", applyParallax);
window.addEventListener("resize", applyParallax);

// animacion del incremento de los numeros en experiences, project done, happy clients

// Funcion para animar los contadores
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        element.textContent = Math.floor(current);
        
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// Configuración del Intersection Observer
// Función para animar los contadores
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        element.textContent = Math.floor(current);
        
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// Configuracion del intersection Observer
const observerOptions = {
    threshold: 0.3, // Se activa cuando el 30% del elemento es visible
    rootMargin: '0px 0px -100px 0px' // Margen adicional
};

// Crear el observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const statsBox = entry.target;
        
        if (entry.isIntersecting) {
            // Animar todos los contadores
            const counters = statsBox.querySelectorAll('.counter');
            counters.forEach((counter, index) => {
                const target = parseInt(counter.getAttribute('data-target'));
                
                // Añadir un pequeño delay para cada contador
                setTimeout(() => {
                    animateCounter(counter, target);
                }, index * 200);
            });
        } else {
            // Reset contadores cuando sale del viewport
            const counters = statsBox.querySelectorAll('.counter');
            counters.forEach(counter => {
                counter.textContent = '0';
            });
        }
    });
}, observerOptions);

// Comenzar a observar el elemento
document.addEventListener('DOMContentLoaded', () => {
    const statsBox = document.querySelector('.stats-box');
    observer.observe(statsBox);
});

// Funcion alternativa usando scroll event (esta es un poco mas compatible)
function handleScroll() {
    const statsBox = document.querySelector('.stats-box');
    const rect = statsBox.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Verificar si el elemento esta en el viewport
    if (rect.top <= windowHeight * 0.8 && rect.bottom >= 0) {
        if (!statsBox.hasAttribute('data-animating')) {
            statsBox.setAttribute('data-animating', 'true');
            
            // Animar contadores
            const counters = statsBox.querySelectorAll('.counter');
            counters.forEach((counter, index) => {
                const target = parseInt(counter.getAttribute('data-target'));
                setTimeout(() => {
                    animateCounter(counter, target);
                }, index * 200);
            });
            
            // Remover el flag despues de que termine la animacion
            setTimeout(() => {
                statsBox.removeAttribute('data-animating');
            }, 2000 + (counters.length * 200)); // Duración + delays
        }
    } else {
        // Reset contadores cuando sale del viewport
        const counters = statsBox.querySelectorAll('.counter');
        counters.forEach(counter => {
            counter.textContent = '0';
        });
        statsBox.removeAttribute('data-animating');
    }
}

// Fallback para navegadores que no soportan Intersection Observer
if (!window.IntersectionObserver) {
    window.addEventListener('scroll', handleScroll);
}
