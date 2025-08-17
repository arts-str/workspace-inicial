// verificar si tiene sesión iniciada
function verificarSesion() {
  if (localStorage.getItem("sesionIniciada") !== "true") {
    window.location.href = "login.html";
  }
}