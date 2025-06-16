"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SubType extends Model {
    static associate(models) {
      SubType.hasMany(models.Transaction, {
        foreignKey: "subTypeId",
        as: "transactions",
      });
    }
  }
  SubType.init(
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
      modelName: "SubType",
    }
  );
  return SubType;
};
