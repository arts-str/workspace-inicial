// Mostrar nombre de usuario en el nav de perfil
        const userName = localStorage.getItem("usuario");
        if (userName) {
            const userNameElement = document.querySelectorAll(".username");
            if (userNameElement) {
                for (const element of userNameElement) {
                    element.textContent = userName;
                }
            }
        }