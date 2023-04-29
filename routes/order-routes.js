const express = require('express')

const router = express.Router();

const orderController = require('../controllers/orders-controller');

router.get('/', orderController.getOrders);

router.post('/',orderController.AddOrders);

router.get('/success',orderController.getSuccess);

router.get('/failure',orderController.getFailure);

module.exports = router