const mongoose = require('mongoose');

// Definir el esquema para guardar los usuarios en la BD
const userSchema = new mongoose.Schema({
    // Both ways work
    name: {
        type: String,
        required: true
    },
    email: String,
    password: String
})

// Configurar la respuesta del usuario en el esquema
userSchema.set('toJSON', {
    transform: (document, returnObject)=>{
        // id de MongoDB
        returnObject.id = returnObject._id.toString();
        delete returnObject.id

    }
})

// Registrar el modelo
const User = mongoose.model('User', userSchema);

// Debemos exportar
module.exports = User;