"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ExpenseCategory extends Model {
    static associate(models) {
      ExpenseCategory.hasMany(models.Transaction, {
        foreignKey: "expenseCategoryId",
        as: "transactions",
      });
    }
  }
  ExpenseCategory.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ExpenseCategory",
    }
  );
  return ExpenseCategory;
};
