const express = require('express');

const productsRouter = require('./productsRouter');
const usersRouter = require('./usersRouter');
const customersRouter = require('./customerRouter');
const categoryRouter = require('./categoryRouter');
const orderRouter = require('./orderRouter');


function routerApi(app) {
  const router = express.Router();

  app.use('/api/v1', router);

  router.use('/users', usersRouter);
  router.use('/products', productsRouter);
  router.use('/customers', customersRouter);
  router.use('/categories', categoryRouter);
  router.use('/orders', orderRouter);
}

module.exports = routerApi;
