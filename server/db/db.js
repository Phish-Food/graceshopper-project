const Sequelize = require("sequelize");
const pkg = require("../../package.json");
const config = require("./config");
// const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')

const db = new Sequelize({
  database: config.database.name,
  username: config.database.username,
  password: config.database.password,
  host: config.database.host,
  port: config.database.port,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});
module.exports = db;
