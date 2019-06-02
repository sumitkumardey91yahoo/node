const mysql = require('mysql');
const mode = require("./db-type");

console.log("[mode]>>>", mode)
let mysqlConnection = "";
if (mode.mode == 'production') {
  console.log("[mode-type]>>>", mode)
   mysqlConnection = mysql.createConnection({
    host: 'db4free.net',
    user: 'sumitkumardey',
    password: 'sumit@1991',
    database: 'accounts_manage',
    multipleStatements: true
  });
} else {
  console.log("[mode-type]>>>", "testing")

   mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mobiotics',
    database: 'classicmodels',
    multipleStatements: true
  });
}

console.log("mysqlConnection>>>>>", mysqlConnection)
mysqlConnection.connect(function (err) {
  if (err) {
    console.error("error->>>>>>>>>>", err);
    return;
  } else {
    console.log('db is connected');
  }
});

module.exports = mysqlConnection;
