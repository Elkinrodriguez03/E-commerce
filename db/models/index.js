const { User, UserSchema } = require('./userModel');
const { Product, ProductSchema } = require('./productModel');
const { Customer, CustomerSchema } = require('./customerModel');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));

  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
}

module.exports = setupModels;