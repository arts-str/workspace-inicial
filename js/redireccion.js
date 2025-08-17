// Redirección automática si no hay sesión iniciada
window.addEventListener("load", () => {
  if (localStorage.getItem("sesionIniciada") !== "true") {
    window.location.href = "login.html";
  }
});