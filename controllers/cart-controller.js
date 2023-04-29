const Product = require('../models/product-model');

async function addCartItem(req,res,next) {
  let product
  try{
    product = await Product.findOneById(req.body.productId)

  }
  catch (error) {
    return next(error);
  }
  const cart = res.locals.cart
  // res.locals.cart.addItem(product); //Esto no funciona por que res.locals.cart al ser un model o una clase no podemos usar los metodos por lo cual debemos user const cart.addItem(product)
  cart.addItem(product);
  req.session.cart = cart;


  res.status(201).json({
    message: 'Cart updated',
    newTotalItems: cart.totalQuantity,
    newTotalPrice: cart.totalPrice
  })
}


function getCart(req,res) {
  res.render('customer/cart/cart');
}

function updateCart(req,res,next) {
  const cart = res.locals.cart
  const quantity = +req.body.quantity;
  const productId = req.body.productId
  const updatedPrice = cart.updateItem(productId,quantity);
  req.session.cart = cart;
  res.json({
    message: 'Item updated',
    updateCartData: {
      newTotalQuantity: cart.totalQuantity,
      newTotalPrice: cart.totalPrice,
      updatedItemPrice: updatedPrice
    }
  })

}


module.exports = {
  addCartItem:addCartItem,
  getCart:getCart,
  updateCart:updateCart
}