const { Sequelize } = require('sequelize');
const initModels = require("../models/sakila/init-models");
const sequelize = new Sequelize('mysql://root:root@localhost:3306/sakila')

exports.sequelize = sequelize
exports.dbContext = initModels(sequelize)