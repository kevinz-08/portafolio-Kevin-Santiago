  AOS.init({
    duration: 1000,
    once: false,
  });

document.addEventListener('scroll', () => {
  const services = document.querySelector('#services');
  const rect = services.getBoundingClientRect();

  if (rect.top < window.innerHeight && rect.bottom >= 0) {
    AOS.refreshHard(); //reinicia las animaciones
  }
});
