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
        AOS.refreshHard(); // 🔁 Refresca las animaciones al entrar de nuevo
      }
    } else {
      activeSections.delete(id); // 💡 Permite volver a activar al entrar de nuevo
    }
  });
});
