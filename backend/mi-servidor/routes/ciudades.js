var express = require('express');
const { Sequelize, DataTypes, Op, QueryTypes } = require('sequelize');
const initModels = require("../models/init-models");
const sequelize = new Sequelize('mysql://root:root@localhost:3306/sakila')
const dbContext = initModels(sequelize);

var router = express.Router();

function formatError(error) {
    return { message: error.message }
}
function formatValidationError(error) {
    return {
        type: "https://tools.ietf.org/html/rfc7231#section-6.5.1",
        status: 400,
        title: 'One or more validation errors occurred.',
        errors: Object.assign({}, ...error.errors.map(item => ({ [item.path]: item.message })))
    }
}
router.route('/')
    .get(async function (req, res) { // get all
        const page = +req.query.page || 0;
        const limit = +req.query.rows || 10;
        let options = { offsset: page * limit, limit }
        if (req.query.page === 'all') {
            options = {}
        }
        if (req.query.proyection) {
            options.attributes = req.query.proyection.split(',')
        } else {
            options.attributes = ["city_id", "city"]
        }
        if (req.query.order) {
            options.order = req.query.order.split(',')
        }
        if (req.query.find) {
            options.where = { city: { [Op.startsWith]: req.query.find } }
        }
        try {
            let resultado = await dbContext.city.findAll(options)
            res.json(resultado)
        } catch (error) {
            res.status(400).json(formatError(error))
        }
    })
    .post(async function (req, res) { // add
        let row = await dbContext.city.build({ city: req.body.city, country_id: req.body.country_id })
        try {
            await row.validate()
            await row.save()
            res.append('location', req.url + '/' + row.city_id)
            res.sendStatus(201)
        } catch (error) {
            res.status(400).send(formatValidationError(error))
        }
    })

router.route('/:id')
    .get(async function (req, res) { // get one
        try {
            let row = await dbContext.city.findByPk(req.params.id)
            if (row)
                if (req.query.mode === 'details') {
                    const pais = await row.getCountry()
                    res.json({ city_id: row.city_id, city: row.city, country: pais.country })
                } else
                    res.json(row)
            else
                res.sendStatus(404)
        } catch {
            res.sendStatus(404)
        }
    })
    .put(async function (req, res) { // update
        if (req.body.city_id && req.body.city_id != req.params.id) {
            res.status(400).json({ message: 'Invalid identifier' })
            return
        }
        let row = await dbContext.city.findByPk(req.params.id)
        if (!row) {
            res.sendStatus(404)
            return
        }
        row.set({ city: req.body.city, country_id: req.body.country_id })
        try {
            await row.save()
            res.sendStatus(204)
        } catch (error) {
            res.status(400).send(formatValidationError(error))
        }
    })
    .delete(async function (req, res) { // remove
        let row = await dbContext.city.findByPk(req.params.id)
        if (!row) {
            res.sendStatus(404)
            return
        }
        try {
            await row.destroy()
        } catch (error) {
            res.status(409).json(formatError(error))
        }
    })

module.exports = router;
