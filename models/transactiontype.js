"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TransactionType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TransactionType.hasMany(models.Transaction, {
        foreignKey: "transactionTypeId",
      });
    }
  }
  TransactionType.init(
    {
      name: DataTypes.STRING,
      code: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "TransactionType",
    }
  );
  return TransactionType;
};
