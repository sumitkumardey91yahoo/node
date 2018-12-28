const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const app = express();
const bodyparser = require('body-parser');
const mysql = require('mysql');
const sprintf = require('sprintf-js').vsprintf;

// $servername = "db4free.net";
// $username = "sumitkumardey";
// $password = "sumit2013";
// $dbname = "employee_sumit";
// https://www.db4free.net/phpMyAdmin/db_structure.php?db=employee_sumit

var mysqlConnection = mysql.createConnection({
  host: "db4free.net",
  user: "sumitkumardey",
  password: "sumit2013",
  database: "employee_sumit",
  multipleStatements: true
});

app.use(bodyparser.json());


mysqlConnection.connect((err) => {
  if (!err)
      console.log('DB connection succeded.');
  else
      console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});


  app.use(express.static(path.join(__dirname, 'public')))
  app.set('views', path.join(__dirname, 'views'))
  app.set('view engine', 'ejs')
  app.get('/', (req, res) => res.render('pages/index'))
  
  app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
  app.get('/s', (req, res) => res.send('pages/index'))



  app.get('/employees', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    let query = null;
    query = 'select * from employees' + ' ';
    query += sprintf('where employeeNumber = %d', [1612]);
    console.log(query, "test");
    mysqlConnection.query(query, (err, rows, fields) => {
        if (!err)
             res.send(JSON.stringify({"list":rows}));
        else
            console.log(err);
    })
});