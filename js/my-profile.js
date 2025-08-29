// Mostrar nombre de usuario en el nav de perfil
        const userName = localStorage.getItem("usuario");
        if (userName) {
            const userNameElement = document.querySelector(".username");
            if (userNameElement) {
                userNameElement.textContent = userName;
            }
        }