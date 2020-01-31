const Sequelize = require("../../node_modules/sequelize");
require("../database");

module.exports = sequelize.define(
  "user",
  {
    user_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    full_name: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    email: {
      type: Sequelize.STRING(60),
      allowNull: false,
      validate: {
        isEmail: true
      },
      unique: {
        args: true,
        msg: "Email already exist!"
      }
    },
    password: {
      type: Sequelize.STRING(1000),
      allowNull: false
    },
    birthday: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    phone_number: {
      type: Sequelize.STRING(30),
      allowNull: false
    },
    country: {
      type: Sequelize.STRING(30),
      allowNull: false
    },
    level: {
      type: Sequelize.STRING(10),
      allowNull: false
    },
    status: {
      type: Sequelize.ENUM("on", "off")
    }
  },
  { freezeTableName: true },
  { timesamps: false }
);
