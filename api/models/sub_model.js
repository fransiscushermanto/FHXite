const Sequelize = require("../../node_modules/sequelize");

module.exports = sequelize.define(
  "subscribe",
  {
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
  },
  { freezeTableName: true },
  { timesamps: false }
);
