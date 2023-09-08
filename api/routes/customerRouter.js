const express = require('express');

const CustomerService = require('./../services/customerService');
const validatorHandler = require('./../middleware/validatorHandler');
const { createCustomerSchema, updateCustomerSchema, getCustomerSchema } = require('./../schemas/customerSchema');

const router = express.Router();
const customerService = new CustomerService();

router.get('/', async (req, res, next) => {
  try {
    const customers = await customerService.find();
    res.json(customers);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const customer = await customerService.findOne(id);
    res.json(customer);
  } catch (error) {
    next(error);
  }
});

router.post('/',
  validatorHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCustomer = await customerService.create(body);
      res.status(201).json(newCustomer);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const customer = await customerService.update(id, body);
      res.json(customer);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const answer = await customerService.delete(id);
  res.json(answer);
});

module.exports = router;
