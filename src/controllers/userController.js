const bcrypt = require("bcryptjs");
const fs = require("fs");
const db = require("../database/models");
const sequelize = db.Sequelize;
//const users = JSON.parse(fs.readFileSync("data/users.json"));
const { validationResult } = require("express-validator");
const { error, log } = require("console");

let userController = {

  getAllUsers: async (req, res) => {
    try {
      const users = await db.User.findAll();
      res.json(users);
    } catch (error) {
      console.error('Error al obtener todos los usuarios:', error);
      res.status(500).json({ error: 'Error al obtener todos los usuarios' });
    }
  },
  addUser: async (req, res) => {
   

      const { username, firstName, lastName, email, password } = req.body;

      const hashedPassword = bcrypt.hashSync(password, 10);

      const newUser = {
        users_username: username,
        users_firstName: firstName,
        users_lastName: lastName,
        users_email: email,
        users_password: hashedPassword,
        user_types_id: 3,
        users_active: 1,
      };

      await db.User.create(newUser);
      res.status(201).json({ message: 'Usuario creado exitosamente' });
 
  },


  loginView: (req, res) => {
    res.render("login", {
      title: "Login",
      css: "/css/login.css",
      user: req.session.user,
    });
  },

  login: async (req, res) => {
    try {
        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            return res.render("login", {
                errors: resultValidation.mapped(),
                oldData: req.body,
                title: "login",
                css: "/css/login.css",
            });
        }

        const { email, password, remember } = req.body;

        const user = await db.User.findOne({
          where: {
              users_email: { [db.Sequelize.Op.like]: email },
              users_active: true,
          }
      });

 console.log(user);
        // Verificar si se encontró un usuario con el correo electrónico proporcionado
        if (!user) {
            return res.status(401).render("login", {
                title: "Login",
                css: "/css/login.css",
                error: "Correo electrónico o contraseña incorrectos.",
            });
        }

        const passwordMatch = await bcrypt.compareSync(
            password,
            user.users_password
        );

        if (passwordMatch) {
            req.session.user = user;

            // Si el usuario marcó la opción "recordarme"
            if (remember) {
                const cookieOptions = {
                    maxAge: 30 * 24 * 60 * 60 * 1000, // La cookie expira en 30 días
                    httpOnly: true, // La cookie solo es accesible a través de HTTP y no a través de JavaScript
                };
                res.cookie("remember_user", user.users_email, cookieOptions);
            }

            res.render('profile', { 
            title: "perfil",
            css: "/css/profile.css",
          
            user: req.session.user });

        } else {
            res.status(401).render("login", {
                title: "Login",
                css: "/css/login.css",
                error: "Correo electrónico o contraseña incorrectos.",
            });
        }

       

    } catch (error) {
        console.error("Error en el inicio de sesión:", error);
        return res.status(500).render("login", {
            title: "Login",
            css: "/css/login.css",
            error: "Se produjo un error durante el inicio de sesión. Por favor, inténtalo de nuevo más tarde.",
        });
    }
},


  profileView: (req, res) => {
  
    const user = req.session.user;

    res.render("profile", {
      title: "Perfil de Usuario",
      css: "/css/profile.css",
      user: user,
    });
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
        css: "/css/profile2.css",
        user: req.session.user,
      });
    } catch (err) {
      console.error("Error al obtener datos del usuario:", err);
      res
        .status(500)
        .json({ error: "No se pudo obtener el usuario para editar" });
    }
  },

  modifyUser: async (req, res) => {
    try {
      
      const userId = req.params.id;
      
      const user = await db.User.findByPk(userId);

     
      const { username, firstName, lastName, email } = req.body;

    
      const [updatedRows] = await db.User.update(
        {
          users_username: username,
          users_firstName: firstName,
          users_lastName: lastName,
          users_email: email,
        
        },
        {
          where: {
            users_id: userId, 
          },
        }
      );

      if (updatedRows === 0) {
        return res.status(404).send("Usuario no encontrado");
      }

      res.render("profile", {
        title: "Perfil de Usuario",
        css: "/css/profile.css",
        user: user,
      });
    } catch (error) {
      console.error("Error al modificar usuario:", error);
      res.status(500).send("No se pudo modificar el usuario");
    }
  },
  registerView: (req, res) => {
    const errorMessages = [];
    res.render("register", {
      title: "Registrarme",
      css: "/css/registrar.css",
      user: req.session.user,
      errorMessages: errorMessages
      
    });
  },

  saveUser: async (req, res) => {
    const resultValidation = validationResult(req);
    //   const errorMessages = errors.array()
    //   if (!errors.isEmpty()) {
    //     console.log(errors)
    //     console.log(errorMessages)
    //     return res.render('register',{ title: 'Registrarme',css: '/css/registrar.css', errorMessages: errorMessages });
    //   }
    if (resultValidation.errors.length > 0) {
      //console.log("Mapped: ", resultValidation.mapped())
      return res.render("register", {
        errors: resultValidation.mapped(),
        oldData: req.body,
        title: "Registrarme",
        css: "/css/registrar.css",
      });
    }

    try {
      // Leer el archivo JSON de usuarios actual
      //const users = JSON.parse(fs.readFileSync('data/users.json'));
      const { username, firstName, lastName, email, password } = req.body;

      const hashedPassword = bcrypt.hashSync(password, 10);

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


      //users.push(user);
      // Guardar el array actualizado en el archivo JSON de usuarios
      //fs.writeFileSync('data/users.json', JSON.stringify(users, null, 2));
      await db.User.create(user);
      const successMessage = "¡Usuario creado con éxito!"

      return res.render("register", {
        title: "Registrarme",
        css: "/css/registrar.css",
        errorMessages: ["ASD"],
       success: successMessage,
      });
    } catch (err) {
      res.send(err);
    }
  },


  editUser: async (req, res) => {
    try {
      const userId = req.params.id;
      const { username, firstName, lastName, email } = req.body;

      const [updatedRows] = await db.User.update(
        {
          users_username: username,
          users_firstName: firstName,
          users_lastName: lastName,
          users_email: email,
        },
        { where: { users_id: userId } }
      );

      if (updatedRows === 0) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      res.status(200).json({ message: 'Usuario actualizado exitosamente' });
    } catch (error) {
      console.error('Error al modificar usuario:', error);
      res.status(500).json({ error: 'Error al modificar usuario' });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const userId = req.params.id;
  
      const updatedRows = await db.User.update(
        { users_active: false },
        { where: { users_id: userId } }
      );
  
      if (updatedRows[0] === 0) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
  
      res.status(200).json({ message: 'Usuario marcado como inactivo exitosamente' });
    } catch (error) {
      console.error('Error al marcar usuario como inactivo:', error);
      res.status(500).json({ error: 'Error al marcar usuario como inactivo' });
    }
  },

  logout: (req, res) => {
    req.session.destroy();

    res.clearCookie("remember_user");

    res.redirect("/");
  },
};

module.exports = userController;
