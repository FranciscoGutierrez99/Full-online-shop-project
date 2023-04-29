const updateButtonElements = document.querySelectorAll('.cart-item-managment button');
const totalPriceElement = document.querySelector('#cart-total p span');
const cartBadgeElement = document.querySelector('.nav-items .badge');




async function updateCartItem(event) {
  const buttonElement = event.target;
  const cartItem = buttonElement.parentElement.parentElement
  const updateInputElement = cartItem.querySelector('.input-update-element')
  const totalSingularItemPriceParagraphElement = cartItem.querySelector('.cart-item-total-price');



  
  let response 
  try {
    response = await fetch('/cart/items',{
      method:'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        productId: buttonElement.dataset.productid,
        quantity: updateInputElement.value
      })
    });
  }
  catch (error) {
    alert('No se pudo actualizar el carro');
    return;
  }
  

  if (!response.ok) {
    alert('No se pudo actualizar el carro');
    return;
  }

  const responseData = await response.json();

  const newTotalQuantity = responseData.updateCartData.newTotalQuantity;
  const newTotalPrice = responseData.updateCartData.newTotalPrice;
  const updatedItemPrice = responseData.updateCartData.updatedItemPrice;

 


  if (updatedItemPrice === 0) {
    cartItem.parentElement.remove();
  }
  else {
    totalSingularItemPriceParagraphElement.textContent = updatedItemPrice;
  }
  
  cartBadgeElement.textContent = newTotalQuantity;
  totalPriceElement.textContent = newTotalPrice;

}

for (const updateButtonElement of updateButtonElements) {
  updateButtonElement.addEventListener('click',updateCartItem);
}
