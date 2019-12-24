const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.HOST,
    dialect: "mysql",
    operatorsAliases: false,
    define: {
      timestamps: false,
      freezeTableName: true
    }
  }
);

sequelize.sync();
module.exports = sequelize;
global.sequelize = sequelize;
