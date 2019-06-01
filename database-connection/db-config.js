const mysql = require('mysql');

// const mysqlConnection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'mobiotics',
//   database: 'classicmodels',
//   multipleStatements: true
// });

const mysqlConnection = mysql.createConnection({
  host: 'db4free.net',
  user: 'sumitkumardey',
  password: 'sumit@1991',
  database: 'accounts_manage',
  multipleStatements: true
});

mysqlConnection.connect(function (err) {
  if (err) {
    console.error(err);
    return;
  } else {
    console.log('db is connected');
  }
});

module.exports = mysqlConnection;
