const express = require('express');
const router = express.Router();
const passport = require('passport');
const {isLoggedIn, storeReturnTo} = require('../middleware');
const users = require('../controllers/user');

router.get('/register', users.renderRegisterForm);

router.post('/register', users.registerNewUser);

router.get('/login', users.renderLoginForm);

router.post('/login', storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login'}),
             users.loginUser);

router.get('/logout', isLoggedIn, users.logoutUser)

module.exports = router;

