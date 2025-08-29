const menuIcon = document.getElementById("menu-icon");
const mobileMenu = document.getElementById('mobile-menu');

menuIcon.addEventListener('click', function() {
    menuIcon.classList.toggle("clicked");
    mobileMenu.classList.toggle('active');
});

document.addEventListener('click', function(event) {
    if (!menuIcon.contains(event.target) && !mobileMenu.contains(event.target)) {
        menuIcon.classList.remove("clicked");
        mobileMenu.classList.remove('active');
    }
});
