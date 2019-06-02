const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../database-connection/db-config.js');

router.get('/', (req, res) => {
  res.send("welcome")
});
// GET all customer
router.get('/customer', (req, res) => {
  mysqlConnection.query('SELECT * FROM customers', (err, rows, fields) => {
    if(!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
});

// GET An customer
router.get('/customer/:id', (req, res) => {
  const { id } = req.params;
  let query = 'SELECT * FROM customers WHERE customerNumber = ?';
  mysqlConnection.query(query, [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

// DELETE An customer
router.delete('/customer/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM customers WHERE id = ?', [id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'customer Deleted'});
    } else {
      console.log(err);
    }
  });
});

// INSERT An customer
router.post('/customer', (req, res) => {
  const {id, name, salary} = req.body;
  console.log(id, name, salary);
  const query = `
    SET @id = ?;
    SET @name = ?;
    SET @salary = ?;
    CALL customerAddOrEdit(@id, @name, @salary);
  `;
  mysqlConnection.query(query, [id, name, salary], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'customerd Saved'});
    } else {
      console.log(err);
    }
  });

});

router.put('/customer/:id', (req, res) => {
  const { name, salary } = req.body;
  const { id } = req.params;
  const query = `
    SET @id = ?;
    SET @name = ?;
    SET @salary = ?;
    CALL customerAddOrEdit(@id, @name, @salary);
  `;
  mysqlConnection.query(query, [id, name, salary], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'customer Updated'});
    } else {
      console.log(err);
    }
  });
});

module.exports = router;
