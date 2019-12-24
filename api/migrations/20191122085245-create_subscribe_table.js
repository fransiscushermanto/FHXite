"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("subscribe", {
      subs_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: false
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("subscribe");
  }
};
