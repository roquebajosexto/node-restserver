const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')



let Schema = mongoose.Schema


let calificacionSchema = new Schema({
    foto: {
        type: String,
        required: false
    },
    comentario: {
        type: String,
        required: false
    },
    rating: {
        type: Number,
        required: [true, 'El Rating es necesario']
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    }
});

calificacionSchema.methods.toJSON = function() {
    let user = this
    let userObject = user.toObject();
    delete userObject.password;
    return userObject
}
calificacionSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser unico' })

module.exports = mongoose.model('Calificacion', calificacionSchema)