const productID = localStorage.getItem("productID");
const commentContainer = document.getElementById("comments");
const commentsLeft = document.getElementById("commentsLeft");
let allComments = [];
let productData = {};
let currentIndex = 0;

// Form de calificaciones
const commentForm = document.getElementById("commentForm");
const inputComment = document.getElementById("inputComment");
const stars = document.querySelectorAll('.star-rating input[name="rating"]');
let score = 0;

//para mostrar los datos de productos en la pantalla
function showProductInfo() {
  if (!productData.name || !productData.images?.length) return; //si no hay datos no se cumple la funcion

  document.getElementById("product-name").textContent = productData.name;
  document.getElementById("currency").textContent = productData.currency;
  document.getElementById("cost").textContent = Number(
    productData.cost
  ).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }); //convierte el formato string a formato precio
  document.getElementById("product-description").textContent =
    productData.description;
  document.getElementById("product-category").textContent =
    productData.category;
  document.getElementById(
    "product-sold"
  ).textContent = `${productData.soldCount} vendidos`;

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
    dot.addEventListener("click", () => {
      //cambiar img a indice correspondiente
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

  getJSONData(PRODUCT_INFO_URL + productID + ".json").then((resultObj) => {
    if (resultObj.status === "ok") {
      productData = resultObj.data; //solicita los datos desde URL y si son ok la guarda

      // Botones de flecha
      document.getElementById("prev").addEventListener("click", () => {
        currentIndex =
          (currentIndex - 1 + productData.images.length) %
          productData.images.length;
        renderCarousel(); //flecha izquierda
      });
      document.getElementById("next").addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % productData.images.length;
        renderCarousel(); //flecha derecha
      });

      showProductInfo();
      productosRelacionados();
    } else {
      console.error("Error al obtener la info del producto"); //si no puede cargar la function, muestra este error en la pantalla
    }
  });

  getJSONData(PRODUCT_INFO_COMMENTS_URL + productID + ".json").then(
    (resultObj) => {
      //Fetch a los comentarios del producto
      if (resultObj.status === "ok") {
        if (resultObj.data.length > 0) {
          allComments = resultObj.data;
          allComments.forEach((comment) => {
            //Para cada comentario
            addComment(comment); //Agregarlo a la lista
          });
          addCommentsLeft();
        } else {
          commentContainer.innerHTML =
            '<p class="no-comments">No hay comentarios</p>';
        }
      } else {
        console.error("Error al obtener los comentarios del producto"); //Si no puede cargar la function, muestra este error en la pantalla
      }
    }
  );

  // Estrellas del formulario: funcionamiento
  starRatingChange();

  // Lógica del formulario de calificación
  sendCommentForm();
});

/** ----------------- Funciones destinadas al formulario de envío de calificación -----------------*/

/**
 * Formato obligatorio del commentObj:
 * {
 *  user: "pepito",
 *  score: 1, (numero entero del 1 al 5)
 *  description: "no me gusto la silla",
 *  dateTime: "YYYY-mm-dd HH:mm:ss"
 * }
 */

/**
 * Define el valor de la variable score de acuerdo al número de estrellas
 * que están seleccionadas en el form
 * @param {boolean} clear 
 */
function starRatingChange() {
  stars.forEach((star) => {
    star.addEventListener("change", (e) => {
      e.preventDefault();

      score = document.querySelector(
        '.star-rating input[name="rating"]:checked'
      ).value;
    });
  });
}

/**
 * Funcionamiento del formulario de calificación
 */
