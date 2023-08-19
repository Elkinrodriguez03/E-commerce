const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

const pool = require('../../libs/postgresPool');

class ProductsService {

  constructor() {
    this.products = [];
    this.generate();
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));
  }

  generate() {
    const limit = 100;

    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url(),
        isBlock: faker.datatype.boolean(),
      })
  }
  }

  async create(data) {
    const newProduct = {
      id: faker.string.uuid(),
      ...data
    }
    this.products.push(newProduct);
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
    const query = 'SELECT * FROM task';
    const rta = await this.pool.query(query);
    return rta.rows;
  }

  async findOne(id) {
    const product = this.products.find(item => item.id === id);
    if (!product) {
      throw boom.notFound('product not found');
    }

    if (product.isBlock) {
      throw boom.conflict('product is block');
    }
    return product;
  }

  async update(id, changes) {
    const index = this.products.findIndex(item => item.id === id);

    if (index === -1) {
      throw boom.notFound('product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex(item => item.id === id);

    if (index === -1) {
      throw new Error('Product not found');
    }

    this.products.splice(index, 1);
    return { id };
  }

}

module.exports = ProductsService;
