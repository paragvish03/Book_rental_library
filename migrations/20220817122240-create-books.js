'use strict';

const sequelize = require("sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      isbn:{
        allowNull:false,
        type: Sequelize.INTEGER

      },
      name: {
        type: Sequelize.TEXT
      },
      Author: {
        type: Sequelize.TEXT
      },
      publishedOn: {
        defaultValue: sequelize.NOW,
        type: Sequelize.DATE
        
      },
    
      AddedOn: {
        defaultValue: sequelize.NOW,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Books');
  }
};