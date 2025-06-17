// Función para manejar el menu desplegable
 document.querySelector('.menu-toggle').addEventListener('click', function() {
   const navMenu = document.getElementById('navMenu');
   navMenu.classList.toggle('active');
 })
 // Cerrar el menu al hacer clic en un enlace (para moviles)
 const navLinks = document.querySelectorAll('.links a');
 navLinks.forEach(link => {
   link.addEventListener('click', function() {
     if (window.innerWidth <= 768) {
       document.getElementById('navMenu').classList.remove('active');
     }
   });
 })
 // Cerrar el menu al redimensionar la ventana más alla del punto de quiebre
 window.addEventListener('resize', function() {
   if (window.innerWidth > 768) {
     document.getElementById('navMenu').classList.remove('active');
   }
 });

/* funcion para enviar un gmail a mi correo */
function enviarCorreo() {
  const correo = "kevingadev@gmail.com";
  const asunto = "Consulta desde el portafolio web";
  const cuerpo = "Hola Kevin, me gustaria contactarme contigo para una posible oportunidad, consulta, diagnostico, etc.";
  window.location.href = `mailto:${correo}?subject=${encodeURIComponent(asunto)}&body=${cuerpo}`;
}