
var data = require('./db-connection');
const app = data.app_data;
const mysqlConnection = data.mysqlConnection_data;
const sprintf = data.vsprintf;

//Get all employees
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

app.get('/sumit/:id', (req, res) => {
    console.log("data", req.params);

});
