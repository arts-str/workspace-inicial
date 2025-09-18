const productID = localStorage.getItem("productID");
const commentContainer = document.getElementById("comments");
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

    getJSONData(PRODUCT_INFO_COMMENTS_URL + productID + ".json").then(resultObj => { //Fetch a los comentarios del producto
        if (resultObj.status === "ok") { 
            resultObj.data.forEach(comment => { //Para cada comentario
                addComment(comment); //Agregarlo a la lista
            });
        } else {
            console.error("Error al obtener los comentarios del producto"); //Si no puede cargar la function, muestra este error en la pantalla
        }
    });
});

/**
 * Formato obligatorio del commentObj: 
 * {
 *  user: "pepito",
 *  score: 1, (numero entero del 1 al 5)
 *  description: "no me gusto la silla",
 *  dateTime: yyyy-mm-dd hh:mm:ss
 * }
 */

function calculateStars(commentObj) {
    let starsArray = [];
    for (let i = 0; i < commentObj.score; i++) {  //Por cada punto
        starsArray.push('<i class="bi bi-star-fill"></i>'); //Agregar estrella llena
    }
    if (starsArray.length != 5) { //Si no llega a 5 puntos
        for (let i = starsArray.length; i < 5; i++) {
            starsArray.push('<i class="bi bi-star"></i>'); //Agregar estrella vacía
        }
    }
    let stars = starsArray.join(" "); //Transformar array a string
    return stars; //Devolver la string con las estrellas correctas segun la puntuacion
}

function addComment(commentObj) {
    let stars = calculateStars(commentObj); //String con las estrellas del producto

    //Agregar al container de comentarios uno nuevo
    commentContainer.innerHTML += `
    <li>
      <span>
        <b id="username">${commentObj.user}</b>
        <span id="stars">
            ${stars}
        </span>
      </span>
      <p class="description">${commentObj.description}</p>
      <p class="time">${formatTimestamp(commentObj.dateTime)}</p>
    </li>
    `
}

function formatTimestamp(ts) {
  const date = new Date(ts); // "yyyy-mm-dd hh:mm:ss"

  const options = {
    weekday: 'short',   // ej "jue"
    day: '2-digit',    // ej "18"
    month: 'short',     // ej "sept."
    year: 'numeric',   // ej "2025"
    hour: '2-digit',   // ej "13"
    minute: '2-digit', // ej "45"
    hour12: false      // formato 24h
  };

  return date.toLocaleString(undefined, options).replace(',', ''); //Devolver la timestamp en formato "Dia dd Mes, yyy, hh:mm"
}