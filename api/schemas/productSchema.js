const Joi = require('joi');

const id = Joi.number().integer();
const productName = Joi.string();
const price = Joi.number().integer();
const description = Joi.string().min(10);
const image = Joi.string().uri();
const categoryId = Joi.number().integer();

const limit = Joi.number().integer();
const offset = Joi.number().integer();

const minPrice = Joi.number().integer();
const maxPrice = Joi.number().integer();

const createProductSchema = Joi.object({
  productName: productName.required(),
  price: price.required(),
  description: description.required(),
  image: image.required(),
  categoryId: categoryId.required(),
});

const updateProductSchema = Joi.object({
  productName: productName,
  price: price,
  description: description,
  image: image,
  categoryId: categoryId
});

const getProductSchema = Joi.object({
  id: id.required(),
});

const queryProductSchema = Joi.object({
  limit,
  offset,
  price,
  minPrice,
  maxPrice: maxPrice.when('minPrice', {
    is: Joi.number().integer(),
    then: Joi.required()
  })
})

module.exports = { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema };
