const container = document.getElementById('carrito');
const productNumLabel = document.getElementById('productNum');
const subtotalMoneda = document.getElementById('subtotalMoneda');
const subtotalPrecio = document.getElementById('subtotalPrecio');
const envioGratis = document.getElementById('envioGratis');
const noProducts = document.querySelector('.no-products');
const btnBuyNow = document.getElementById('btnBuyNow');

let globalCart = [];
let totalPriceUSD = 0;
let totalPriceUYU = 0;

document.addEventListener("DOMContentLoaded", async () => {
    const cart = getUserCart();
    if (cart) {
        for (const item of cart) {
            const result = await getJSONData(PRODUCT_INFO_URL + item.id + ".json");
            if (result.status === "ok") {
                container.insertAdjacentHTML('beforeend', addCard(result.data, item.amount));
                globalCart.push({ product: result.data, amount: item.amount });
            }
        }
        addEventsToCards();
        updateProductNumber();
        updateDetail();
    }
});

/**
 * @returns Array de objeto de productos
 */
function getUserCart() {
    return getUser(localStorage.getItem('usuario')).carrito;
}

/**
 * Quitar del carrito actualizando el objeto usuario
 * @param {number} prodID 
 */
function removeFromCart(prodID) {
    const user = getUser(localStorage.getItem('usuario'));
    const carrito = user.carrito;
    const elementoAEliminar = carrito.find((p) => p.id === Number.parseInt(prodID));
    console.log(carrito.indexOf(elementoAEliminar)) //Buscar su posicion en el array carrito);
    
    if (elementoAEliminar) { //Si esta en el carrito
        const posElementoAElminiar = carrito.indexOf(elementoAEliminar); //Buscar su posicion en el array carrito
        carrito.splice(posElementoAElminiar, 1); //Eliminarlo
        updateUser(user.nombre, user.apellido, user.email, user.telefono, user.nombreUsuario, user.fotoURL, carrito);//Actualizar el user object
    }else{
        console.log(prodID + " no está en el carrito");  
    }

    const deleteElement = globalCart.find((p) => p.product.id === Number.parseInt(prodID, 10));
    if (deleteElement) {
        const posElementoAElminiar = globalCart.indexOf(deleteElement);
        globalCart.splice(posElementoAElminiar, 1);
    }
    updateProductNumber();
    updatePrices();
    updateDetail();
    updateCartBadge();
}

/**
 * Sumar un elemento al carrito de un objeto ya existente
 * @param {number} prodID 
 */
function addOneInCart(prodID) {
    const user = getUser(localStorage.getItem('usuario'));
    const carrito = user.carrito;
    const elementoActualizar = carrito.find((p) => p.id === Number.parseInt(prodID, 10));
    elementoActualizar.amount++;
    
    updateUser(user.nombre, user.apellido, user.email, user.telefono, user.nombreUsuario, user.fotoURL, carrito);//Actualizar el user object

    const updateElement = globalCart.find((p) => p.product.id === Number.parseInt(prodID, 10));
    updateElement.amount++;
    updatePrices()
    updateCartBadge();
}

/**
 * Restar un elemento al carrito de un objeto ya existente
 * @param {number} prodID 
 */
function subOneInCart(prodID) {
    const user = getUser(localStorage.getItem('usuario'));
    const carrito = user.carrito;
    const elementoActualizar = carrito.find((p) => p.id === Number.parseInt(prodID, 10));
    elementoActualizar.amount--;
    updateUser(user.nombre, user.apellido, user.email, user.telefono, user.nombreUsuario, user.fotoURL, carrito);//Actualizar el user object
    
    const updateElement = globalCart.find((p) => p.product.id === Number.parseInt(prodID, 10));
    updateElement.amount--;
    updateDetail()
    updateCartBadge();
}

/**
 * Agregar eventos de funcionalidad a las tarjetas
 */
