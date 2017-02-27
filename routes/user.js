const express = require('express');
const router = express.Router();
const authHelpers = require('../auth/auth-helpers');
/* GET user profile page. */
router.get('/', authHelpers.loginRequired, (req, res, next) => {
    res.render('index', {
        user: req.user.dataValues
    });
});
module.exports = router;