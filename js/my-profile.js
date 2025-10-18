const btnGuardar = document.getElementById("btnGuardar");
const btnCancelar = document.getElementById("btnCancelar");

const btnEditarPerfil = document.getElementById("btnEditarPerfil");
const btnAgregarFoto = document.querySelector("div.add-photo");

const perfilForm = document.getElementById("perfilForm");

const inputFields = document.querySelectorAll(
  'div.container input[type="text"], div.container input[type="email"], div.container input[type="tel"]'
);

const inputNombre = document.getElementById("inputNombre");
const inputApellido = document.getElementById("inputApellido");
const inputEmail = document.getElementById("inputEmail");
const inputTelefono = document.getElementById("inputTelefono");
const inputNombreUsuario = document.getElementById("inputNombreUsuario");
const inputProfileImage = document.getElementById("inputProfileImage");
const profPic = document.getElementById('profileImage');

/**
 * Rellena con los datos del usuario al ingresar a la página "my-profile.html"
 */
function fillProfile() {
  const user = getUser(localStorage.getItem("usuario"));
  inputNombre.value = user.nombre;
  inputApellido.value = user.apellido;
  inputEmail.value = user.email;
  inputTelefono.value = user.telefono;
  inputNombreUsuario.value = user.nombreUsuario;  
  if (user.fotoURL !== '') {
    profPic.src = user.fotoURL;
  }
}
fillProfile();

/**
 * Deshabilitar la edición de los campos del perfil
 */
function disableFields() {
  for (let inputField of inputFields) {
    inputField.disabled = true;
    console.log(inputField.disabled);
    
    inputField.classList.remove("available-input");
    inputField.classList.add("disabled-input");
  }
  btnAgregarFoto.style.display = "none";
  btnCancelar.disabled = true;
  btnGuardar.disabled = true;
}

/**
 * Habilitar la edición de los campos del perfil
 */
function enableFields() {
  for (let inputField of inputFields) {
    inputField.disabled = false;
    inputField.classList.add("available-input");
    inputField.classList.remove("disabled-input");
  }
  btnAgregarFoto.style.display = "block";
  btnCancelar.disabled = false;
  btnGuardar.disabled = false;
}

/**
 * Habilitar la edición de datos del perfil
 */
btnEditarPerfil.addEventListener("click", () => {
  enableFields();
  updateInputsClass();
});

/**
 * Cancelar edición
 */
btnCancelar.addEventListener("click", () => {
  const confirmar = confirm(
    "¿Estás seguro que quieres salir? No se guardarán los cambios"
  );
  if (confirmar) {
    fillProfile();
    disableFields();
  }
});

/**
 * Actualizar datos
 */
perfilForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const confirmar = confirm("¿Estás seguro de querer modificar tu perfil?");

  if (confirmar) {
    const nombre = inputNombre.value;
    const apellido = inputApellido.value;
    const email = inputEmail.value;
    const telefono = inputTelefono.value;
    const nombreUsuario = inputNombreUsuario.value;
    const fotoURL = profPic.src;

    updateUser(nombre, apellido, email, telefono, nombreUsuario, fotoURL);

    disableFields();
    globalThis.location.reload();
  }
});

function updateInputsClass() {
  inputNombre.classList.add('form-edit-inputs');
  inputApellido.classList.add('form-edit-inputs');
  inputEmail.classList.add('form-edit-inputs');
  inputTelefono.classList.add('form-edit-inputs');
  inputNombreUsuario.classList.add('form-edit-inputs');
}