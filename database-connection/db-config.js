const mysql = require('mysql');
const mode = require("./db-type");

console.log("[mode]", mode)
let mysqlConnection = "";
if (mode === 'production') {
   mysqlConnection = mysql.createConnection({
    host: 'db4free.net',
    user: 'sumitkumardey',
    password: 'sumit@1991',
    database: 'accounts_manage',
    multipleStatements: true
  });
} else {
   mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mobiotics',
    database: 'classicmodels',
    multipleStatements: true
  });
}

mysqlConnection.connect(function (err) {
  if (err) {
    console.error(err);
    return;
  } else {
    console.log('db is connected');
  }
});

module.exports = mysqlConnection;
