const container = document.querySelector(".container");
const btnSignIn = document.getElementById("btn-sign-in");
const btnSignUp = document.getElementById("btn-sign-up");
const LOGIN_URL = "http://localhost:3000/login";

btnSignUp.addEventListener("click", () => {
  container.classList.remove("toggle");
});

btnSignIn.addEventListener("click", () => {
  container.classList.add("toggle");
});

const btnLogin = document.getElementById("btn-login");

btnLogin.addEventListener("click", async (e) => {
  e.preventDefault(); // para que no se envie el form

  const usuario = document.getElementById("usuario").value;
  const password = document.getElementById("contraseña").value;

  if (usuario.trim() !== "" && password.trim() !== "") {
    const postResponse = await postLogin(usuario, password);

    if(postResponse.status === "ok"){
      localStorage.setItem("sesionIniciada", "true");
      localStorage.setItem("usuario", usuario); // para guardar el nombre de usuario
      localStorage.setItem("token",postResponse.data.token);
      
      const userExist = getUser(usuario);
      if (!userExist) {
        createUser(usuario); // para guardar el objeto usuario
      }
      globalThis.location.href = "index.html";
    }else {
      alert(postResponse.data);
    }
    
      /*
      localStorage.setItem("sesionIniciada", "true");
      localStorage.setItem("usuario", usuario); // para guardar el nombre de usuario

      const userExist = getUser(usuario);
      if (!userExist) {
        createUser(usuario); // para guardar el objeto usuario
      }

      globalThis.location.href = "index.html"; // redirige al index*/
  } else {
    alert("Por favor, completá todos los campos.");
  }
});

const postLogin = async (username, password) => {
  let result = {};
  return fetch(LOGIN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = "ok";
      result.data = response;
      return result;
    })
    .catch(function (error) {
      result.status = "error";
      result.data = error;
      return result;
    });
};