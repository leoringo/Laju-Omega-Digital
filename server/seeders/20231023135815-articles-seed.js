'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let data = require("../data/articles.json").map((e) => {
      e.createdAt = e.updatedAt = new Date()
      e.totalViews = 0
      return e
    })
    await queryInterface.bulkInsert('Articles', data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Articles', null, {});
  }
};
