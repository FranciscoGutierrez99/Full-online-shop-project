const Order = require('../models/order-model');
const User = require('../models/user-model');
const stripe = require('stripe')('sk_test_51N0yYfHM3KV53i0vkBpgyEXV5bi99vcqQV2nTHYRC8xL0rjROnXr0x8NcERHNrT9qbTj2Q1JwcYhqnBOmQfTMbTj00XxuoYUop');

async function getOrders(req,res,next) {
  let orders;
  try{
    orders = await Order.findAllForUser(res.locals.uid);
  } 
  catch (error) {
    return next(error);
  }
  res.render('customer/orders/orders',{orders:orders});
}


async function AddOrders(req,res,next) {
  const cart = res.locals.cart;
  const userId = req.session.uid
  let user;
  try {
    user = await User.getUserById(userId);
  }
  catch(error) {
    next(error);
    return;
  }

  const order = new Order(cart,user);

  try {
    await order.save();
  }
  catch (error) {
    return next(error);
  }

  req.session.cart = null

  const session = await stripe.checkout.sessions.create({
    line_items: cart.items.map(function (item) {
      return { 
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.product.title,
          },
          unit_amount: +item.product.price*100 , //unit_amount me pone el precio en centavos por lo cual debemos de multiplicar por 100
        },
        quantity: item.quantity,
      }
    }),    
    mode: 'payment',
    success_url: 'http://localhost:3000/orders/success',
    cancel_url: 'http://localhost:3000/orders/failure',
  });

  res.redirect(303, session.url);

}


function getSuccess(req,res) {
  res.render('customer/orders/success');
}

function getFailure(req, res) {
  res.render('customer/orders/error');
}

module.exports = {
  getOrders:getOrders,
  AddOrders:AddOrders,
  getSuccess:getSuccess,
  getFailure:getFailure
}