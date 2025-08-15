const PRODUCTS_URL_LIST = "https://japceibal.github.io/emercado-api/cats_products/101.json"

let PRODUCTS_DATA = fetch(PRODUCTS_URL_LIST).then(response => response.json()).then((data) =>{
    console.log(data);
});
