const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const calificacion = require('../models/calificacion')


let Schema = mongoose.Schema


let chambeadorSchema = new Schema({
    calificaciones: {
        type: [calificacion],
        required: [true, 'El nombre es necesario']
    },
    apellido: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'el correo es necesario']

    },
    img: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
    lat: {
        type: Number,
        default: false
    },
    long: {
        type: Number,
        default: false
    }
});

chambeadorSchema.methods.toJSON = function() {
    let user = this
    let userObject = user.toObject();
    delete userObject.password;
    return userObject
}
chambeadorSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser unico' })

module.exports = mongoose.model('Chambeadore', chambeadorSchema)