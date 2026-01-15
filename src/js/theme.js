/* funcion para alternar entre temas claro y oscuro */
const toggleBtn = document.getElementById("toggle-theme");
const body = document.body;

// Comprobar si hay un tema guardado
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  body.classList.add("dark-theme");
  toggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
}

toggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark-theme");
  const isDark = body.classList.contains("dark-theme");
  toggleBtn.innerHTML = isDark
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';
  localStorage.setItem("theme", isDark ? "dark" : "light");
});
// ------------------------------------------------------

const themeBtn = document.getElementById("toggle-theme");
const logo = document.getElementById("logo");

themeBtn.addEventListener("click", () => {
  const isLight = document.body.classList.toggle("light-theme");

  logo.src = isLight
    ? logo.dataset.light   // light → logo negro
    : logo.dataset.dark;   // dark → logo blanco
});

