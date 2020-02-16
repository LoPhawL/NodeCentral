const sql = require('mssql/msnodesqlv8');
// require("msnodesqlv8");
const config ={
    database: "UdmNode",
    server: "SONY-VAIO",
    driver: "msnodesqlv8",
    options: {
      trustedConnection: true
    }};

const connection = (new sql.ConnectionPool(config));
// .then(pool => {SetPool(pool); console.log(conPool);
//});//.catch(err => console.log('error'));
//  return pool;});

 module.exports = connection.connect();
