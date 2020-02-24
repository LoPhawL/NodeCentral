const Sequelize = require('sequelize');

const sequelize = new Sequelize('sequelize','nodemaneadmin','1234@Abcd',
{
  host:'nodemane.database.windows.net',
  dialecT:'mssql'
});

module.exports = sequelize;