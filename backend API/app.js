//Dependencies
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

//Use of enviroment variables
require('dotenv/config');

const autJwt = require('./src/helpers/jwt');
const errorHandler = require('./src/helpers/error-handler');

//Connection to DB
require('./src/dbconnection.js');

const app = express();

//middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(autJwt());
app.use(errorHandler);


//Allow connection with other origins
app.use(cors());
app.options('*', cors());

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '127.0.0.2';
const api = process.env.API_URL;

//Router
const productsRouter = require('./src/routes/products');
const usersRouter = require('./src/routes/users');
const ordersRouter = require('./src/routes/orders');
const categoriesRouter = require('./src/routes/categories');

app.use(`${api}/products`, productsRouter);
app.use(`${api}/users`, usersRouter);
app.use(`${api}/orders`, ordersRouter);
app.use(`${api}/categories`, categoriesRouter);
app.use('/public/uploads', express.static(__dirname + '/src/public/uploads'));

//Server
app.listen(PORT, HOST, () => {
	console.log(`Servidor iniciado en http://${HOST}:${PORT}/`);
});
