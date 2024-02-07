function rememberMiddleware (req, res, next) {
    next();

    if (req.coockies.remember != undefined && req.session.usuarioALoguearse == undefined){

    }
};

module.exports = rememberMiddleware;