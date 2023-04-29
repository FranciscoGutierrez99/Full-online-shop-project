const Product = require('../models/product-model');



async function getProducts(req,res, next) {
  try {
    const products = await Product.findAll()
    return res.render('customer/products/all-products',{products:products});

  }
  catch(error) {
    return next(error);
  }
}

async function getSingularProduct(req,res,next) {
  try {
    const product = await Product.findOneById(req.params.id);
    res.render('customer/products/singular-product',{product:product});
  }
  catch (error) {
    return next(error);
  }
}






module.exports  = {
  getProducts: getProducts,
  getSingularProduct:getSingularProduct
}