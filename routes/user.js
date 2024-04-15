const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const User = require('../models/user');
const {isLoggedIn, storeReturnTo} = require('../middleware');

router.get('/register', (req, res) => {
    res.render('users/register')
})

router.post('/register', catchAsync(async (req, res, next) => {
    try{
        const { username, email, password } = req.body;
        const user = new User({ username, email });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Bem vindo a Knowledge-Knot');
            res.redirect('/posts');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
}));

router.get('/login', (req, res) => {
    res.render('users/login');
})

router.post('/login', storeReturnTo, passport.authenticate('local', { failureFlash: true, 
    failureRedirect: '/login'}), (req, res) => {
    req.flash('success', 'Bem vindo a Knowledge-Knot');
    const redirectUrl = res.locals.returnTo || '/posts';
    res.redirect(redirectUrl);
})

router.get('/logout', isLoggedIn, (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        } else {
            req.flash('sucess', 'Adeus!');
            res.redirect('/posts');
        }
    });
})

module.exports = router;

