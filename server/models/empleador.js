const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')



let Schema = mongoose.Schema


let empleadorSchema = new Schema({
    Fname: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    LName: {
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
    birthday: {
        type: Date,
        required: [true, 'el correo es necesario']

    },
    phone: {
        type: String,
        unique: true,
        required: false
    },
    state: {
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

empleadorSchema.methods.toJSON = function() {
    let user = this
    let userObject = user.toObject();
    delete userObject.password;
    return userObject
}
empleadorSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' })

module.exports = mongoose.model('Empleadore', empleadorSchema)