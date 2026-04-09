var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var mysql = require('mysql2');

var db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req,res) {
  var { username, password } = req.body;
  var saltRounds = 10;

  bcrypt.hash(password, saltRounds, function(err, hashedPassword) {
    if (err) return res.status(500).send('Hashing Error');

    var sql = 'INSERT INTO user (username, password) VALUES (?, ?)';

    db.query(sql, [username, hashedPassword], (err, result) => {
      if (err){
        console.error(err);
        return res.status(500).send('Registration Failed!');
      }
      res.redirect('/users/login');
    });
  });
});

router.get('/register', function(req, res) {
  if (req.session.user) {
    return res.redirect('/login');
  }
  res.render('register');
});

router.get('/login', function(req, res) {
  if (req.session.user) {
    return res.redirect('/');
  }
  res.render('login');
});

router.post('/login', function(req, res) {
  var { username, password } = req.body;
  var sql = 'SELECT * FROM user WHERE username = ?';
  db.query(sql, [username], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Login Failed!');
    }
    if (rows.length > 0) {
      var user = rows[0];
      bcrypt.compare(password, user.password, function(err, match) {
        if (err) return res.status(500).send('Comparison Error');

        if (match) {
          req.session.user = {
            id: user.id,
            username: user.username
          };
          res.redirect('/');
        } else {
          res.status(401).send('Invalid Password');
        }
      });
    } else {
      res.status(404).send('User not found!');
    }
  });
});

router.get('/logout', (req,res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
