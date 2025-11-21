const CATEGORIES_URL = "http://localhost:3000/category/";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "http://localhost:3000/products/";
const PRODUCT_INFO_URL = "http://localhost:3000/products/";
const PRODUCT_INFO_COMMENTS_URL = "http://localhost:3000/products/comments/";
const CART_INFO_URL = "http://localhost:3000/cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url, {
      headers: { 
        "Content-Type": "application/json",
        "user_id": "1"
      }
    }
    )
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw new Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

async function post(request) {
  try {
    const response = await fetch(request);

    const text = await response.text(); // read raw text
    //console.log("Raw response:", text);

    const result = JSON.parse(text || "{}"); // avoid empty parse
    //console.log("Success:", result);

  } catch (error) {
    console.error("Error:", error);
  }
}

async function del(request) {
  try {
    const response = await fetch(request);

    const text = await response.text(); // read raw text
    //console.log("Raw response:", text);

    const result = JSON.parse(text || "{}"); // avoid empty parse
    //console.log("Success:", result);

  } catch (error) {
    console.error("Error:", error);
  }
}

async function put(request) {
  try {
    const response = await fetch(request);

    const text = await response.text(); // read raw text
    //console.log("Raw response:", text);

    const result = JSON.parse(text || "{}"); // avoid empty parse
    //console.log("Success:", result);

  } catch (error) {
    console.error("Error:", error);
  }
}