var express = require('express');
var router = express.Router();

const mysqlConnection = require('../database-config/db-config.js');

const photoControllers  = require('../controllers/photo-controller');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/photos', (req, res) => {
  mysqlConnection.query('SELECT * FROM photo_album', (err, rows, fields) => {
    if(!err) {
      res.send(rows);
    } else {
      res.json({status: 'error'});
    }
  });
});

router.get('/photo/:id', (req, res) => {
  const { id } = req.params;
  let query = 'SELECT * FROM photo_album WHERE id = ?';
  mysqlConnection.query(query, [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      res.json({status: 'error'});
    }
  });
});

router.post('/photo', (req, res) => {
  const {title, src} = req.body;

  const query = 'INSERT INTO `photo_album`(`id`, `title`, `src`) VALUES (?,?,?)';
  mysqlConnection.query(query, [null, title, src], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'ok'});
    } else {
        res.json({status: 'error'});
    }
  });

});

router.put('/photo/:id', (req, res) => {
  const {title, src} = req.body;
  const { id } = req.params;
  const query = photoControllers.updateHandle(req);

  mysqlConnection.query(query, [title, src, id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'ok'});
    } else {
        res.json({status: 'error'});
    }
  });

});

module.exports = router;
