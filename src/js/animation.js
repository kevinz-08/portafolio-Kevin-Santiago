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

function applyParallax() {
  const scrollY = window.scrollY;

  const title = document.querySelector(".parallax-text");
  const screenWidth = window.innerWidth;

  // Solo aplicar parallax si el ancho es mayor a 768px (no en móviles)
  if (screenWidth > 768) {
    title.style.transform = `translateY(${scrollY * 0.4}px)`;
    title.style.opacity = 1 - scrollY / 400;
  } else {
    // Reset en móviles para evitar el bug
    title.style.transform = "translateY(0)";
    title.style.opacity = 1;
  }
}

window.addEventListener("scroll", applyParallax);
window.addEventListener("resize", applyParallax);