



document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("dark-mode-toggle");
  const toggleBtnM = document.getElementById("dark-mode-toggle-mobile");
  const root = document.documentElement;



  // Aplicar tema guardado si existe
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    root.classList.add("dark-mode");
  }


  //Fijarse la preferencia del usuario
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
  if (prefersDark.matches && savedTheme !== "light") {
    root.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
  }

  // Alternar tema al hacer clic
  if (toggleBtn && toggleBtnM) {
    toggleBtn.addEventListener("click", () => {
      const isDark = root.classList.toggle("dark-mode");
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
    toggleBtnM.addEventListener("click", () => {
      const isDark = root.classList.toggle("dark-mode");
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
    
  }

});