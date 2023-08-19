const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

const getConnection = require('../../libs/postgres')

class UsersService {
  constructor() {
    this.users = [];
    this.generate();
  }

  generate() {
    const limit = 100

    for (let i = 0; i < limit; i++) {
      this.users.push({
        id: faker.string.uuid(),
        username: faker.person.fullName(),
        image: faker.image.url(),
        isActive: faker.datatype.boolean(),
      })
    }
  }

  async create(data) {
    const newUser = {
      id: faker.string.uuid(),
      ...data
    }
    this.users.push(newUser);
    return newUser;
  }

  async find() {
    const client = await getConnection();
    const rta = await client.query('SELECT * FROM task');
    return rta.rows;
  }

  // find() {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve(this.users);
  //     }, 3000);
  //   })
  // }

  async findOne(id) {
    const user = this.users.find(item => item.id === id);
    if (!user) {
      throw boom.notFound('User not found');
    }
    if (!user.isActive) {
      throw boom.conflict('User is block');
    }
    return user;
  }

  async update(id, changes) {
    const index = this.users.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('User not found');
    }
    const user = this.users[index];
    this.users[index] = {
      ...user,
      ...changes
    };
    return this.users[index];
  }

  async delete(id) {
    const index = this.users.findIndex(item => item.id === id);

    if (index === -1) {
      throw new Error('User not found');
    }

    this.users.splice(index, 1);
    return { id };
  }
}

module.exports = UsersService;
