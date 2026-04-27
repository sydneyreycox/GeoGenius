var express = require('express');
var router = express.Router();
const gameController = require('../controllers/gameController');

// Page Routes
router.get('/', gameController.getHomePage);
router.get('/game', gameController.getGame);
router.get('/city/:id', gameController.getCityPage);

// API Routes
router.get('/api/cities', gameController.getCitiesApi);
router.get('/api/questions', gameController.getQuestionsApi);
router.post('/api/save-score', gameController.saveScoreApi);

module.exports = router;