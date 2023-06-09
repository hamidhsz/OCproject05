/*
this code fetches a list of products from an API, iterates over each product, generates HTML elements based on 
the product data, and inserts the generated HTML into the document.

*/
//retrieve data from the API  
//URL of the API endpoint that we want to fetch data from
fetch('http://localhost:3000/api/products')
    .then(resp => resp.json())
    .then(products => {
      let productList = ""; //productList variable is initialized as an empty string
       products.forEach(product => { //here is the forEeach loop to get all the products form the api, one by one

        // generating html for each product in the products array 
        productList+= ` 
        <a href="./product.html?id=${product._id}"> 
            <article>
              <img src="${product.imageUrl}" alt="${product.altTxt}">
              <h3 class="productName">${product.name}</h3>
              <p class="productDescription">${product.description}</p>
            </article>
          </a>`
        
       });
       document.querySelector('#items').insertAdjacentHTML('afterbegin',productList);
    });
