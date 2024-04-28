const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');

module.exports.renderRegisterForm = (req, res) => {
    res.render('users/register');
}

module.exports.registerNewUser = catchAsync(async (req, res, next) => {
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
})

module.exports.renderLoginForm = (req, res) => {
    res.render('users/login');
}

module.exports.loginUser = (req, res) => {
    req.flash('success', 'Bem vindo a Knowledge-Knot');
    const redirectUrl = res.locals.returnTo || '/posts';
    res.redirect(redirectUrl);
}

module.exports.logoutUser = (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        } else {
            req.flash('sucess', 'Adeus!');
            res.redirect('/posts');
        }
    });
}

