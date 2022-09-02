'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Books extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Books.belongsToMany(models.User,{through: "userbookrent"})
            Books.belongsTo(models.Rentedcheck)
         
        }
    }
    Books.init({
        isbn: { type: DataTypes.INTEGER, allowNull: false },
        name: DataTypes.TEXT,
        Author: DataTypes.TEXT,
        publishedOn: DataTypes.DATE,
      
        AddedOn: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    }, {
        sequelize,
        modelName: 'Books',
        createdAt: false,
        updatedAt: false
    });
    return Books;
};