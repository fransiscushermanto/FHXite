const Sequelize = require("../../node_modules/sequelize");

module.exports = sequelize.define(
  "user",
  {
    user_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: Sequelize.STRING(35),
      allowNull: false
    },
    password: {
      type: Sequelize.STRING(100),
      allowNull: false
    }
  },
  { freezeTableName: true }
);
