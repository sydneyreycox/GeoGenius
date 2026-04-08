var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
require('dotenv').config();

var db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

router.get('/game', function(req, res, next) {
  db.query('SELECT * FROM question', (err, results) => {
    if (err) throw err;
    res.render('game', {question: results});
  });
});


router.get('/api/questions', function(req, res) {
  var sql = `
  SELECT
    q.text AS question,
    c.lat,
    c.lng,
    c.name AS Answer
  FROM question q
  JOIN city c ON q.answer = c.id
  ORDER BY RAND()
  LIMIT 5`;
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ questions: results });
  });
});

router.get('/', function(req, res, next) {
  res.render('home');
});


module.exports = router;