function addEventsToCards() {
    const inputs = document.querySelectorAll('.cart-input');
    const titleContainer = document.querySelectorAll('.contenido-titulo');

    
    //Para todos los contenedores de titulo
    for (const container of titleContainer) {
        const borrarBttn = container.children[1]; //Boton de borrar debe ser el segundo elemento del array titulo
        borrarBttn.onclick = (e) =>{
            const card = e.target.parentElement.parentElement.parentElement.parentElement; //Tantos parent element para devolver la tarjeta
            const prodID = e.target.innerHTML; //ID guardada en el innerHTML del boton
            removeFromCart(prodID); //Eliminar del array carrito
            card.remove(); //Eliminar del html
            updateProductNumber();
        } 
    }
    //Para todos los fieldset
    for (const fieldset of inputs) {
        const subBttn = fieldset.children[0]; //Boton de restar primer elemento
        const input = fieldset.children[1]; //Input segundo elemento
        const addBttn = fieldset.children[2]; //Boton de sumar tercer elemento
        const prodID = fieldset.parentElement.parentElement.parentElement.children[0].children[1].innerHTML;
        
        //Elemento de precio unitario. Ej: 1 x USD 500
        const unitPrice = fieldset.parentElement.parentElement.children[2];
        //Elemento donde se encuentra el precio resaltado
        const sumProductPrice = fieldset.parentElement.parentElement.parentElement.parentElement.children[1].children[0].children[1].children[0];

        let current = Number.parseInt(input.value, 10); 
        let min = Number.parseInt(input.min, 10);
        let max = Number.parseInt(input.max, 10);

        if (max === 0) {
            max = 1;
        }

        if (min === max) {
            addBttn.classList.add('disabled');
        }
        if (current === min) {
            subBttn.classList.add('disabled');
        }

        updateProductPrices(unitPrice, input, sumProductPrice);
        
        addBttn.onclick = () =>{
            
            current = Number.parseInt(input.value, 10); 
            if (current < max) {  //Si no es mayor a la cantidad maxima de productos
                addBttn.classList.remove('disabled');
                subBttn.classList.remove('disabled');
                input.value++; //Sumar
                addOneInCart(prodID);
                updateProductNumber();
            }
            if(current + 1 === max){
                addBttn.classList.add('disabled');
            }
            input.dispatchEvent(new Event('change'));
        };
        subBttn.onclick = () =>{
            current = Number.parseInt(input.value, 10); 
            
            if (min < current) { //Si no es menor que 1
                addBttn.classList.remove('disabled');
                subBttn.classList.remove('disabled');
                
                input.value--; //Restar
                subOneInCart(prodID);
                updateProductNumber();
            }
            if(current - 1 === 1){
                subBttn.classList.add('disabled');
            }
            input.dispatchEvent(new Event('change'));
        };

        //Mostrar precio unitario cuando la cantidad de un producto sea mayor a 1
        input.addEventListener('change', () => {
            updateProductPrices(unitPrice, input, sumProductPrice);
        })
    }
}

/**
 * Esta función se encarga de actualizar el precio de un producto en consecuencia del cambio de cantidad
 * @param {Element} unitPrice 
 * @param {Element} input 
 * @param {number} sumProductPrice 
 */
function updateProductPrices(unitPrice, input, sumProductPrice){
    const originalPrice = unitPrice.children[0].innerHTML; //Precio original extraído del Ej: 1 x USD 5,000.00
    const sumProduct = Number.parseInt(input.value); //Cantidad de un producto deseado
    
    if (sumProduct > 1){
        unitPrice.style.display = "block";
    } else {
        unitPrice.style.display = "none";
    }

    // Extraer la parte numérica con coma y punto
    const match = new RegExp(/(\d{1,3}(?:,\d{3})*\.\d+)/).exec(originalPrice)?.[1];
    if (match) {
        // Reemplazar coma por nada para convertirlo a número
        const numero = Number.parseFloat(match.replaceAll(',', ''));

        //Mostrar el precio total: precio original x cantidad deseada
        const totalPrice = numero * sumProduct;
        sumProductPrice.innerHTML = totalPrice.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    }
}

/**
 * @param {object} product 
 * @returns String con HTML para la tarjeta del producto
 */
