let currentProductArray = [];

/**
 * Colocar en el HTML la cantidad de resultados obtenidos
 */
function productResultCount(){
    document.getElementById("product-result-count").innerHTML = `Cantidad de resultados: ${currentProductArray.length}`
}

/**
 * Cargar el ID del producto al almacenamiento interno, 
 * Entendiendo que es importante para mostrar un producto x seleccionado
 * en otra página HTML con información más detallada del mismo
 */
function setProductID(id){
    localStorage.setItem("productID", id);
    window.location = "product-info.html"
}

/**
 * Desplegar el listado de productos
 */
function showProductsList(){
    let htmlContentToAppend = "";

    for (let product of currentProductArray){
        console.log(product.name)
        htmlContentToAppend += `
            <div onclick="setProductID(${product.id})" class="list-item-container cursor-active">
                <img src= ${product.image} alt="Imagen">
                <div class="contenido">
                    <div class="contenido-1">
                    <h3>${product.name}</h3>
                    <hr>
                    <p>${product.description}</p>
                    </div>
                    <div class="contenido-2">
                    <p class="light">Cant. Vendidos: ${product.soldCount}</p>
                    <div class="monedas">
                        <p class="moneda">${product.currency}</p>
                        <div class="resaltado">
                        <p class="precio">${product.cost}</p>
                        </div>
                    </div>
                    </div>
                </div> 
            </div>
        `;
    }
    productResultCount() //Coloca el número total de productos obtenidos en el HTML
    
    document.getElementById("product-list-container").innerHTML = htmlContentToAppend;
}

document.addEventListener("DOMContentLoaded", (e) => {
    getJSONData(PRODUCTS_CARS_URL).then( 
        (resultObj) => {
            if (resultObj.status === "ok"){
                currentProductArray = resultObj.data.products;
                showProductsList();
                buscadorTR(); // Inicializa el buscador en tiempo real
            }
        }
    );
})

// Buscador en tiempo real con dropdown
function buscadorTR() {
    // Obtiene el input del buscador
    let buscador = document.getElementById("buscador");
    // Si no existe el input, termina la función

    if (!buscador) return;
    // Crea y agrega el contenedor del dropdown al body, con id y clase

    let dropdownContainer = document.body.appendChild(Object.assign(document.createElement("div"),{id:"buscador-dropdown", className: "buscador-dropdown"}));
    // Copia el array de productos actual

    let all = currentProductArray.slice();
    // Función que realiza la búsqueda y muestra resultados

    let busqueda = valor => {
        // Normaliza el valor de búsqueda (sin espacios y en minúsculas)
        valor = valor.trim().toLowerCase();
        // Filtra productos según el valor y actualiza la lista mostrada
        showProductsList(currentProductArray = valor ? all.filter(productos=>(productos.name+productos.description).toLowerCase().includes(valor)) : all);
        // Limpia el dropdown
        dropdownContainer.innerHTML = "";
        // Si no hay valor o resultados, oculta el dropdown
        if(!valor||!currentProductArray.length) return dropdownContainer.style.display="none";
        // Agrega hasta 8 resultados al dropdown
        for(let p of currentProductArray.slice(0,8)){
            // Crea un item por producto
            let item = dropdownContainer.appendChild(document.createElement("div"));
            item.className = "buscador-dropdown-item";
            item.textContent = p.name;
            // Al hacer click, selecciona el producto
            item.onclick = _=>setProductID(p.id);
        }
        
        // Posiciona y muestra el dropdown debajo del input
        let r = buscador.getBoundingClientRect();
        dropdownContainer.style.width = r.width+"px";
        dropdownContainer.style.left = r.left+window.scrollX+"px";
        dropdownContainer.style.top = r.bottom+window.scrollY+"px";
        dropdownContainer.style.display = "block";
    };
    // Ejecuta búsqueda al escribir
    buscador.oninput = e=>busqueda(e.target.value);
    // Ejecuta búsqueda al enfocar si hay resultados previos
    buscador.onfocus = e=>{if(dropdownContainer.innerHTML)busqueda(e.target.value)};
    // Oculta el dropdown al perder el foco
    buscador.onblur = _=>setTimeout(_=>dropdownContainer.style.display="none",150);
    // Reposiciona el dropdown al hacer scroll o cambiar tamaño de ventana
    ["scroll","resize"].forEach(ev=>window.addEventListener(ev,_=>{if(dropdownContainer.style.display==="block")busqueda(buscador.value)}));
    // Inicializa la búsqueda vacía
    busqueda("");
}
