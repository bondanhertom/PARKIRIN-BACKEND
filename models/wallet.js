"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Wallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Wallet.hasMany(models.Transaction, {
        foreignKey: "walletId",
      });
    }
  }
  Wallet.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Wallet",
    }
  );
  return Wallet;
};
