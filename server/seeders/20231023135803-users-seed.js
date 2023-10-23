'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let data = require("../data/users.json").map((e) => {
      e.createdAt = e.updatedAt = new Date()
      e.password = require('bcryptjs').hashSync(e.password, 5)
      return e
    })
    await queryInterface.bulkInsert('Users', data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
