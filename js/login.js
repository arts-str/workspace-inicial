const container = document.querySelector('.container');
const btnSignIn = document.getElementById('btn-sign-in');
const btnSignUp = document.getElementById('btn-sign-up');

btnSignUp.addEventListener('click', () => {
    container.classList.remove('toggle');
});

btnSignIn.addEventListener('click', () => {
    container.classList.add('toggle');
});

const btnLogin = document.getElementById("btn-login");

btnLogin.addEventListener("click", (e) => {
  e.preventDefault(); // para que no se envie el form

  const usuario = document.getElementById("usuario").value;
  const contraseña = document.getElementById("contraseña").value;

  if (usuario.trim() !== "" && contraseña.trim() !== "") {
    localStorage.setItem("sesionIniciada", "true");
    localStorage.setItem("usuario", usuario); // para guardar el nombre de usuario

    const userExist = getUser(usuario);
    if(!userExist){
      createUser(usuario); // para guardar el objeto usuario
    }
    
    globalThis.location.href = "index.html"; // redirige al index
  } else {
    alert("Por favor, completá todos los campos.");
  }
});