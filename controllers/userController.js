const bcrypt = require('bcrypt');
const db = require('../config/db');

exports.getRegister = (req, res) => {
  if (req.session.user) return res.redirect('/');
  res.render('register');
};

exports.postRegister = (req, res) => {
  const { username, password } = req.body;
  const saltRounds = 10;

  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) return res.status(500).send('Hashing Error');

    const sql = 'INSERT INTO user (username, password) VALUES (?, ?)';
    db.query(sql, [username, hashedPassword], (err) => {
      if (err) return res.status(500).send('Registration Failed!');
      res.redirect('/users/login');
    });
  });
};

exports.getLogin = (req, res) => {
  if (req.session.user) return res.redirect('/');
  res.render('login');
};

exports.postLogin = (req, res) => {
  const { username, password } = req.body;
  db.query('SELECT * FROM user WHERE username = ?', [username], (err, rows) => {
    if (err) return res.status(500).send('Login Failed!');
    if (rows.length === 0) return res.status(404).send('User not found!');

    const user = rows[0];
    bcrypt.compare(password, user.password, (err, match) => {
      if (err) return res.status(500).send('Comparison Error');
      if (!match) return res.status(401).send('Invalid Password');

      req.session.user = {
        id: user.id, 
        username: user.username,
        is_admin: user.is_admin
      };
      
      res.redirect('/');
    });
  });
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};