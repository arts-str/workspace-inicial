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
                        <p class="precio"> ${product.cost.toLocaleString('es-UY', { style: 'currency', currency: product.currency })}
</p>

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
    
    getJSONData(PRODUCTS_URL + localStorage.getItem('catID')+'.json').then( 
        (resultObj) => {
            if (resultObj.status === "ok"){
                currentProductArray = resultObj.data.products;
                showProductsList();
            }
        }
    );
})