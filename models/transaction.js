"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      Transaction.belongsTo(models.User, { foreignKey: "userId" });
      Transaction.belongsTo(models.SubType, {
        foreignKey: "subTypeId",
      });
      Transaction.belongsTo(models.User, {
        as: "Updater",
        foreignKey: "updatedBy",
      });
    }
  }
  Transaction.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM("income", "expense"),
        allowNull: false,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: DataTypes.STRING,
      subTypeId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      cashType: {
        type: DataTypes.ENUM("cash", "qris"),
        allowNull: false,
      },
      updatedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
