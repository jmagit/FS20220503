const { json } = require('express');
var express = require('express');
var router = express.Router();

router.all('/', function (req, res, next) {
    res.send('Es una demo').end()
});
router.all('/kkk', function (req, res, next) {
    res.send('Esto es una kkk').end()
});
router.all('/kk*/:ip-:port', function (req, res, next) {
    res.send('Esto es una ' + req.params.ip + ':' +  req.params.port).end()
});
router.all('/kk*/:ip', function (req, res, next) {
    res.send('Esto es una ' + req.params.ip + ':' +  req.params.port).end()
});
router.all('/kk**', function (req, res, next) {
    res.send('Esto es una kk').end()
});

function generaFormulario(elemento) {
    return elemento.intentos < 0 ?
    'no tienes intentos'
    :
     `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <form class="cabecera-principal__login" method="post">
            <input type="hidden" name="intentos" value="${elemento.intentos}">
            <input type="text" name="user" size="8" placeholder="Usuario" value="${elemento.user}">
            <input type="password" name="password" size="8" placeholder="Contraseña" value="${elemento.password}">
            <input type="submit" value="Login">
            <input type="submit" value="Registrarse">
        </form>       
    </body>
    </html>
    `
}
router.route('/formulario')
    .get(function (req, res) {
        res.send(generaFormulario({ "user": "", "password": "P@$$w0rd", intentos: 3 }))
    })
    .post(function (req, res) {
        // { "user": "admin", "password": "P@$$w0rd"}
        if(req.body.user === "admin" && req.body.password === "P@$$w0rd") {
            // res.render('index', { title: 'Express' });
            // res.redirect('/')
            res.redirect(req.query.continue)
        } else 
            res.send(generaFormulario({ "user": req.body.user, "password": req.body.password, intentos: req.body.intentos-1}))
    })
//    http://localhost:4200/demos/cotilla/1?page=10&rows=10
router.get('/cotilla/:id', (req, res) => {
    if(req.query.login) {
        res.redirect('/demos/formulario?continue=http://localhost:4200/demos/cotilla/1?page=10&rows=10')
    }
    // if(!req.is(json)) {
    //     res.sendStatus(406)
    //     return
    // }
    if(!req.query.page) {
        res.sendStatus(404)
        return
    }
    res.status(req.query.page ? 200 : 400).send(`
        id: ${req.params.id}\n
        page: ${req.query.page || 'no viene' }\n
        rows: ${req.query.rows || 'no viene' }\n
        sort: ${req.query.sort || 'no viene' }\n
        idioma: ${req.get('Accept-Language') || 'no se'}
        viene de: ${req.get('referer') || 'no se'}
        body: ${req.body.user}-${req.body.password}
        body: ${req.body}
    `)
})
router.get('/eco', (req, res) => {
    //res.json(req.headers)
    res.format({
        'application/json': () => res.send(JSON.stringify(req.headers)),
        'text/plain': () => {
            let result = ''
            for(let h in req.headers) { result += `${h}: ${req.headers[h]}\n`}
            res.type('text').send(result)
        },
        'text/xml': () => {
            let result = '<headers>'
            for(let h in req.headers) { result += `\t<${h}>${req.headers[h]}</${h}>\n`}
            res.type('xml').send(result +'</headers>')
        },
        'default': () => res.sendStatus(406)
    })
    //res.type('json').send(JSON.stringify(req.headers))
})
module.exports = router;
