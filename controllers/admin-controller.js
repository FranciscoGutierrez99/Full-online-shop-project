const Product = require('../models/product-model');
const mongodb = require('mongodb')
const Order = require("../models/order-model")


async function getProducts(req,res,next) {
  try {
    let products = await Product.findAll()
    res.render('admin/products/all-products',{products:products});
  }
  catch (error) {
    next(error);
    return;
  }
 
}

function getNewProduct(req,res) {
  res.render('admin/products/new-product')
}
  

async function createNewProduct(req,res, next) { 
  const product = new Product({
    ...req.body,
    image:req.file.filename,
  })


  try {
    await product.save()
  }
  catch (error) {
    next(error);
    return;
  }


  res.redirect('/admin/products');
}


async function updateProduct(req,res,next) {
  const postId = req.params.id 
  try {
    const product = await Product.findOne(postId);
    res.render('admin/products/update-product',{product:product})
  }
  catch (error) {
    return next(error);
  }
}

async function getUpdateProduct(req,res,next) {
  const product = new Product({
    ...req.body,
    _id: req.params.id
  });

  if (req.file) {
    product.replaceImage(req.file.filename);
  }

  try{
    await product.save();
  }
  catch (error) {
    return next(error);
  }
  res.redirect('/admin/products');
}


async function deleteProduct(req,res,next) {
  try{
    await Product.remove(req.params.id);
  }
  catch(error) {
    return next(error);
  }
  return res.redirect("/admin/products");
}



async function deleteProduct2(req,res,next) {
  let product;
  try {
    product = await Product.remove(req.params.id);
  } catch(error) {
    return next(error);
  }

  res.json({message: 'Delete product'});
}


async function getOrders(req, res, next) {
  try {
    const orders = await Order.findAll();
    res.render('admin/orders/admin-orders', {
      orders: orders
    });
  } catch (error) {
    next(error);
  }
}

async function updateOrder(req, res, next) {
  const orderId = req.params.id;
  const newStatus = req.body.newStatus;

  try {
    const order = await Order.findById(orderId);
    order.status = newStatus;

    await order.save();

    res.json({ message: 'Order updated', newStatus: newStatus });
  } catch (error) {
    next(error);
  }
}
module.exports = {
  getProducts:getProducts,
  getNewProduct:getNewProduct,
  createNewProduct:createNewProduct,
  updateProduct:updateProduct,
  getUpdateProduct:getUpdateProduct,
  deleteProduct:deleteProduct,
  deleteProduct2:deleteProduct2,
  getOrders:getOrders,
  updateOrder:updateOrder
};