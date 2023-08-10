const Joi = require('joi');

const id = Joi.string().uuid();
const username = Joi.string().min(3).max(30);
const image = Joi.string().uri();

const createUserSchema = Joi.object({
  username: username.required(),
  image: image.required()
});

const updateUserSchema = Joi.object({
  username: username,
  image: image
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };
