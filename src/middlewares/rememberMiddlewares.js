function rememberMiddleware (req, res, next) {
    
    if (req.coockies.remember != undefined && req.session.usuarioALoguearse == undefined){
        let userJSON = fs.readFileSync("data/users.json", { encoding: "utf-8"});                    
            let users;
            if (userJSON == ""){
                users = [];                
            } else {
                users = JSON.parse(userJSON);
            }

            let usuarioALoguearse; // Declarar la variable fuera del bucle para que esté disponible fuera del bucle

            for (let i = 0; i < users.length; i++ ){
                if (users[i].email == req.coockie.remember) { // Corregir users[i].email en lugar de user[i].email
                        usuarioALoguearse = users[i];
                        break;
                    }
                }
            }

            req.session.usuarioALoguearse = usuarioALoguearse;
            next();

    }


module.exports = rememberMiddleware;