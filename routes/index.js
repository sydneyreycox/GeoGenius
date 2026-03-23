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

/* const questions = [
  { question: "What city has the White House?", lat: 38.89425, lng: -77.03965, Answer: "Washington D.C."},
  { question: "Do you remember the Alamo?", lat: 29.424309, lng:-98.494679, Answer: "San Antonio"},
  { question: "What city has Christ the Redeemer?", lat: -22.951916, lng: -43.210487, Answer: "Rio de Janeiro"},
  { question: "What province is known for its bold, spicy, and numbing cuisine?", lat: 30.6509 , lng: 104.0757, Answer: "Sichuan"},
  { question: "What city has the Eiffel Tower?", lat: 48.8584, lng: 2.2945, Answer: "Paris"},
  { question: "What city has the Great Pyramid?", lat: 29.9792, lng: 31.1342, Answer: "Cairo"},
]; */

let currentQuestionIdx = 0;

router.get('/', function(req, res, next) {
  db.query('SELECT * FROM question', (err, results) => {
    if (err) throw err;
    res.render('index', {question: results});
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

module.exports = router;
