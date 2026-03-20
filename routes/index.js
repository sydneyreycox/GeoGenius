var express = require('express');
var router = express.Router();

const questions = [
  { question: "What city has the White House?", lat: 38.89425, lng: -77.03965, Answer: "Washington D.C."},
  { question: "Do you remember the Alamo?", lat: 29.424309, lng:-98.494679, Answer: "San Antonio"},
  { question: "What city has Christ the Redeemer?", lat: -22.951916, lng: -43.210487, Answer: "Rio de Janeiro"},
  { question: "What province is known for its bold, spicy, and numbing cuisine?", lat: 30.6509 , lng: 104.0757, Answer: "Sichuan"},
  { question: "What city has the Eiffel Tower?", lat: 48.8584, lng: 2.2945, Answer: "Paris"},
  { question: "What city has the Great Pyramid?", lat: 29.9792, lng: 31.1342, Answer: "Cairo"},
];

let currentQuestionIdx = 0;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { questions: questions });
});

/* GET questions for game */
router.get('/api/questions', function(req, res) {
  res.json({ questions: questions });
});

module.exports = router;
