"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("TransactionSources", "code");
    await queryInterface.removeColumn("TransactionSources", "type");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("TransactionSources", "code", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn("TransactionSources", "type", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
