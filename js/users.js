/**
 * Obtener lista de "usuarios" de la plataforma
 */
let getLocalUsers = () => {
  let users = localStorage.getItem("usuarios");
  if (!users) {
    localStorage.setItem("usuarios", JSON.stringify([]));
    return [];
  }
  return JSON.parse(users);
};

/**
 * Buscar por el nombre de usuario
 * @param {string} nombreUsuario
 */
let getUser = (nombreUsuario) => {
  const users = getLocalUsers();
  console.log(users);
  
  return users.find((u) => u.nombreUsuario === nombreUsuario);
};

/**
 * Crear un objeto de usuario
 * @param {string} nombreUsuario
 */
let createUser = (nombreUsuario) => {
  const users = getLocalUsers();
  const user = {
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    nombreUsuario: nombreUsuario,
    fotoURL: "",
    modoOscuro: "",
  };
  users.push(user);
  localStorage.setItem("usuarios", JSON.stringify(users));
  return user;
};

/**
 * Actualizar datos de perfil
 * @param {string} nombre
 * @param {string} apellido
 * @param {string} email
 * @param {string} telefono
 * @param {string} nombreUsuario
 * @param {string} fotoURL
 */
let updateUser = (
  nombre,
  apellido,
  email,
  telefono,
  nombreUsuario,
  fotoURL = ''
) => {
  const users = getLocalUsers();
  const currentUser = localStorage.getItem("usuario");
  let user = users.find((u) => u.nombreUsuario === currentUser);

  if (user) {
    user.nombre = nombre;
    user.apellido = apellido;
    user.email = email;
    user.telefono = telefono;
    user.nombreUsuario = nombreUsuario;
    user.fotoURL = fotoURL;

    localStorage.setItem("usuarios", JSON.stringify(users));
    localStorage.setItem("usuario", nombreUsuario);
  }
};