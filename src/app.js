const express = require('express')
const app = express();
const path = require('path');
const PORT=3001;
const mainRoutes = require('./routes/mainRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const bodyParser = require('body-parser');
const methodOverride = require("method-override")


// Middleware para parsear el cuerpo de las peticiones
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.use(express.static('public'));
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use('/', mainRoutes);
app.use('/user', userRoutes);
app.use('/product', productRoutes);



app.listen(PORT, () => console.log(`Server listening at port ${PORT}`));