const express = require('express')
const app = express();
const path = require('path');
const PORT=3001;
const mainRoutes = require('./routes/mainRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');


app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use('/', mainRoutes);
app.use('/user', userRoutes);
app.use('/product', productRoutes);



app.listen(PORT, () => console.log(`Server listening at port ${PORT}`));