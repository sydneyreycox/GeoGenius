const mysql = require('mysql2');
const db = require('../config/db');
require('dotenv').config();

exports.getHomePage = (req, res) => {
  db.query(
    'SELECT u.username, s.score FROM `user` u JOIN score s ON u.id = s.userId WHERE s.tagId = 1 ORDER BY s.score DESC LIMIT 10',
    (err, players) => {
      if (err) {
        console.error(err);
        return res.render('home', { user: req.session.user || null, players: [], tags: [] });
      }
      db.query('SELECT * FROM tag', (err, tags) => {
        if (err) return res.render('home', { user: req.session.user || null, players, tags: [] });
        res.render('home', { user: req.session.user || null, players, tags });
      });
    }
  );
};

exports.getLeaderboardApi = (req, res) => {
  const tagId = req.query.tag;
  const sql = 'SELECT u.username, s.score FROM score s JOIN `user` u ON s.userId = u.id WHERE s.tagId = ? ORDER BY s.score DESC LIMIT 10'
  db.query(sql, tagId, (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ players: results });
  });
};

exports.getGame = (req, res) => {
  const tagId = req.params.id;
  res.render('game', {
    user: req.session.user || null,
    tagId: tagId
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
  const tagId = req.query.tag;
  const sql = `
    SELECT q.text AS question, c.lat, c.lng, c.name AS Answer
    FROM question q
    JOIN city c ON q.answer = c.id
    JOIN cityTag ct ON c.id = ct.cityId
    WHERE ct.tagId = ?
    ORDER BY RAND()
    LIMIT 5`;
  db.query(sql, [tagId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ questions: results });
  });
};

//Why can't we just use promise/await man...
exports.saveScoreApi = (req, res) => {
 
  if (!req.session.user) return res.status(401).send('Login Required!');
  const { score: newScore, tag: tagId } = req.body;
  const userId = req.session.user.id;

  db.query(
    'UPDATE score SET score = ? WHERE userId = ? AND tagId = ? AND ? > score',
    [newScore, userId, tagId, newScore],
    (err, result) => {
      if (err) return res.status(500).send('Error Saving Score!');

      if (result.affectedRows === 1) return res.json({ message: 'Score Saved' });

      db.query(
        'SELECT id FROM score WHERE userId = ? AND tagId = ?',
        [userId, tagId],
        (err, existing) => {
          if (err) return res.status(500).send('Error Saving Score!');

          if (existing.length > 0) return res.json({ message: 'Score not higher, not saved' });

          db.query(
            'INSERT INTO score (userId, tagId, score) VALUES (?, ?, ?)',
            [userId, tagId, newScore],
            (err) => {
              if (err) return res.status(500).send('Error Saving Score!');
              res.json({ message: 'Score Saved' });
            }
          );
        }
      );
    }
  );
};