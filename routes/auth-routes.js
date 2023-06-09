const express = require('express')

const router = express.Router();

const authControllers = require('../controllers/auth-controller');


router.get('/signup',authControllers.getSignup);

router.post('/signup',authControllers.postSignup);

router.get('/login',authControllers.getLogin);

router.post('/login',authControllers.postLogin);

router.post('/logout',authControllers.logout);


module.exports = router;