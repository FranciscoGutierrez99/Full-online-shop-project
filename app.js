const express = require("express");
const app = express();
const path = require('path');
const db = require('./database/database');


const session = require('express-session')
const sessionsConfig = require('./config/session');


const authRoutes = require('./routes/auth-routes');
const productsRoutes = require('./routes/products-routes');
const baseRoutes = require('./routes/base-routes')
const adminRoutes = require('./routes/admin-routes');
const cartRoutes = require('./routes/cart-routes');
const orderRoutes = require("./routes/order-routes");

const errorHandlerMiddleware = require('./middlewares/error-handler');
const checkAuthStatus = require('./middlewares/check-auth');
const cartMiddleware = require('./middlewares/cart');
const protectRoutes = require('./middlewares/protect-routes');
const cartUpdateMiddleware = require('./middlewares/update-cart-prices');


app.set('view engine', 'ejs'); //Esto establece el view engine como ejs
app.set('views', path.join(__dirname, 'views')); //Esto son los views que tomara ejs 

app.use(express.static('public'))
app.use('/products/assets',express.static('products-data'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());



app.use(session(sessionsConfig.sessionSettings(sessionsConfig.mongoSession)))

app.use(cartMiddleware);
app.use(cartUpdateMiddleware);


app.use(checkAuthStatus);


app.use(baseRoutes);
app.use(authRoutes);
app.use(productsRoutes);
app.use('/cart',cartRoutes);
app.use(protectRoutes); 
app.use('/orders',orderRoutes);
app.use('/admin',adminRoutes)





app.use(errorHandlerMiddleware);
db.connectToDatabase().then(() => app.listen(3000)).catch((error) => console.log(error));