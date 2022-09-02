'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rentedcheck extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Rentedcheck.hasMany(models.Books)
    }
  }
  Rentedcheck.init({
    title: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Rentedcheck',
    createdAt:false,
    updatedAt:false
  });
  return Rentedcheck;
};