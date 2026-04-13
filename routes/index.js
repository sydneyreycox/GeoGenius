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

    res.render('game', {
      question: results,
      user: req.session.user || null
    });
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

router.post('/api/save-score', function(req,res) {
  if (!req.session.user) {
    return res.status(401).send('Login REquired!');
  }
  var newScore = req.body.score;
  var userId = req.session.user.id;

  var sql = 'UPDATE user SET score = score + ? WHERE id = ?';
  db.query(sql, [newScore, userId], (err, result) => {
    if (err) {
      return res.status(500).send('Error Saving Score!');
    }
    res.json({ message: 'Score Saved' });
  });
});

router.get('/', function(req, res, next) {
  const players = [
        { name: "Alice", score: 1200 },
        { name: "Bob", score: 900 },
        { name: "Charlie", score: 1100 }
    ];
    // Sort players by score descending
    players.sort((a, b) => b.score - a.score);
  //this is to make it user optional! Guests allowed now
  res.render('home', { user: req.session.user || null, players });
});

module.exports = router;
