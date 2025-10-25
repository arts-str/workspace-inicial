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
