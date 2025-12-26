"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transaction.belongsTo(models.User, { foreignKey: "userId" });
      Transaction.belongsTo(models.TransactionType, {
        foreignKey: "transactionTypeId",
      });
      Transaction.belongsTo(models.TransactionSource, {
        foreignKey: "transactionSourceId",
      });
      Transaction.belongsTo(models.Wallet, { foreignKey: "walletId" });
    }
  }
  Transaction.init(
    {
      amount: DataTypes.BIGINT,
      description: DataTypes.TEXT,
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      transactionTypeId: { type: DataTypes.INTEGER, allowNull: false },
      transactionSourceId: { type: DataTypes.INTEGER, allowNull: false },
      walletId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
