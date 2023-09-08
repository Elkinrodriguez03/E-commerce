const express = require('express');

const productsRouter = require('./productsRouter');
const usersRouter = require('./usersRouter');
const customersRouter = require('./customerRouter');

function routerApi(app) {
  const router = express.Router();

  app.use('/api/v1', router);

  router.use('/users', usersRouter);
  router.use('/products', productsRouter);
  router.use('/customers', customersRouter);
}

module.exports = routerApi;
