"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Transactions", "cashType", {
      type: Sequelize.ENUM("cash", "qris"),
      allowNull: false,
      defaultValue: "cash",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Transactions", "cashType");
  },
};
