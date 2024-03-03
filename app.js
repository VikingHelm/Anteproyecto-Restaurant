require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
//Backend
const usersRouter = require('./controllers/users');


// Conexión DB
(async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Te has conectado a MongoDB.')
    }catch(error){
        console.log(error)
    }
})();

// MongoDB Schema
// const userSchema = new Schema({
//     name: String,
//     email: String,
//     password: String
//   });
  
//   const User = mongoose.model('User', userSchema);



// Rutas de Frontend (se coloca la carpeta, no el archivo)
// Automáticamente detecta el HTML (debe llamarse index.html para que lo haga)
app.use('/', express.static(path.resolve('views', 'home')));
app.use('/login', express.static(path.resolve('views', 'login')));
app.use('/registro', express.static(path.resolve('views', 'registro')));
app.use('/AdminPanel', express.static(path.resolve('views', 'AdminPanel')));
app.use('/AdminPanel/EditarProducto', express.static(path.resolve('views', 'AdminPanel', 'EditarProducto')));
app.use('/AdminPanel/NuevoProducto', express.static(path.resolve('views', 'AdminPanel', 'NuevoProducto')));
app.use('/RestaurantApp', express.static(path.resolve('views', 'RestaurantApp')));
app.use('/components', express.static(path.resolve('views', 'components')));
app.use('/img', express.static(path.resolve('img')));
// Morgan debe ir debajo de las rutas de frontend
app.use(morgan('tiny'));


// IMPORTANTE: Para BACKEND, convertir en .JSON
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Rutas de Backend
app.use('/api/users', usersRouter);


module.exports = app;