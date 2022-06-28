exports.onlyAuthenticated = (req, res, next) => {
    if(req.method === 'OPTIONS') {
        res.sendStatus(200)
        return
    }
    if (!res.locals.isAuthenticated) {
        res.status(401).end()
        return
    }
    next()
}
exports.onlyInRole = (roles) => (req, res, next) => {
    if(req.method === 'OPTIONS') {
        res.sendStatus(200)
        return
    }    
    if (!res.locals.isAuthenticated) {
        res.status(401).end()
        return
    }

    if (roles.split(',').some(role => res.locals.isInRole(role))) {
        next()
    } else {
        res.status(403).end()
    }
}
