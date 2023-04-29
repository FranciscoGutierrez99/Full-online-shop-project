const Cart = require('../models/cart-model');

function InititalizeCart(req,res,next) {
  let cart;

  if (!req.session.cart) {
    cart = new Cart();
  }
  else{
    const sessionCart = req.session.cart
    cart = new Cart(
      sessionCart.items,
      sessionCart.totalQuantity,
      sessionCart.totalPrice
    );
  }

  res.locals.cart = cart;
  console.log('hello from cart middleware', res.locals.cart);

  next();
}

module.exports = InititalizeCart