const boom = require('@hapi/boom');

const { models } = require('../../libs/sequelize');

class UsersService {
  constructor() {}

  // generate() {
  //   const limit = 100

  //   for (let i = 0; i < limit; i++) {
  //     this.users.push({
  //       id: faker.string.uuid(),
  //       username: faker.person.fullName(),
  //       image: faker.image.url(),
  //       isActive: faker.datatype.boolean(),
  //     })
  //   }
  // }

  async create(data) {
    const newUser = await models.User.create(data);
    return newUser;
  }

  async find() {
    const rta = await models.User.findAll();
    return rta;
  }

  // find() {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve(this.users);
  //     }, 3000);
  //   })
  // }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UsersService;
