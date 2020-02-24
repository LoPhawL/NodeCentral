// const sql = require('mssql/msnodesqlv8');
const sql = require('mssql');
// const config ={
//     database: "nodemane",
//     server: "SONY-VAIO",
//     driver: "msnodesqlv8",
//     options: {
//       trustedConnection: true
//     }};

    const config ={
      database: "nodemane",
      server: "nodemane.database.windows.net",
      user: "nodemaneadmin",
      password: "1234@Abcd",
      options:
      {
        encrypt:true
      }
    };
  
// const connection = (new sql.ConnectionPool(config));

 module.exports =(new sql.ConnectionPool(config)).connect();// connection.connect();
