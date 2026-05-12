const bcrypt = require('bcrypt');
const db = require('../config/db');

exports.getRegister = (req, res) => {
  if (req.session.user) return res.redirect('/');
  res.render('register');
};

exports.postRegister = (req, res) => {
  const { username, password, passwordCheck } = req.body;
  const saltRounds = 10;

  if (password != passwordCheck) return res.render('register', { username, error: 'Passwords did not match' });

  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) return res.render('register', { username, error: 'Something went wrong, please try again' });

    const sql = 'INSERT INTO user (username, password) VALUES (?, ?)';
    db.query(sql, [username, hashedPassword], (err) => {
      if (err && err.code === 'ER_DUP_ENTRY') return res.render('register', { username, error: 'Username already in use' });
      if (err) return res.render('register', { username, error: 'Registration failed, please try again' });
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
    if (err) return res.render('login', { username, error: 'Something went wrong, please try again' });
    if (rows.length === 0) return res.render('login', { username, error: 'Invalid username or password' });

    const user = rows[0];
    bcrypt.compare(password, user.password, (err, match) => {
      if (err) return res.render('login', { username, error: 'Something went wrong, please try again' });
      if (!match) return res.render('login', { username, error: 'Invalid username or password' });

      req.session.user = {
        id: user.id,
        username: user.username,
        is_admin: user.is_admin
      };

      res.redirect('/');
    });
  });
};

exports.getProfile = (req, res) => {
  if (!req.session.user) return res.redirect('/users/login');
  const userId = req.session.user.id;
  db.query('SELECT username, score FROM user WHERE id = ?', [userId], (err, rows) => {
    if (err || rows.length === 0) return res.redirect('/');
    const { username, score } = rows[0];
    res.render('profile', { username, score });
  });
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};
