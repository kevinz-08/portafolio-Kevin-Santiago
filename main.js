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