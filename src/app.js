import express from 'express';
import path from 'path';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import handlebars from 'express-handlebars';

import sessionsRouter from './routers/sessions.router.js';
import productsRouterMD from "../src/routers/api/products.router.js";
import cartsRouterMD from "../src/routers/api/carts.router.js";
import usersRouter from '../src/routers/api/users.router.js';
import Views from "../src/routers/views.router.js"
import config from '../src/config/config.js';

import indexRouter from './routers/index.router.js';
import { init as initPassoport } from './config/passport.config.js';
import { __dirname } from './utils.js';

import cors from 'cors';

const app = express();

const COOKIE_SECRET = config.cookieSecret;
console.log("COOOKIE SERCRETTTT",COOKIE_SECRET);

app.use(cookieParser(COOKIE_SECRET));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// // Configuración Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');


initPassoport();
app.use(passport.initialize());

const corsOptions = {
  origin: 'http://localhost:3000', // Reemplaza con el origen correcto de tu aplicación frontend
  credentials: true,
};

app.use(cors(corsOptions));

app.use('/', indexRouter);
app.use('/api', sessionsRouter, productsRouterMD, cartsRouterMD);
app.use('/api/users', usersRouter);
app.use('/views', Views);

// app.use((error, req, res, next) => {
//   const message = `Ah ocurrido un error desconocido 😨: ${error.message}`;
//   console.log(message);
//   res.status(500).json({ status: 'error', message });
// });

app.use((error, req, res, next) => {
  if (error instanceof Exception) {
    res.status(error.status).json({ status: 'error', message: error.message });
  } else {
    const message = `Ah ocurrido un error desconocido 😨: ${error.message}`;
    console.log(message);
    res.status(500).json({ status: 'error', message });
  }
});

export default app;
