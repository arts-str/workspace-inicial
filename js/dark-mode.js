document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("dark-mode-toggle");
  const root = document.documentElement;

  // Aplicar tema guardado si existe
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    root.classList.add("dark-mode");
  }

  // Alternar tema al hacer clic
  toggleBtn.addEventListener("click", () => {
    const isDark = root.classList.toggle("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
});