const usersRouter = require('express').Router();

// Router permite hacer operaciones CRUD (CREATE, READ, UPDATE & DELETE)
// (POST, GET, DELETE, UPDATE)

// Registrar lo que el usuario envía
// ('ruta', (objeto para guardar, respuesta)=>{})
usersRouter.post('/', (request, response)=>{
    // console.log(request.body);
    const {name, email, password} = request.body;
    // console.log(name, email, password)

    if(!name || !email || !password){
        // console.log('Campo vacío.)
        return response.status(400).json({error: 'Todos los campos deben ser llenados.'});
    } else {
        return response.status(200).json({msg: 'Se ha creado el nuevo usuario.'});
    }
    
})

module.exports = usersRouter;