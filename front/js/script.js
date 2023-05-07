const endpoint = 'http://localhost:3000/api/products'; 
fetch(endpoint)
    .then(resp => resp.json())
    .then(products => {
        
        console.log(products);

       let productList = "";
       products.forEach(product => {
        console.log(product);
        productList+= `
        <a href="./product.html?id=${product._id}">
            <article>
              <img src="${product.imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name1">
              <h3 class="productName">Kanap name1</h3>
              <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
            </article>
          </a>`
        
       });
       document.querySelector('#items').insertAdjacentHTML('afterbegin',productList);
    })