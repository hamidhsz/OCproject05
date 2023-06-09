//** JS code responsible for rendering the cart items on cart.html page based on the data stored in the localstorage. */

// ! Get the cart items container element
const cartItemsContainer = document.getElementById('cart__items');
// ! Get the total quantity and price elements
const totalQuantityElement = document.getElementById('totalQuantity');
const totalPriceElement = document.getElementById('totalPrice');

// ! Retrieve cart data from localStorage
const cartData = JSON.parse(localStorage.getItem('cartStorage'));

let currentItems = JSON.parse(localStorage.getItem('cartStorage'));

// Check if the cart is empty or not
if (cartData) { //cartData exists and it's not empty (turthy value)
  
  // Iterate over each product in the cartData array
  cartData.forEach(product => {
    // Create HTML elements for each cart item
    const cartItems = `
    <article class="cart__item" data-id="${product.id}" data-color="${product.color}">
        <div class="cart__item__img">
          <img src="${product.image}" alt="Photo of a sofa">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${product.name}</h2>
            <p>${product.color}</p>
            <p>€${product.price}</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Quantity :</p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Delete</p>
            </div>
          </div>
        </div>
      </article>
    `;
    // Append the generated HTML to the cart items container
    cartItemsContainer.innerHTML += cartItems;

  });

  // Calculate the total quantity and price
  
  const totalQuantity = cartData.reduce((total, product) => total + product.quantity, 0);
  const totalPrice = cartData.reduce((total, product) => total + (product.price * product.quantity), 0);

  // Update the total quantity and price elements
  totalQuantityElement.textContent = totalQuantity;
  totalPriceElement.textContent = totalPrice;
} else {
  // Cart is empty, display a message
  const noCartMessage = document.createElement('p');
  noCartMessage.textContent = 'Your cart is empty.';
  cartItemsContainer.appendChild(noCartMessage);

  // nothing in the card so, hide the total price and quantity element
  document.querySelector('.cart__price').style.display = 'none';
}

//modification (delete buttons)
const deleteButtons = document.querySelectorAll('.deleteItem');
        deleteButtons.forEach(button => button.addEventListener('click', (event) => {
          const articleDelete = event.target.closest("article");
          const checkId = articleDelete.getAttribute('data-id');
          
          
          // let currentItems = JSON.parse(localStorage.getItem('cartStorage'));
          console.log(currentItems);
          for (let i = 0; i<currentItems.length; i++){
            if (checkId === currentItems[i].id){
              currentItems.splice(i,1);
              break;
            }


          };
          if (currentItems.length === 0){
            localStorage.removeItem('cartStorage');

          } else{
            localStorage.setItem('cartStorage',JSON.stringify(currentItems))


          }
          articleDelete.remove();
          const totalQuantity = currentItems.reduce((total, product) => total + product.quantity, 0);
          const totalPrice = currentItems.reduce((total, product) => total + (product.price * product.quantity), 0);
          totalQuantityElement.textContent = totalQuantity;
          totalPriceElement.textContent = totalPrice;

          console.log(currentItems);
    }));
    

//modification (Qantity)
const handleChange = function(event) {
  let newQuantity = event.target.value;
  // console.log(typeof(newQuantity));
  
  let currentSelected = event.target.closest('article');
  const checkId = currentSelected.getAttribute('data-id');
  const checkColor = currentSelected.getAttribute('data-color');

  let selectedItem = currentItems.find(product => product.id === checkId && product.color === checkColor);
  selectedItem.quantity = newQuantity;

  localStorage.setItem('cartStorage', JSON.stringify(currentItems));
  

  const totalQuantity = currentItems.reduce((total, product) => total + Number(product.quantity), 0);
  const totalPrice = currentItems.reduce((total, product) => total + (product.price * product.quantity), 0);
  totalQuantityElement.textContent = totalQuantity;
  totalPriceElement.textContent = totalPrice;
};

document.querySelectorAll('.itemQuantity').forEach(quantityInput => {
  quantityInput.addEventListener('change', handleChange);
});






const orderButton = document.getElementById('order');
orderButton.addEventListener('click', (event)=> {
  event.preventDefault();
  //handle userdata input
const firstNameInput = document.getElementById('firstName').value;
const lastNameInput = document.getElementById('lastName').value;
const addressInput = document.getElementById('address').value;
const cityInput = document.getElementById('city').value;
const emailInput = document.getElementById('email').value;
  // Regex patterns for validation
var namePattern = /^[a-zA-Z\s'-]+$/;
var addressPattern = /^[a-zA-Z0-9\s,'-]+$/;
var cityPattern = /^[a-zA-Z\s]+$/;
var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Clear any previous error messages
document.getElementById("firstNameErrorMsg").textContent = "";
document.getElementById("lastNameErrorMsg").textContent = "";
document.getElementById("addressErrorMsg").textContent = "";
document.getElementById("cityErrorMsg").textContent = "";
document.getElementById("emailErrorMsg").textContent = "";
  // Validate input fields
if (!namePattern.test(firstNameInput)) {
  document.getElementById("firstNameErrorMsg").textContent = "Invalid first name";
  return;
}
if (!namePattern.test(lastNameInput)) {
  document.getElementById("lastNameErrorMsg").textContent = "Invalid last name";
  return;
}
if (!addressPattern.test(addressInput)) {
  document.getElementById("addressErrorMsg").textContent = "Invalid address";
  return;
}
if (!cityPattern.test(cityInput)) {
  document.getElementById("cityErrorMsg").textContent = "Invalid city";
  return;
}
if (!emailPattern.test(emailInput)) {
  document.getElementById("emailErrorMsg").textContent = "Invalid email";
  return;
}
  let data = {
    contact: {
    firstName: firstNameInput,
    lastName: lastNameInput,
    address: addressInput,
    city: cityInput,
    email: emailInput,
    },
    products: currentItems
    
  };
  // console.log(data);
  // console.log(data.contact.products);
  let options = {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    };
    
    fetch('http://localhost:3000/api/products/order', options)
    .then(resp => resp.json())
    .then(data => window.location.href =  'file:///Users/Hamid/Coding/OC/Project05/OCproject05/front/html/confirmation.html?orderId='+ data.orderId )
});








    






