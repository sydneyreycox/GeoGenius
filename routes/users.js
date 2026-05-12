const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/register', userController.getRegister);
router.post('/register', userController.postRegister); // Map this to your register form action

router.get('/login', userController.getLogin);
router.post('/login', userController.postLogin);

router.get('/profile', userController.getProfile);
router.get('/logout', userController.logout);

module.exports = router;