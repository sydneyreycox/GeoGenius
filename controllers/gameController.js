const mysql = require('mysql2');
const db = require('../config/db');
require('dotenv').config();

exports.getHomePage = (req, res) => {
  db.query('SELECT username, score FROM `user` ORDER BY score DESC', (err, results) => {
    if (err) {
      console.error(err);
      return res.render('home', { user: req.session.user || null, players: [] });
    }
    res.render('home', { user: req.session.user || null, players: results });
  });
};

exports.getGame = (req, res) => {
  db.query('SELECT * FROM question', (err, results) => {
    if (err) throw err;
    res.render('game', {
      question: results,
      user: req.session.user || null
    });
  });
};

exports.getCityPage = (req, res) => {
  const cityId = req.params.id;
  const citySql = 'SELECT * FROM city WHERE id = ?';
  const questionsSql = 'SELECT * FROM question WHERE answer = ?';

  db.query(citySql, [cityId], (err, cityResults) => {
    if (err) return res.status(500).send('Database error');
    if (cityResults.length === 0) return res.status(404).send('City not found');

    db.query(questionsSql, [cityId], (err, questionResults) => {
      if (err) return res.status(500).send('Database error');
      res.render('city', {
        city: cityResults[0],
        questions: questionResults,
        user: req.session.user || null
      });
    });
  });
};

exports.getCitiesApi = (req, res) => {
  db.query('SELECT id, name, lat, lng FROM city', (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ cities: results });
  });
};

exports.getQuestionsApi = (req, res) => {
  const sql = `
    SELECT q.text AS question, c.lat, c.lng, c.name AS Answer
    FROM question q
    JOIN city c ON q.answer = c.id
    ORDER BY RAND()
    LIMIT 5`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ questions: results });
  });
};

exports.saveScoreApi = (req, res) => {
  if (!req.session.user) return res.status(401).send('Login Required!');
  const { score: newScore } = req.body;
  const userId = req.session.user.id;

  db.query('UPDATE user SET score = score + ? WHERE id = ?', [newScore, userId], (err) => {
    if (err) return res.status(500).send('Error Saving Score!');
    res.json({ message: 'Score Saved' });
  });
};