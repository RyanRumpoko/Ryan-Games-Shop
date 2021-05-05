'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Carts', 'ProductId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Products',
        key: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Carts', 'ProductId');
  }
};
