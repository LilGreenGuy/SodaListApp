const express = require('express');
const router = express.Router();
const User = require('../models/user');
const catchAsync = require('../utilities/catchAsync');
const passport = require('passport');
const { storeReturnTo } = require('../middleware');

router.get('/register', (req, res) => {
    res.render('auth/register');
})

router.post('/register', catchAsync(async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username })
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Buffalo Rock!');
            const redirectUrl = res.locals.returnTo || '/';
            res.redirect(redirectUrl);
        });
    } catch (e) {
        req.flash('error', e.message);
        return res.redirect('register');
    }
}));

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), catchAsync(async (req, res) => {
    req.flash('success', `Welcome back, ${req.user.username}!`);
    const redirectUrl = res.locals.returnTo || '/';
    res.redirect(redirectUrl);
}));

router.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/login');
    });
});

module.exports = router;