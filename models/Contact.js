const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Contact = sequelize.define('Contact', {
  fullName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dob: {
    type: DataTypes.DATE,
    allowNull: false
  },
  contactNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  website: {
    type: DataTypes.STRING,
    allowNull: true
  },
  groupname: {
    type: DataTypes.STRING,
    allowNull: true
  },
  createdBy : {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Contact;
