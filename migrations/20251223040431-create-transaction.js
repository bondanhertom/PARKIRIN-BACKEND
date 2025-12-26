"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Transactions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      amount: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: "Users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      transactionTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "TransactionTypes", key: "id" },
      },
      transactionSourceId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "TransactionSources", key: "id" },
      },
      walletId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Wallets", key: "id" },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Transactions");
  },
};
