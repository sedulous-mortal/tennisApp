'use strict';
module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        username: DataTypes.STRING(32),
        password: DataTypes.TEXT,
        email: DataTypes.STRING(128),
        firstName: DataTypes.STRING,
        plants: DataTypes.STRING(128)
    }, {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            }
        }
    });
    return User;
};