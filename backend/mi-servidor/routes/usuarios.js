const express = require('express');
const { Sequelize, DataTypes, Op, QueryTypes } = require('sequelize');
const { formatError, formatLocation } = require('../lib/data')
const { sequelize, dbContext } = require('../lib/autenticacion-db')
const security = require("../lib/security");

const router = express.Router();

if(process.env.NODE_ENV !== 'development')
    router.use(security.onlyInRole('Administradores'))

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
            options.attributes = ["idUsuario", "nombre"]
        }
        if (req.query.order) {
            options.order = req.query.order.split(',')
        }
        if (req.query.find) {
            options.where = { nombre: { [Op.startsWith]: req.query.find } }
        }
        try {
            let resultado = await dbContext.Usuarios.findAll(options)
            res.json(resultado)
        } catch (error) {
            res.status(400).json(formatError(error))
        }
    })
// .post(async function (req, res) { // add
//     let row = await dbContext.Usuarios.build({ nombre: req.body.nombre })
//     try {
//         await row.validate()
//         await row.save()
//         res.append('location', formatLocation(req, row.idUsuario))
//         res.sendStatus(201)
//     } catch (error) {
//         res.status(400).send(formatError(error))
//     }
// })

router.route('/:id')
    .get(async function (req, res) { // get one
        try {
            let row = await dbContext.Usuarios.findByPk(req.params.id, { include: 'RolesPorUsuarios' })
            if (row) {
                res.json({
                    idUsuario: row.idUsuario,
                    nombre: row.nombre,
                    roles: row.RolesPorUsuarios.map(item => item.idRol),
                })
                // res.json({
                //     idUsuario: row.idUsuario,
                //     nombre: row.nombre,
                //     roles: row.roles.split(','),
                // })
            } else
                res.sendStatus(404)
        } catch (error) {
            res.sendStatus(404)
        }
    })
    .put(async function (req, res) { // update
        if (req.body.idUsuario && req.body.idUsuario != req.params.id) {
            res.status(400).json({ message: 'Invalid identifier' })
            return
        }
        let row = await dbContext.Usuarios.findByPk(req.params.id, { include: 'RolesPorUsuarios' })
        if (!row) {
            res.sendStatus(404)
            return
        }
        try {
            row.set({ nombre: req.body.nombre })
            if (req.body.roles) {
                row.roles = req.body.roles.join(',')
                await row.RolesPorUsuarios.filter(item => !req.body.roles.includes(item.idRol))
                    .forEach(async item => item.destroy())
                await req.body.roles.filter(item => !row.RolesPorUsuarios.find(rol => rol.idRol === item))
                    .forEach(async item => dbContext.RolesPorUsuario.create({ idUsuario: row.idUsuario, idRol: item }))
            }
            await row.save()
            res.sendStatus(204)
        } catch (error) {
            res.status(400).send(formatError(error))
        }
    })
    .delete(async function (req, res) { // remove
        let row = await dbContext.Usuarios.findByPk(req.params.id)
        if (!row) {
            res.sendStatus(404)
            return
        }
        try {
            await row.destroy()
            res.sendStatus(204)
        } catch (error) {
            res.status(409).json(formatError(error, 409))
        }
    })

module.exports = router;
