// function toggleMenu() {
//   const nav = document.getElementById("navMenu");
//   nav.classList.toggle("show");
// }

// Función para manejar el menú desplegable
 document.querySelector('.menu-toggle').addEventListener('click', function() {
   const navMenu = document.getElementById('navMenu');
   navMenu.classList.toggle('active');
 })
 // Cerrar el menú al hacer clic en un enlace (para móviles)
 const navLinks = document.querySelectorAll('.links a');
 navLinks.forEach(link => {
   link.addEventListener('click', function() {
     if (window.innerWidth <= 768) {
       document.getElementById('navMenu').classList.remove('active');
     }
   });
 })
 // Cerrar el menú al redimensionar la ventana más allá del punto de quiebre
 window.addEventListener('resize', function() {
   if (window.innerWidth > 768) {
     document.getElementById('navMenu').classList.remove('active');
   }
 });