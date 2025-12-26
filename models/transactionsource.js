"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TransactionSource extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TransactionSource.hasMany(models.Transaction, {
        foreignKey: "transactionSourceId",
      });
    }
  }
  TransactionSource.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "TransactionSource",
    }
  );
  return TransactionSource;
};
