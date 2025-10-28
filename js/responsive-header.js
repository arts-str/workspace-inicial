const menuIcon = document.getElementById("menu-icon");
const mobileMenu = document.getElementById("mobile-menu");

// Menú hamburguesa
menuIcon.addEventListener("click", function () {
  menuIcon.classList.toggle("clicked");
  mobileMenu.classList.toggle("active");
});

document.addEventListener("click", function (event) {
  if (!menuIcon.contains(event.target) && !mobileMenu.contains(event.target)) {
    menuIcon.classList.remove("clicked");
    mobileMenu.classList.remove("active");
  }
});

// Mostrar nombre de usuario en el nav de perfil
const userName = localStorage.getItem("usuario");
if (userName) {
  const userNameElement = document.querySelectorAll(".username");
  if (userNameElement.length > 0) {
    for (const element of userNameElement) {
      element.textContent = userName;
    }
  }
}

// Actualizar Badge de cantidad de productos
let updateCartBadge = () => {
  const actualUser = getUser(userName);

  if (actualUser) {
    const badgesCart = document.querySelectorAll(".badge");
    let total = 0;

    for (const product of actualUser.carrito){
      total += product.amount; //Sumar por la cantidad
    }

    for (const badge of badgesCart) {
      if (badgesCart.length > 0) {
        badge.textContent = total;
      }
    }
  }
};
updateCartBadge();



//? Manejo de logout: attach a todos los elementos con id logout-btn
function attachLogoutHandlers() {
  const logoutEls = document.querySelectorAll('#logout-btn');
  logoutEls.forEach(el => {
    if (el.__logoutHandlerAdded) return;
    el.addEventListener('click', function (e) {
      e.preventDefault();
      // Establecer la variable de sesión a "false" en localStorage
      localStorage.setItem('sesionIniciada', 'false');
      // Opcional: eliminar el usuario almacenado
      localStorage.removeItem('usuario');
      // Redirigir al login
      window.location.replace('login.html');
    });
    el.__logoutHandlerAdded = true;
  });
}

//? DROPDOWN AL PULSAR IMAGEN DE USUARIO EN DESKTOP
function ensureDesktopUserMenu() {
  const userProfile = document.querySelector('.user-profile');
  if (!userProfile) return;

  // Si ya existe el menú, no crear otro
  if (document.querySelector('.desktop-user-menu')) return;

  const isLogged = localStorage.getItem('sesionIniciada') === 'true';

  const menu = document.createElement('div');
  menu.className = 'desktop-user-menu';
  menu.setAttribute('aria-hidden', 'true');

  // Contenido: enlace a perfil siempre; logout solo si la sesión está iniciada
  menu.innerHTML = `
    <a id="user-btn" href="my-profile.html"><i class="fas fa-user"></i> Mi Perfil</a>
    ${isLogged ? '<a id="logout-btn" href="#"><i class="fas fa-sign-out-alt"></i> Cerrar Sesión</a>' : ''}
  `;

  userProfile.style.position = 'relative';
  userProfile.appendChild(menu);

  // Cuando se clickea en user-profile en escritorio, alternar el menú
  userProfile.addEventListener('click', function (e) {
    // Solo en pantallas >= 992px (desktop)
    if (window.innerWidth < 992) return;
    e.stopPropagation();
    const isOpen = menu.classList.toggle('open');
    menu.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    // Adjuntar handlers a los enlaces creados
    attachLogoutHandlers();
  });

  // Cerrar al click fuera
  document.addEventListener('click', function (ev) {
    if (!userProfile.contains(ev.target)) {
      menu.classList.remove('open');
      menu.setAttribute('aria-hidden', 'true');
    }
  });
}

// Ejecutar creación y attach al cargar el script
ensureDesktopUserMenu();
// ocultar logout dentro del mobile-menu si no está logueado
const mobileLogout = document.querySelector('#mobile-menu #logout-btn');
if (mobileLogout) {
  const isLoggedNow = localStorage.getItem('sesionIniciada') === 'true';
  mobileLogout.style.display = isLoggedNow ? '' : 'none';
}
attachLogoutHandlers();
