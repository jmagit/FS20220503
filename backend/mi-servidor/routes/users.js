var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.route('/login.jpg')
    .get(function (req, res) {
        res.render('login', { user: "", password: "P@$$w0rd", intentos: 3 } )
    })
    .post(async function (req, res) {
        // { "user": "admin", "password": "P@$$w0rd"}
        if(req.body.user === "admin" && req.body.password === "P@$$w0rd") {
            if(req.query.continue)
            res.redirect(req.query.continue)
            else
            res.redirect('/')
        } else 
          res.render('login', {user: req.body.user, password: req.body.password, intentos: req.body.intentos-1} )
    })
module.exports = router;
