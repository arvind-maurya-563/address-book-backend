const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const OtpModel = sequelize.define('OtpTable', {
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    otp: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = OtpModel;
