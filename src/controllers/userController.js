let userController = {
    login: (req, res) => {
        res.render('login', {title: 'Login', css:'/css/login.css'});
    },
    loging: (req, res) => {
        let infoLog = req.body;

        res.redirect('/');
    },
    register: (req, res) => {
        res.render('register', {title: 'Registrarme', css:'/css/registrar.css'});
    },
}

module.exports = userController;