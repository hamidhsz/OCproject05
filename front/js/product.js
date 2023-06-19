// Get product ID from the URL
// let url = window.location.href;
// url is an object here so we can search the parameters inside the object easily
// with new I am creating an instance of the url object.
// let newURL = new URL(url);
// let productId = newURL.searchParams.get('id');

const url = window.location.search;
const newUrl = new URLSearchParams(url);
const productId = newUrl.get('id')


// request to API
fetch(`http://localhost:3000/api/products/${productId}`)
  .then(resp => resp.json())
  .then(product => {
    // elements with the product details to the DOM 
    document.querySelector('title').textContent =product.name;
    const productImg = document.querySelector('.item__img');
    productImg.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
    document.getElementById('title').textContent = product.name;
    document.getElementById('price').textContent = product.price;
    document.getElementById('description').textContent = product.description;

    const price = product.price; // ! Store the price separately

    // Add color options dynamically
    const colorsSelect = document.getElementById('colors');
    /*Here, we have an object called product with a property called colors 
    that holds an array of color values.By using the forEach method to loop through 
    each color in that array.  */
    product.colors.forEach(color => {
      const option = document.createElement('option');
      option.value = color;
      option.textContent = color;
      colorsSelect.appendChild(option);
    });

    // "Add to Cart" button click
    const addToCartButton = document.getElementById('addToCart');
    addToCartButton.addEventListener('click', () => { 
      const selectedColor = colorsSelect.value;
      if (selectedColor === '')
      return; //do nothing 
      const quantity = document.getElementById('quantity').value;
      
      if (quantity === '0')
      return;
      let cartData = []; //

      if(localStorage.getItem('cartStorage')){ //Retrieving the stored value from localStorage
        cartData =JSON.parse(localStorage.getItem('cartStorage')); //If there is a stored value in localStorage, retrieve it using localStorage.getItem(). Since the retrieved value is stored as a string, JSON.parse() is used to convert it back to an array and assign it to the cartData variable.
      }

      //check if product already exist in cart
      const existingProductIndex = cartData.findIndex(
        (product) => product.id === productId && product.color === selectedColor); //searches for an existing product in the cartData array that matches the provided productId and selectedColor. The findIndex() method returns the index of the first matching element or -1 if no match is found.
      
      if (existingProductIndex !== -1){
        // product already exists in the cart so update the quantity: 
        cartData[existingProductIndex].quantity += Number(quantity);
      } else {
        const productInfo = {
        id:productId,
        color:selectedColor,
        quantity:Number(quantity),
        price: product.price,
        name:product.name,
        image: product.imageUrl,
        altTxt: product.altTxt

      };
      cartData.push(productInfo);
    }
      
      localStorage.setItem('cartStorage', JSON.stringify(cartData)); //Storing a value in localStorage, This ensures that the data can be stored as a string and retrieved later usingß 
  });

});
