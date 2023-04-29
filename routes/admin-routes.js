const express = require('express')

const router = express.Router();

const adminControllers = require('../controllers/admin-controller');
const imageUploadMiddleware = require('../middlewares/image-config');

router.get('/products',adminControllers.getProducts); 

router.post('/products',imageUploadMiddleware,adminControllers.createNewProduct); //Esto obtiene el nuevo post 

router.get('/products/new',adminControllers.getNewProduct)

router.get('/products/:id',adminControllers.updateProduct)

router.post('/products/:id',imageUploadMiddleware,adminControllers.getUpdateProduct);

router.delete('/products/:id',adminControllers.deleteProduct2);

router.get('/orders',adminControllers.getOrders);

router.patch('/orders/:id',adminControllers.updateOrder)


module.exports = router;