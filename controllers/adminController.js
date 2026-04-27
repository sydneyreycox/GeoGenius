const db = require('../config/db');
require('dotenv').config();

exports.getAdminPage = (req, res) => {
    db.query("SELECT id, username, score, is_admin FROM user ORDER BY username ASC", (err, users) => {
        if (err) return res.status(500).send(err);

        db.query("SELECT * FROM city ORDER BY name ASC", (err, cities) => {
            if (err) return res.status(500).send(err);

            const q3 = `
                SELECT question.*, city.name AS city_name 
                FROM question 
                JOIN city ON question.answer = city.id 
                ORDER BY city.name ASC
            `;

            db.query(q3, (err, questions) => {
                if (err) return res.status(500).send(err);

                res.render('admin', {
                    users: users,
                    cities: cities,
                    questions: questions,
                    user: req.session.user
                });
            });
        });
    });
};

exports.deleteUser = (req, res) => {
    db.query('DELETE FROM user WHERE id = ?', [req.params.id], (err) => {
        if (err) console.error(err);
        res.redirect('/admin');
    });
};

exports.addCity = (req, res) => {
    const { name, lat, lng } = req.body;
    db.query('INSERT INTO city (name, lat, lng) VALUES (?, ?, ?)', [name, lat, lng], (err) => {
        if (err) console.error(err);
        res.redirect('/admin');
    });
};

exports.addQuestion = (req, res) => {
    const { text, answer } = req.body;
    db.query('INSERT INTO question (text, answer) VALUES (?, ?)', [text, answer], (err) => {
        if (err) console.error(err);
        res.redirect('/admin');
    });
};

exports.deleteQuestion = (req, res) => {
    db.query('DELETE FROM question WHERE id = ?', [req.params.id], (err) => {
        if (err) console.error(err);
        res.redirect('/admin');
    });
};

exports.deleteCity = (req, res) => {
    const cityId = req.params.id;

    db.query('SELECT COUNT(*) AS count FROM question WHERE answer = ?', [cityId], (err, results) => {
        if (err) return res.status(500).send("Database Error");

        if (results[0].count > 0) {
            return res.status(400).send(`
                <h1>Action Denied</h1>
                <p>This city is linked to ${results[0].count} questions. 
                Please delete those questions first before removing the city.</p>
                <a href="/admin">Go Back</a>
            `);
        }

        //no deletion when questions exist
        db.query('DELETE FROM city WHERE id = ?', [cityId], (err) => {
            if (err) return res.status(500).send("Error deleting city");
            res.redirect('/admin');
        });
    });
};
