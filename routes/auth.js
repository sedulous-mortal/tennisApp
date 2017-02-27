const express = require('express');
const router = express.Router();
const authHelpers = require('../auth/auth-helpers');
const passport = require('../auth/local');
//gets the register page
router.get('/register', authHelpers.loginRedirect, (req, res) => {
        res.render('auth/register');
    })
    //allows user to register if they are new
router.post('/register', (req, res, next) => {
    return authHelpers.createUser(req, res).then((response) => {
            console.log('registration successful');
        })
        //if something goes wrong, tells end user
        .catch((err) => {
            res.status(500).json({
                status: 'error'
            });
        });
});
//gets the login page
router.get('/login', authHelpers.loginRedirect, (req, res) => {
    res.render('auth/login');
});
//allows a user to login only if they are really in the database
//otherwise asks them to login again
router.post('/login', passport.authenticate('local', {
    successRedirect: '/user',
    failureRedirect: '/',
    failureFlash: true
}));
//gets the logout page and redirects to homepage
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});
module.exports = router;