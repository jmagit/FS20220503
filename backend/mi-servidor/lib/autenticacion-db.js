const { Sequelize } = require('sequelize');
const initModels = require('../models/autenticacion/init-models');
const sequelize = new Sequelize('mysql://root:root@localhost:3306/Autenticacion')

exports.sequelize = sequelize
exports.dbContext = initModels(sequelize)