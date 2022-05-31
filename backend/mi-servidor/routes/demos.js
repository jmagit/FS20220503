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
router.route('/formulario')
    .get(function (req, res) {
        res.send(`
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
            <input type="text" name="user" size="8" placeholder="Usuario">
            <input type="password" name="password" size="8" placeholder="Contraseña">
            <input type="submit" value="Login">
            <input type="submit" value="Registrarse">
        </form>       
    </body>
    </html>
    `)
    })
    .post(function (req, res) {
        res.send('Add a book')
    })


module.exports = router;
