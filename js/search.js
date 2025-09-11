let allProductsArray = [];
let search = "";

const inputBusqueda = document.getElementById('inputBusqueda');
inputBusqueda.addEventListener('input', ()=>{
    search = inputBusqueda.value;
    devolverBusqueda(search, allProductsArray);
})


getJSONData(CATEGORIES_URL).then( 
        (resultObj) => {
            if (resultObj.status === "ok"){
                for (const element of resultObj.data) {
                    getJSONData(PRODUCTS_URL + element.id + '.json').then(
                        (result) => {
                            if (result.status === "ok"){
                                if (result.data.products.length > 0) {
                                    allProductsArray.push(result.data.products);
                                }
                            }
                        }
                    );
                }
                
            }
        }
);

function devolverBusqueda(busqueda, productos){
    productos.forEach(e => {
        for (const prod of e) {
            if (prod.name.toLowerCase().includes(busqueda.toLowerCase())) {
                console.log(prod);
            }

        }
    });
}