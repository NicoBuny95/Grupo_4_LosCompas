let mainController = {
    index: (req, res) => {
        res.render('index', {title: 'LC Supermercado', css:'css/index.css'});
    },
}

module.exports = mainController;