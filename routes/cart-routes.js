const express = require('express')

const router = express.Router();

const cartController = require("../controllers/cart-controller");


router.post('/items',cartController.addCartItem);

router.get('/',cartController.getCart);

router.patch('/items', cartController.updateCart);

module.exports = router