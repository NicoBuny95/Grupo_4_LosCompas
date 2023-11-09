const express= require('express')
const app=express();
const PORT=3001;

app.use('/static',express.static(__dirname + '/public'))
app.get(
    '/',(req,res)=> res.sendFile(__dirname + '/views/home.html')
)
app.get(
    '/register',(req,res)=> res.sendFile(__dirname + '/views/registrar.html')
)
app.get(
    '/login',(req,res)=> res.sendFile(__dirname + '/views/login.html')
)

app.get(
    '/carrito',(req,res)=> res.sendFile(__dirname + '/views/carrito.html')
)
app.get(
    '/detalle',(req,res)=> res.sendFile(__dirname + '/views/detalle.html')
)
app.listen(PORT ,()=>{
    console.log("servidor iniciado en el puerto ",PORT)
});