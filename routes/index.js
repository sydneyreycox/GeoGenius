var express = require('express');
var router = express.Router();
var gameController = require('../controllers/gameController');
var adminController = require('../controllers/adminController');

var isAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.is_admin) {
        return next();
    }
    res.status(403).send('Unauthorized: You do not have permission to view this page.');
};

// Page Routes
router.get('/', gameController.getHomePage);
router.get('/game', gameController.getGame);
router.get('/city/:id', gameController.getCityPage);

// API Routes
router.get('/api/cities', gameController.getCitiesApi);
router.get('/api/questions', gameController.getQuestionsApi);
router.post('/api/save-score', gameController.saveScoreApi);

// Admin Routes
router.get('/admin', isAdmin, adminController.getAdminPage);
router.get('/admin/user/delete/:id', isAdmin, adminController.deleteUser);
router.post('/admin/city/add', isAdmin, adminController.addCity);
router.post('/admin/question/add', isAdmin, adminController.addQuestion);
router.get('/admin/question/delete/:id', isAdmin, adminController.deleteQuestion);
router.get('/admin/city/delete/:id', isAdmin, adminController.deleteCity);


module.exports = router;