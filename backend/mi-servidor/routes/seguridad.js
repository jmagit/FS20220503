const express = require('express');
const router = express.Router();
var cookie = require('cookie');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const fs = require('fs/promises')
const { formatError } = require('../lib/data')
const { sequelize, dbContext } = require('../lib/autenticacion-db')

const DIR_API_AUTH = '/api/' // DIR_API_REST
const APP_SECRET = 'Es segura al 99%'
const AUTHENTICATION_SCHEME = 'Bearer '

const PROP_USERNAME = 'idUsuario'
const PROP_PASSWORD = 'password'
const PROP_NAME = 'nombre'
const PASSWORD_PATTERN = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/
const SALT_ROUNDS = 10;

const USR_FILENAME = 'data/usuarios.json'

const VALIDATE_XSRF_TOKEN = false;

// parse header/cookies
router.use(cookieParser())
function generateXsrfTokenCookie(res) {
    if (VALIDATE_XSRF_TOKEN) {
        res.cookie('XSRF-TOKEN', '123456790ABCDEF', { httpOnly: false })
    }
}

// Cross-origin resource sharing (CORS)
router.use(function (req, res, next) {
    var origen = req.header("Origin")
    if (!origen) origen = '*'
    res.header('Access-Control-Allow-Origin', origen)
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization, X-Requested-With, X-XSRF-TOKEN')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    res.header('Access-Control-Allow-Credentials', 'true')
    generateXsrfTokenCookie(res)
    next()
})
// Autenticación
router.use(function (req, res, next) {
    res.locals.isAuthenticated = false;
    let token = ''
    if (!req.headers['authorization']) {
        if (!req.cookies['Authorization']) {
            next();
            return;
        }
        token = req.cookies['Authorization'];
    } else
        token = req.headers['authorization'].substring(AUTHENTICATION_SCHEME.length)
    try {
        var decoded = jwt.verify(token, APP_SECRET);
        res.locals.isAuthenticated = true;
        res.locals.usr = decoded.usr;
        res.locals.name = decoded.name;
        res.locals.roles = decoded.roles;
        res.locals.isInRole = role => res.locals.roles.includes(role)
        next();
    } catch (err) {
        res.status(401).json(err);
    }
})

// Cookie-to-Header Token
if (VALIDATE_XSRF_TOKEN) {
    router.use(function (req, res, next) {
        if ('POST|PUT|DELETE|PATCH'.indexOf(req.method.toUpperCase()) >= 0 &&
            !req.path.includes("/login") &&
            (!req.cookies['XSRF-TOKEN'] || !req.headers['x-xsrf-token'] || req.cookies['XSRF-TOKEN'] !== req.headers['x-xsrf-token'])) {
            res.status(401).json(formatError('No autorizado.', 401))
            return
        }
        generateXsrfTokenCookie(res)
        next()
    })
}

// Control de acceso
async function encriptaPassword(password) {
    const salt = await bcrypt.genSalt(SALT_ROUNDS)
    const hash = await bcrypt.hash(password, salt)
    console.log(hash)
    return hash
}

router.options(DIR_API_AUTH + 'login', function (req, res) {
    res.status(200).end()
})
router.post(DIR_API_AUTH + 'login', async function (req, res) {
    var payload = {
        success: false
    }
    if (req.body && req.body.name && req.body.password) {
        let usr = req.body.name
        let pwd = req.body.password
        if (!PASSWORD_PATTERN.test(pwd)) {
            setTimeout(() => res.status(200).json(payload).end(), 1000)
            return
        }
        // const data = await fs.readFile(USR_FILENAME, 'utf8')
        // var lst = JSON.parse(data)
        // var ele = lst.find(ele => ele[PROP_USERNAME] == usr)
        const ele = await dbContext.Usuarios.findByPk(usr)
        if (ele && await bcrypt.compare(pwd, ele[PROP_PASSWORD])) {
            let token = jwt.sign({
                usr: ele[PROP_USERNAME],
                name: ele.nombre,
                // roles: ele.roles
                roles: ele.roles.split(',')
            }, APP_SECRET, { expiresIn: '1h' })
            payload = {
                success: true,
                token: AUTHENTICATION_SCHEME + token,
                name: ele[PROP_NAME],
                //                roles: ele.roles
                roles: ele.roles.split(',')
            }
            if (req.query.cookie && req.query.cookie.toLowerCase() === "true")
                res.cookie('Authorization', token, { maxAge: 3600000 })
        }
        res.status(200).json(payload).end()
    } else {
        res.status(200).json(payload).end()
    }
})
router.get(DIR_API_AUTH + 'logout', function (req, res) {
    res.clearCookie('Authorization');
    res.status(200).end()
})