function sendCommentForm() {
  commentForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Si el usuario ya comentó previamente, no se le dejará agregar una calificación
    if (userAlreadyCommented()) {
      alert("¡Ya has comentado y calificado este producto!");
      clearForm();
      return;
    }

    // Debe haberse seleccionado al menos una estrella
    if (score === 0) {
      alert("¡Debes calificar con al menos una estrella!");
      return;
    }

    // En caso de que exista un mensaje de "No hay comentarios", se elimina dicho elemento
    const noComments = document.querySelector("p.no-comments");
    if(noComments?.parentNode){
      noComments.parentNode.removeChild(noComments);
    }

    const commentObj = {
      product: parseInt(productID),
      score: parseInt(score),
      description: inputComment.value,
      user: localStorage.getItem("usuario"),
      dateTime: getCurrentDate(), //formato "YYYY-mm-dd HH:mm:ss",
    };

    allComments.push(commentObj); // Agregar el comentario a la lista de comentarios

    addComment(commentObj); // Ahora al html
    addCommentsLeft(); // Actualizar el resumen de calificaciones de la izquierda

    clearForm(); // Limpiar formulario
  });
}


/**
 * Fecha y hora actual en formato "YYYY-MM-DD HH:mm:ss"
 * @returns {string}
 */
function getCurrentDate() {
  const date = new Date();
  return date
    .toLocaleString("en-CA", {
      timeZone: "America/Montevideo",
      day: "2-digit", // ej "18"
      month: "2-digit", // ej "09"
      year: "numeric", // ej "2025"
      hour: "2-digit", // ej "17"
      minute: "2-digit", // ej "08"
      second: "2-digit", // ej "27"
      hour12: false, // formato 24h
    })
    .replace(",", "");
}

/**
 * Limpiar el formulario
 */
function clearForm() {
  inputComment.value = "";
  stars.forEach(star => {
      star.checked = false;
  });
  score = 0;
}

/**
 * Esta función verifica si el usuario actual ya ha calificado el producto
 */
function userAlreadyCommented() {
  let userAlreadyCommented = false;

  // Obtener todos los elementos b con texto que indican el username
  const allCommentUsers = document.querySelectorAll("#comments b#username");

  // Recorrer la lista obtenida (si tiene valores) y verificar si el nombre del
  // usuario actual ya se encuentra
  allCommentUsers.forEach((user) => {
    if (user.textContent === localStorage.getItem("usuario"))
      userAlreadyCommented = true;
  });
  return userAlreadyCommented;
}

/** ----------------- Funciones destinadas a agregar comentarios a la lista y desplegar un resumen de reseñas -----------------*/

function calculateStars(score, size) {
  let starsArray = [];
  for (let i = 0; i < Math.round(score); i++) {
    //Por cada punto
    starsArray.push(`<i class="bi bi-star-fill ${size}"></i>`); //Agregar estrella llena
  }
  if (starsArray.length != 5) {
    //Si no llega a 5 puntos
    for (let i = starsArray.length; i < 5; i++) {
      starsArray.push(`<i class="bi bi-star ${size}"></i>`); //Agregar estrella vacía
    }
  }
  let stars = starsArray.join(" "); //Transformar array a string
  return stars; //Devolver la string con las estrellas correctas segun la puntuacion
}

function addComment(commentObj) {
  let stars = calculateStars(commentObj.score, ""); //String con las estrellas del producto

  //Agregar al container de comentarios uno nuevo
  commentContainer.innerHTML += `
    <li>
      <span>
        <b id="username">${commentObj.user}</b>
        <span id="stars">
            ${stars}
        </span>
        <p class="time">${formatTimestamp(commentObj.dateTime)}</p>
      </span>
      <p class="description">${commentObj.description}</p>
    </li>
    `;
}

function formatTimestamp(ts) {
  const date = new Date(ts); // "yyyy-mm-dd hh:mm:ss"

  const options = {
    weekday: "short", // ej "jue"
    day: "2-digit", // ej "18"
    month: "short", // ej "sept."
    year: "numeric", // ej "2025"
    hour: "2-digit", // ej "13"
    minute: "2-digit", // ej "45"
    hour12: false, // formato 24h
  };

  return date.toLocaleString(undefined, options).replace(",", ""); //Devolver la timestamp en formato "Dia dd Mes, yyy, hh:mm"
}

