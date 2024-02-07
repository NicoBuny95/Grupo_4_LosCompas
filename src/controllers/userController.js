const { validationResult } = require('express-validator');
const fs = require("fs");
const bcrypt = require("bcryptjs");


let userController = {
    login: (req, res) => {
        res.render('login', {title: 'Login', css:'/css/login.css'});
    },
    loging: (req, res) => {
        const errors = validationResult(req);
        
        
        if (errors.isEmpty()){                        
            let users;
            if (userJSON == ""){
                users = [];                
            } else {
                users = JSON.parse(userJSON);
            }

            let usuarioALoguearse; // Declarar la variable fuera del bucle para que esté disponible fuera del bucle

            for (let i = 0; i < users.length; i++ ){
                if (users[i].email == req.body.email) { // Corregir users[i].email en lugar de user[i].email
                    if (bcrypt.compareSync(req.body.password, users[i].password)) { // Corregir users[i].password en lugar de user[i].password y remover ; después del if
                        usuarioALoguearse = users[i];
                        break;
                    }
                }
            }
            
            if(usuarioALoguearse === undefined){
                return res.render("login", {errors:[{msg: "Credenciales Invalidas"}]});
            }

            req.session.usuarioALoguearse = usuarioALoguearse;

        } else {
            return res.render("login", {errors: errors.errors});
        }
        if (req.body.remember != undefined){
            res.coockie("remember", usuarioALoguearse.email, { maxAge: 1800000})

        };
    },
    register: (req, res) => {
        res.render('register', {title: 'Registrarme', css:'/css/registrar.css'});
    }

}

module.exports = userController;
