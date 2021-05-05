'use strict';
const { hashingPassword } = require('../helpers/bcrypt')
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      name: 'Ryan',
      email: 'ryan@mail.com',
      password: hashingPassword('ryan123'),
      role: 'Admin',
      updatedAt: new Date(),
      createdAt: new Date()
    }, {
      name: 'Chita',
      email: 'chita@mail.com',
      password: hashingPassword('chita123'),
      role: 'Customer',
      updatedAt: new Date(),
      createdAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