function scoreAverage(allComments) {
  let sum = 0;
  for (const comment of allComments) {
    sum += comment.score;
  }
  return (sum / allComments.length).toFixed(2);
}

function calculateBarsWidth(allComments) {
  let all5 = 0;
  let all4 = 0;
  let all3 = 0;
  let all2 = 0;
  let all1 = 0;

  for (const comment of allComments) {
    switch (comment.score) {
      case 5:
        all5++;
        break;
      case 4:
        all4++;
        break;
      case 3:
        all3++;
        break;
      case 2:
        all2++;
        break;
      case 1:
        all1++;
        break;
      default:
        break;
    }
  }
  return {
    bar5: (all5 / allComments.length) * 100,
    bar4: (all4 / allComments.length) * 100,
    bar3: (all3 / allComments.length) * 100,
    bar2: (all2 / allComments.length) * 100,
    bar1: (all1 / allComments.length) * 100,
  };
}

function addCommentsLeft() {
  let score = scoreAverage(allComments);
  let stars = calculateStars(score, "h5");
  let barWidthObject = calculateBarsWidth(allComments);
  commentsLeft.innerHTML = `
    <div class="comments-score">
        <div class="comments-score-top">
          <h2>${score}</h2>
          <div class="stars-amount">
            <div class="stars">
              ${stars}

            </div>

            <p>(${allComments.length} calificaciones)</p>
          </div>
        </div>
        <div class="score-bars">
          <div class="score-bar">
            <div class="bar">
              <div class="bar-filled" style="width:${barWidthObject.bar5}%"></div>
            </div>
            <div class="bar-legend">
              <p>5</p>
              <i class="bi bi-star-fill h7"></i>
            </div>
          </div>
          <div class="score-bar">
            <div class="bar">
              <div class="bar-filled" style="width:${barWidthObject.bar4}%"></div>
            </div>
            <div class="bar-legend">
              <p>4</p>
              <i class="bi bi-star-fill h7"></i>
            </div>
          </div>
          <div class="score-bar">
            <div class="bar">
              <div class="bar-filled" style="width:${barWidthObject.bar3}%"></div>
            </div>
            <div class="bar-legend">
              <p>3</p>
              <i class="bi bi-star-fill h7"></i>
            </div>
          </div>
          <div class="score-bar">
            <div class="bar">
              <div class="bar-filled" style="width:${barWidthObject.bar2}%"></div>
            </div>
            <div class="bar-legend">
              <p>2</p>
              <i class="bi bi-star-fill h7"></i>
            </div>
          </div>
          <div class="score-bar">
            <div class="bar">
              <div class="bar-filled" style="width:${barWidthObject.bar1}%"></div>
            </div>
            <div class="bar-legend">
              <p>1</p>
              <i class="bi bi-star-fill h7"></i>
            </div>
          </div>
        </div>
    </div>
  `;
}



// Productos Relacionados
function productosRelacionados() {
    const container = document.querySelector('.productos-relacionados');
    container.innerHTML = '<h4>Productos relacionados</h4><div class="relacionados-list"></div>';
    const list = container.querySelector('.relacionados-list');
    if (!productData.relatedProducts || !productData.relatedProducts.length) {
        list.innerHTML = '<p>No hay productos relacionados.</p>';
        return;
    }
    productData.relatedProducts.forEach(prod => {
        const item = document.createElement('div');
        item.className = 'relacionado-item';
        item.innerHTML = `
            <div class="relacionado-img">
                <img src="${prod.image}" alt="${prod.name}">
            </div>
            <div class="relacionado-info">
                <h5>${prod.name}</h5>
                <button onclick="verProductoRelacionado(${prod.id})">Ver producto</button>
            </div>
        `;
        list.appendChild(item);
    });
}


// Función para navegar al producto relacionado
function verProductoRelacionado(id) {
    localStorage.setItem('productID', id);
    window.location.reload();
}