function addCard(product, value) {
    const title = product.name;
    const max = product.soldCount; //provisorio ya que no hay valor de stock en la API
    const image = product.images[0];
    const currency = product.currency;
    const price = product.cost.toLocaleString("en-US",{minimumFractionDigits: 2, maximumFractionDigits: 2,}); //Formatear el precio
    const prodID = product.id;
    return `
        <div class="list-item-container cursor-active">
            <div class="img-contenido">
                <img src="${image}" alt="Imagen" onclick="setProductID(${prodID})">
            </div>
            <div class="contenido">
                <div class="contenido-1">
                    <div class="contenido-titulo">
                        <h3>${title}</h3>
                        <button type="button" title="Down" id="delete${prodID}" class="del">${prodID}</button>
                    </div>
                    <div class="contenido-mid">
                        <p>Cantidad:</p>
                        <div class="product-amount">
                            <fieldset class="cart-input">
                                <button type="button" title="Down" id="sub${prodID}" aria-label="Disminuir cantidad"><i class="fas fa-minus"></i></button>
                                <input type="number" name="quantity" id="amount${prodID}" value="${value}" min="1" max="${max}" readonly>
                                <button type="button" title="Up" id="add${prodID}" aria-label="Aumentar cantidad"><i class="fas fa-plus"></i></button>
                            </fieldset>
                        </div>
                        <div class="product-unit-price">
                            <p>1 x ${currency} ${price}</p>
                        </div>
                    </div>
                </div>
                <div class="contenido-2">
                    <div class="monedas">
                        <p class="moneda">${currency}</p>
                        <div class="resaltado">
                        <p class="precio">${price}</p>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    `
}
/**
 * Tomar el valor de todos los inputs y sumarlos para obtener cantidad total de productos
 */
function updateProductNumber() {
    let inputArray = document.querySelectorAll('input[name="quantity"]');
    
    let sum = 0;
    for (const input of inputArray) {
        sum += Number.parseInt(input.value, 10);
    }
    productNumLabel.innerHTML = `Productos (${sum})`
    
    // Deshabilitar botón de comprar y mostrar mensaje de "¡Tu carrito está vacío!" cuando
    // la suma de productos sea 0
    if (sum == 0){
        btnBuyNow.disabled = true;
        noProducts.style.display = 'block';
    } else {
        noProducts.style.display = 'none';
        btnBuyNow.disabled = false;
    }
    
    // Envío gratis
    if(sum > 2) {
        envioGratis.classList.remove('envio-disabled');
    }else{
        envioGratis.classList.add('envio-disabled');
    }
    updateDetail();
}

/**
 * Pesos uruguayos a dolares
 * @param {number} val 
 * @returns dolares
 */
function uyuToUsd(val) {
    return val / 40;
}

/**
 * @returns precio total en USD o en UYU
 */
function calculateTotalPrice() {
    if (globalCart.every(p => p.product.currency === "UYU")) {
        return totalPriceUYU; //No se necesita conversion
    }
    //Sino calcular en USD
    return totalPriceUSD + uyuToUsd(totalPriceUYU);
}


/**
 * Actualiza los precios, se fija el tipo de moneda y actualiza el resumen con esta informacion
 */
function updateDetail() {
    updatePrices();
    let total = calculateTotalPrice().toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    //Detectar si hay solo productos en UYUs
    const hasUSD = globalCart.some(p => p.product.currency === "USD");
    const hasUYU = globalCart.some(p => p.product.currency === "UYU");

    if (hasUSD && !hasUYU) {
        subtotalMoneda.innerHTML = "USD";
    } else if (!hasUSD && hasUYU) {
        subtotalMoneda.innerHTML = "UYU";
    } else if (hasUSD && hasUYU) {
        //Cuando hay monedas mezcladas
        subtotalMoneda.innerHTML = "USD (total convertido)";
    } else {
        //Vaciar carrito
        subtotalMoneda.innerHTML = "";
        total = "0.00";
    }

    subtotalPrecio.innerHTML = total;
}


/**
 * Actualiza las variables globales de precio total en USD y UYU
 */
function updatePrices() {
    totalPriceUSD = 0;
    totalPriceUYU = 0;
    
    for (const product of globalCart) {
        if (product.product.currency === "USD") {
            totalPriceUSD += product.product.cost * product.amount; 
        }
        if (product.product.currency === "UYU") {
            totalPriceUYU += product.product.cost * product.amount; 
        }
    }
}

/**
 * Para llevar a product-info al cliquear la imagen del producto
 * @param {number} id 
 */
function setProductID(id) {
  localStorage.setItem("productID", id);
  globalThis.location = "product-info.html";
}