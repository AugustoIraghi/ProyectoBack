import express from 'express';
import handlebars from 'express-handlebars';
import productsRouter from './routers/products.router.js';
import cartsRouter from './routers/carts.router.js';
import mongoose from 'mongoose';
import cartViewRouter from './routers/cartView.router.js';
import productsViewRouter from './routers/productsView.router.js';
import log from './routers/log.router.js';
import logView from './routers/logView.router.js';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import { passportCall } from './utils.js';

const app = express();

app.use(express.json());
app.use(express.static("./public"));
app.use(cookieParser('secret'));

initializePassport();
app.use(passport.initialize());

app.engine('handlebars', handlebars.engine());
app.set('views', './src/views');
app.set('view engine', 'handlebars');

const MONGO_URI = 'mongodb+srv://admin:admin@augustodb.fxwg1iy.mongodb.net/'
const MONGO_DB_NAME = "coder_project"


app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/log', log);
app.use('/products', productsViewRouter);
app.use('/cart', cartViewRouter);
app.use('/log', logView);

app.get('/', (req, res) => {
    res.redirect(301, '/products');
});

try {
    await mongoose.connect(MONGO_URI, { dbName: MONGO_DB_NAME })
    app.listen(8080, () => console.log('Server running on 8080'));
} catch (err) {
    console.log(err.message);
}