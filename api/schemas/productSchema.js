const Joi = require('joi');

const id = Joi.number().integer();
const productName = Joi.string();
const brand = Joi.string();
const price = Joi.number().integer();

const createProductSchema = Joi.object({
  productName: productName.required(),
  brand: brand.required(),
  price: price.required()
});

const updateProductSchema = Joi.object({
  productName: productName,
  brand: brand,
  price: price
});

const getProductSchema = Joi.object({
  id: id.required(),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema };
