const productID = localStorage.getItem("productID");
let productData = {};
let currentIndex = 0;


//para mostrar los datos de productos en la pantalla
function showProductInfo() {
  if (!productData.name || !productData.images?.length) return; //si no hay datos no se cumple la funcion

    document.getElementById("product-name").textContent = productData.name;
    document.getElementById("currency").textContent = productData.currency;
    document.getElementById("cost").textContent = Number(productData.cost)
    .toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); //convierte el formato string a formato precio
    document.getElementById("product-description").textContent = productData.description;
    document.getElementById("product-category").textContent = productData.category;
    document.getElementById("product-sold").textContent = `${productData.soldCount} vendidos`;

    renderCarousel(); // para que el  del carrusel aparexca ok
}



function renderCarousel() {
    const mainImage = document.getElementById("main-image");
    const dotsContainer = document.getElementById("dots");
    dotsContainer.innerHTML = "";

    //asignar la img correcta
    mainImage.src = productData.images[currentIndex];
    mainImage.alt = `${productData.name} ${currentIndex + 1}`;

    //recorrer las img para crear los puntitos de navegación
    productData.images.forEach((_, i) => {
        const dot = document.createElement("span");
        dot.className = "dot" + (i === currentIndex ? " active" : "");
        dot.addEventListener("click", () => { //cambiar img a indice correspondiente
            currentIndex = i;
            renderCarousel();
        });
        dotsContainer.appendChild(dot); 
        }); //aagregarlos al conteiner
}

document.addEventListener("DOMContentLoaded", () => {
    if (!productID) {
        console.error("No se encontró productID en localStorage");
        return; //si no hay productID muestra este error
    }

    getJSONData(PRODUCT_INFO_URL + productID + ".json").then(resultObj => {
        if (resultObj.status === "ok") { 
            productData = resultObj.data; //solicita los datos desde URL y si son ok la guarda

            // Botones de flecha
            document.getElementById("prev").addEventListener("click", () => {
                currentIndex = (currentIndex - 1 + productData.images.length) % productData.images.length;
                renderCarousel(); //flecha izquierda
            });
            document.getElementById("next").addEventListener("click", () => {
                currentIndex = (currentIndex + 1) % productData.images.length;
                renderCarousel(); //flecha derecha
            });

            showProductInfo(); 
        } else {
            console.error("Error al obtener la info del producto"); //si no puede cargar la function, muestra este error en la pantalla
        }
    });
});
