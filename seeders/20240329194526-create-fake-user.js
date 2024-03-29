'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('users', [{
      uuid: "342a78a0-dad1-485d-ac64-e7c480f4eee5",
      name: "Vani Yobe",
      email: "Vani@gmail.com",
      password: "HdjdoeVani",
      role: "administrator",
      createdAt: "2024-05-29T18:46:17.440Z",
      updatedAt: "2024-05-29T16:46:17.440Z"
    }], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('People', null, {});
  }
};
