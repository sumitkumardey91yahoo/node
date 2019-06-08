
const mysql = require('mysql');
const express = require('express');
var app_data = express();
const bodyparser = require('body-parser');

const vsprintf = require('sprintf-js').vsprintf;

app_data.use(bodyparser.json());

// localhost

// killall -9 node {}

// var mysqlConnection_data = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "mobiotics",
//     database: "classicmodels",
//     multipleStatements: true
// });

// remote
/*
Server: sql12.freemysqlhosting.net
Name: sql12270206
Username: sql12270206
Password: YNz3si69lE
Port number: 3306
*/
var mysqlConnection_data = mysql.createConnection({
    host: "sql12.freemysqlhosting.net",
    user: "sql12270206",
    password: "YNz3si69lE",
    database: "sql12270206",
    multipleStatements: true
});


mysqlConnection_data.connect((err) => {
    if (!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});


app_data.listen(5000, () => console.log('Express server is runnig at port no : 5000'));

module.exports =  { app_data, mysqlConnection_data, vsprintf}
