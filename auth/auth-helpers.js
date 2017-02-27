const bcrypt = require('bcryptjs');
const models = require('../db/models/index');

// function to compare the input password compared to db
function comparePass(userPassword, databasePassword) {
    return bcrypt.compareSync(userPassword, databasePassword);
}

// user redirected if already logged in
function loginRedirect(req, res, next) {
    if (req.user) return res.status(401).json({
        status: 'You are already logged in!'
    });
    return next();
}

// create user in db
function createUser(req, res) {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(req.body.password, salt);

    return models.User.create({
        username: req.body.username,
        password: hash,
        firstName: req.body.firstName,
        email: req.body.email
    }).then(() => {
        res.redirect('/');
    });
}

// protects route from non-logged in users
function loginRequired(req, res, next) {
    if (!req.user) return res.status(401).json({
        status: 'Please log in'
    });
    return next();
}

module.exports = {
    comparePass,
    loginRedirect,
    createUser,
    loginRequired
};