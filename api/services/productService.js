const boom = require('@hapi/boom');

const { models } = require('../../libs/sequelize');

class ProductsService {

  constructor() {}

  // generate() {
  //   const limit = 100;

  //   for (let index = 0; index < limit; index++) {
  //     this.products.push({
  //       id: faker.string.uuid(),
  //       name: faker.commerce.productName(),
  //       price: parseInt(faker.commerce.price(), 10),
  //       image: faker.image.url(),
  //       isBlock: faker.datatype.boolean(),
  //     })
  // }
  // }

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  // find() {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve(this.products);
  //     }, 5000);
  //   })
  // }

  async find() {
    const rta = await models.Product.findAll();
    return rta;
  }

  // async findOne(id) {
  //   const product = this.products.find(item => item.id === id);
  //   if (!product) {
  //     throw boom.notFound('product not found');
  //   }

  //   if (product.isBlock) {
  //     throw boom.conflict('product is block');
  //   }
  //   return product;
  // }

  async findOne(id) {
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound('Product not found')
    }
    return product;
  }

  async update(id, changes) {
    const product = await this.findOne(id);
    const rta = await product.update(changes);
    return rta;
  }

  async delete(id) {
    const product = await this.findOne(id);
    await product.destroy();
    return { id };
  }

}

module.exports = ProductsService;
