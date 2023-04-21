'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('products',[
      {
        name:'Product 1',
        price:100
      },
      {
        name:'Product 2',
        price: 200,
      },
      {
        name: 'Product 3',
        price: 300
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products',null, {})
  }
};