router.route(DIR_API_AUTH + 'register')
    .post(async function (req, res) { // Auto registro de usuarios
        try {
            let row = await dbContext.Usuarios.build({ idUsuario: req.body.username, password: req.body.password, nombre: req.body.nombre })
            let pwd = req.body.password
            row.password = 'valida'
            await row.validate()
            if (!PASSWORD_PATTERN.test(pwd)) {
                throw new Error('Invalid format password')
            }
            row.password = await encriptaPassword(pwd)
            row.roles = 'Usuarios'
            await row.save()
            await dbContext.RolesPorUsuario.create({idUsuario: row.idUsuario, idRol: 'Usuarios'})
            res.sendStatus(201)
        } catch (error) {
            res.status(400).send(formatError(error))
        }
    })
    .get(async function (req, res) { // Consulta de sus datos de usuario
        if (!res.locals.isAuthenticated) {
            res.status(401).end()
            return
        }
        try {
            const row = await dbContext.Usuarios.findByPk(res.locals.usr)
            if (row) {
                res.status(200).json({ username: row.idUsuario, nombre: row.nombre }).end()
            } else {
                res.status(401).end()
            }
        } catch (error) {
            res.status(500).json(formatError(error))
        }
    })
    .put(async function (req, res) {  // Mantenimiento de sus datos de usuario
        if (!res.locals.isAuthenticated) {
            res.status(401).end()
            return
        }
        try {
            const row = await dbContext.Usuarios.findByPk(res.locals.usr)
            if (row) {
                try {
                    row.set({ idUsuario: req.body.username, nombre: req.body.nombre })
                    await row.save()
                    res.sendStatus(204)
                } catch (error) {
                    res.status(400).send(formatError(error))
                }
            } else {
                res.status(401).end()
            }
        } catch (error) {
            res.status(500).json(formatError(error))
        }
    })

router.put(DIR_API_AUTH + 'change-password', async function (req, res) {  // Cambio de su propia contraseña
    if (!res.locals.isAuthenticated) {
        res.status(401).end()
        return
    }
    var payload = {
        success: false
    }
    try {
        if (!req.body || !req.body.oldpassword || !req.body.newpassword) {
            throw new Error('Invalid data')
        }
        let old = req.body.oldpassword
        let pwd = req.body.newpassword
        if (!PASSWORD_PATTERN.test(old) || !PASSWORD_PATTERN.test(pwd)) {
            throw new Error('Invalid format password')
        }
        const ele = await dbContext.Usuarios.findByPk(res.locals.usr)
        if (ele && await bcrypt.compare(old, ele[PROP_PASSWORD])) {
            ele.password = await encriptaPassword(pwd)
            await ele.save()
            payload.success = true
            res.status(200).json(payload).end()
        } else {
            res.status(403).json(payload).end()
        }
    } catch (error) {
        res.status(400).send(formatError(error))
    }
})

router.all(DIR_API_AUTH + 'auth', function (req, res) {
    res.status(200).json({ isAuthenticated: res.locals.isAuthenticated, usr: res.locals.usr, name: res.locals.name, roles: res.locals.roles })
})

module.exports = router; 
