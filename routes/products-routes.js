const express = require('express')

const router = express.Router();

const products = require('../controllers/products-controllers');

router.get('/products',products.getProducts);

router.get('/products/:id',products.getSingularProduct)

module.exports = router;