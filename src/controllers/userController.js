const bcrypt = require('bcryptjs');
const fs = require('fs');
const db = require('../database/models');
const sequelize = db.Sequelize;
//const users = JSON.parse(fs.readFileSync("data/users.json"));

let userController = {
    loginView: (req, res) => {
        res.render('login', { title: 'Login', css: '/css/login.css' , user: req.session.user });
    },
    loging: (req, res) => {
        let infoLog = req.body;

        res.redirect('/');
    },

    login: async (req, res) => {
        try {
            const { email, password, remember } = req.body;
    
            // Buscar al usuario por su correo electrónico 
            //const user = users.find(user => user.email === email);
            const user = await db.User.findAll({
                where: {
                    users_email: {[db.Sequelize.Op.like] : email}
                }})
            
            // Verificar si se encontró un usuario con el correo electrónico proporcionado
            if (!user) {
                 res.status(401).render('login', { title: 'Login', css: '/css/login.css', error: "Correo electrónico o contraseña incorrectos." });
            }
    
            // Comparar la contraseña proporcionada con la contraseña almacenada en la base de datos
            const passwordMatch = await bcrypt.compareSync(password, user[0].users_password);
            //res.send(user);
            if (passwordMatch) {
                // Guardar el usuario en la sesión
                req.session.user = user[0];
                console.log(user);
    
                // Si el usuario marcó la opción "recordarme", configurar la cookie
                if (remember) {
                    const cookieOptions = {
                        maxAge: 30 * 24 * 60 * 60 * 1000, // La cookie expira en 30 días
                        httpOnly: true // La cookie solo es accesible a través de HTTP y no a través de JavaScript
                    };
                    res.cookie('remember_user', user[0].users_email, cookieOptions);
                }
    
                // Redirigir a la página de inicio después de un inicio de sesión exitoso
              res.redirect('/');
            } else {
                // Si la contraseña es incorrecta, renderizar la página de inicio de sesión con un mensaje de error
               res.status(401).render('login', { title: 'Login', css: '/css/login.css', error: "Correo electrónico o contraseña incorrectos." });
            }
        } catch (error) {
            // Manejar cualquier error que ocurra durante el proceso de inicio de sesión
            console.error("Error en el inicio de sesiónn:", error);
            // res.status(500).render('login', { title: 'Login', css: '/css/login.css', error: "Se produjo un error durante el inicio de sesión. Por favor, inténtalo de nuevo más tarde." });
            res.send(error) 
        }
    }
    ,
    

    profileView: (req, res) => {
        // Suponiendo que tienes acceso al objeto de usuario desde la sesión
        const user = req.session.user;

        // Renderizar la vista de perfil y pasar el objeto de usuario como contexto
        res.render('profile', { title: 'Perfil de Usuario', css: '/css/profile.css', user: user });
    },
    
   
    editUserView: async (req, res) => {
        try {
            const userId = req.params.id;
            const userEdit = await db.User.findByPk(userId);

    
            if (!userEdit) {
                return res.status(404).send("Usuario no encontrado");
            }
    
            res.render("editProfile", {
                title: "Editar usuario",
                //user: req.session.user
                user: userEdit,
                
            });
        } catch (err) {
            console.error("Error al obtener datos del usuario:", err);
            res.status(500).json({ error: "No se pudo obtener el usuario para editar" });
        }
    },
    
    
    modifyUser: async (req, res) => {
        try {
            // Obtener el ID del usuario que se va a modificar
            const userId = req.params.id;
           // Obtener los datos actualizados del usuario
            const user = await db.User.findByPk(userId);
    
            // Obtener los datos modificados del cuerpo de la solicitud
            const { username, firstName, lastName, email } = req.body;
    
            // Actualizar el usuario en la base de datos
            const [updatedRows] = await db.User.update({
                users_username: username,
                users_firstName: firstName,
                users_lastName: lastName,
                users_email: email,
                // Otros campos que puedas necesitar actualizar
            }, {
                where: {
                    users_id: userId // Condición para seleccionar el usuario a actualizar
                }
            });
    
            if (updatedRows === 0) {
                return res.status(404).send("Usuario no encontrado");
            }
    
          
            // Redirigir o responder según sea necesario
            res.render('profile', { title: 'Perfil de Usuario', css: '/css/profile.css', user: user});
        } catch (error) {
            console.error("Error al modificar usuario:", error);
            res.status(500).send("No se pudo modificar el usuario");
        }
    }
,    
    registerView: (req, res) => {
        res.render('register', { title: 'Registrarme', css: '/css/registrar.css' , user: req.session.user });
    },

    saveUser: async(req, res) => {
        try {
            // Leer el archivo JSON de usuarios actual
            //const users = JSON.parse(fs.readFileSync('data/users.json'));             
            const { username, firstName, lastName, email, password } = req.body;
            
            // Encriptar la contraseña antes de almacenarla
            const hashedPassword = bcrypt.hashSync(password, 10);

            // Crear un objeto de usuario con los datos proporcionados
            const user = {
                //id: users.length + 1,
                users_username: username,
                users_firstName: firstName,
                users_lastName: lastName,
                users_email: email,
                users_password: hashedPassword,
                users_image: req.file.filename,
                user_types_id: 3,
                users_active: 1,
                //profileImage:req.file.filename
            };

            // Agregar el nuevo usuario al array de usuarios
            //users.push(user);            
            // Guardar el array actualizado en el archivo JSON de usuarios
            //fs.writeFileSync('data/users.json', JSON.stringify(users, null, 2));
            await db.User.create(user);

          res.render('register', { title: 'Registrarme', css: '/css/registrar.css' , user: req.session.user});

        } catch (err) {
            //res.status(500).json({ error: "No se pudo crear el usuario" });
            res.send(err)
          }
    } ,
    
    logout: (req, res) => {
        // Eliminar el usuario de la sesión
        req.session.destroy();

        // Eliminar la cookie relacionada con el recordatorio de sesión
        res.clearCookie('remember_user');

        // Redirigir al usuario a la página de inicio o a donde desees después de cerrar sesión
        res.redirect('/');
    }
}


module.exports = userController;
