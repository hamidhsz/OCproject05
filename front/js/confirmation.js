const url = window.location.search;
const newUrl = new URLSearchParams(url);
const generetedOrderId = newUrl.get('orderId')
const extractedID = generetedOrderId.substring(0, 8);


document.getElementById('orderId').innerHTML = extractedID;


localStorage.removeItem('cartStorage');