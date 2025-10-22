const container = document.getElementById('container');
const productNumLabel = document.getElementById('productNum');
const subtotalMoneda = document.getElementById('subtotalMoneda');
const subtotalPrecio = document.getElementById('subtotalPrecio');
const envioGratis = document.getElementById('envioGratis');
let globalCart = [];
let totalPriceUSD = 0;
let totalPriceUYU = 0;

document.addEventListener("DOMContentLoaded", async () => {
    addToCart(50925);
    addToCart(60801);

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
 * @returns Array de IDs de productos
 */
function getUserCart() {
    return getUser(localStorage.getItem('usuario')).carrito;
}
/**
 * Quitar del carrito actualizando el objeto usuario
 * @param {number} prodID 
 */
function addToCart(prodID) {
    const user = getUser(localStorage.getItem('usuario'));
    const carrito = user.carrito;
    if (!carrito.find((p) => p.id === prodID)) { //Si no esta en el carrito
        carrito.push({id: prodID, amount: 1}); //Agregarlo
        updateUser(user.name, user.apellido, user.email, user.telefono, user.nombreUsuario, user.fotoURL, carrito); //Actualizar el user object
    }else{
        console.log(prodID + " ya esta en el carrito");  
    }
}
/**
 * Quitar del carrito actualizando el objeto usuario
 * @param {number} prodID 
 */
function removeFromCart(prodID) {
    const user = getUser(localStorage.getItem('usuario'));
    const carrito = user.carrito;
    const elementoAEliminar = carrito.find((p) => p.id === parseInt(prodID, 10));
    console.log(carrito.indexOf(elementoAEliminar)) //Buscar su posicion en el array carrito);
    
    if (elementoAEliminar) { //Si esta en el carrito
        const posElementoAElminiar = carrito.indexOf(elementoAEliminar); //Buscar su posicion en el array carrito
        carrito.splice(posElementoAElminiar, 1); //Eliminarlo
        updateUser(user.name, user.apellido, user.email, user.telefono, user.nombreUsuario, user.fotoURL, carrito);//Actualizar el user object
    }else{
        console.log(prodID + " no está en el carrito");  
    }

    const deleteElement = globalCart.find((p) => p.product.id === parseInt(prodID, 10));
    if (deleteElement) {
        const posElementoAElminiar = globalCart.indexOf(deleteElement);
        globalCart.splice(posElementoAElminiar, 1);
    }
    updateProductNumber();
    updatePrices();
    updateDetail();


}

function addOneInCart(prodID) {
    const user = getUser(localStorage.getItem('usuario'));
    const carrito = user.carrito;
    const elementoActualizar = carrito.find((p) => p.id === parseInt(prodID, 10));
    elementoActualizar.amount++;
    
    updateUser(user.name, user.apellido, user.email, user.telefono, user.nombreUsuario, user.fotoURL, carrito);//Actualizar el user object

    const updateElement = globalCart.find((p) => p.product.id === parseInt(prodID, 10));
    updateElement.amount++;
    updatePrices()
    
}
function subOneInCart(prodID) {
    const user = getUser(localStorage.getItem('usuario'));
    const carrito = user.carrito;
    const elementoActualizar = carrito.find((p) => p.id === parseInt(prodID, 10));
    elementoActualizar.amount--;
    updateUser(user.name, user.apellido, user.email, user.telefono, user.nombreUsuario, user.fotoURL, carrito);//Actualizar el user object
    
    const updateElement = globalCart.find((p) => p.product.id === parseInt(prodID, 10));
    updateElement.amount--;
    updateDetail()
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
        const prodID = fieldset.parentElement.parentElement.children[0].children[1].innerHTML;
        
        let current = parseInt(input.value, 10); 
        let min = parseInt(input.min, 10);
        let max = parseInt(input.max, 10);

        if (max === 0) {
            max = 1;
        }

        if (min === max) {
            addBttn.classList.add('disabled');
        }
        if (current === min) {
            subBttn.classList.add('disabled');
        }
        
        addBttn.onclick = () =>{
            
            current = parseInt(input.value, 10); 
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
        };
        subBttn.onclick = () =>{
            current = parseInt(input.value, 10); 
            
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
        };
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
            <img src="${image}" alt="Imagen" onclick="setProductID(${prodID})">
            <div class="contenido">
                <div class="contenido-1">
                    <div class="contenido-titulo">
                        <h3>${title}</h3>
                        <button type="button" title="Down" id="delete" class="del">${prodID}</button>
                    </div>
                    <hr>
                    <div class="contenido-mid">
                        <p>Cantidad:</p>
                        <fieldset class="cart-input">
                            <button type="button" title="Down" id="sub" class="sub">Down</button>
                            <input type="number" name="quantity" id="amount" value="${value}" min="1" max="${max}" readonly>
                            <button type="button" title="Up" id="add" class="add">Up</button>
                        </fieldset>
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

function updateProductNumber() {
    let inputArray = document.querySelectorAll('input[name="quantity"]');
    
    let sum = 0;
    for (const input of inputArray) {
        sum += parseInt(input.value, 10);
    }
    productNumLabel.innerHTML = `Productos (${sum})`
    if (sum > 2) {
        envioGratis.classList.remove('envio-disabled');
    }else{
        
        envioGratis.classList.add('envio-disabled');
    }
    updateDetail();
}


function uyuToUsd(val) {
    return val / 40;
}

function calculateTotalPrice() {
    if (globalCart.every(p => p.product.currency === "UYU")) {
        return totalPriceUYU; // no conversion needed
    }
    // otherwise calculate in USD
    return totalPriceUSD + uyuToUsd(totalPriceUYU);
}



function updateDetail() {
    updatePrices();
    let total = calculateTotalPrice().toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    // ✅ Detect if there are only UYU products
    const hasUSD = globalCart.some(p => p.product.currency === "USD");
    const hasUYU = globalCart.some(p => p.product.currency === "UYU");

    if (hasUSD && !hasUYU) {
        subtotalMoneda.innerHTML = "USD";
    } else if (!hasUSD && hasUYU) {
        subtotalMoneda.innerHTML = "UYU";
    } else if (hasUSD && hasUYU) {
        // Mixed currencies — show both or choose a standard label
        subtotalMoneda.innerHTML = "USD (total convertido)";
    } else {
        // Empty cart
        subtotalMoneda.innerHTML = "";
        total = "0.00";
    }

    subtotalPrecio.innerHTML = total;
}



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


function setProductID(id) {
  localStorage.setItem("productID", id);
  window.location = "product-info.html";
}