const addButtonElement = document.querySelector('#product-details button');
const cartBadgeElement = document.querySelector('.nav-items .badge');
const updateButtonElements = document.querySelectorAll('.update');
const updateInputElement = document.querySelector('.cart-item-managment input'); 
const totalSingularItemPriceParagraphElement = document.querySelector('.cart-item-info p');
const totalPriceElement = document.querySelector('.cart-total p');


async function addToCart() {

  const productId = addButtonElement.dataset.productid;
  let response;
  try {
    response = await fetch('/cart/items', {
      method:'POST',
      body: JSON.stringify({
        productId:  productId
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  catch (error) {
    alert('Something went wrong!');
    return 
  }
 


  
  if (!response.ok) {
    alert('Something went wrong!');
    return 
  }

  const responseData = await response.json();

  const newTotalQuantity = responseData.newTotalItems

  cartBadgeElement.textContent = newTotalQuantity;
}








addButtonElement.addEventListener('click',addToCart);


for (const updateButtonElement of updateButtonElements) {
  updateButtonElement.addEventListener('click',updateCartItem) 
}