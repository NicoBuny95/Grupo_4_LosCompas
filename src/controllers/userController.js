const bcrypt = require('bcryptjs');
const fs = require('fs');
const users = JSON.parse(fs.readFileSync("data/users.json"));

let userController = {
    loginView: (req, res) => {
        res.render('login', { title: 'Login', css: '/css/login.css' , user: req.session.user });
    },
    loging: (req, res) => {
        let infoLog = req.body;

        res.redirect('/');
    },

    login:(req, res) => {
        const { email, password } = req.body;
        const user = users.find(user => user.email === email);
    
        if (user && bcrypt.compareSync(password, user.password)) {
            req.session.user = user; // Guardar el usuario en la sesión
            console.log(user)

            let usuarioLogueado = req.session.user;

            if (req.body.remember != undefined) {//verifico el checkbox "rember" y creo cookie del user
                res.cookie("remember", usuarioLogueado, {maxAge: 180000})
            };
    
            res.redirect('/'); // Redirigir a la página de perfil
            
        } else {
            res.render('login',{ title: 'Login', css: '/css/login.css' , user: req.session.user }); 
        }
    },

    registerView: (req, res) => {
        res.render('register', { title: 'Registrarme', css: '/css/registrar.css' , user: req.session.user });
    },

    saveUser: (req, res) => {
        try {
            // Leer el archivo JSON de usuarios actual
            const users = JSON.parse(fs.readFileSync('data/users.json'));
            
            const { username, firstName, lastName, email, password } = req.body;

            // Encriptar la contraseña antes de almacenarla
            const hashedPassword = bcrypt.hashSync(password, 10);

            // Crear un objeto de usuario con los datos proporcionados
            const user = {
                id: users.length + 1,
                username,
                firstName,
                lastName,
                email,
                password: hashedPassword,
                profileImage:req.file
            };

            // Agregar el nuevo usuario al array de usuarios
            users.push(user);

            // Guardar el array actualizado en el archivo JSON de usuarios
            fs.writeFileSync('data/users.json', JSON.stringify(users, null, 2));

          res.render('register', { title: 'Registrarme', css: '/css/registrar.css' , user: req.session.user});

        } catch (err) {
            res.status(500).json({ error: "No se pudo crear el usuario" });
          }
    } ,
    
    logout: (req, res) => {
        // Eliminar el usuario de la sesión
        req.session.destroy();
        // Redirigir al usuario a la página de inicio u otra página después de cerrar sesión
        res.redirect('/');
    }
};


module.exports = userController;
