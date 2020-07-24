const express = require('express')
const Empleador = require('../models/empleador')
    //const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion')
const app = express()

const _ = require('underscore')

const bcrypt = require('bcrypt');

//app.post('/empleador', [verificaToken, verificaAdmin_Role], (req, res) => {

app.post('/empleador', (req, res) => {
    //res.json('get Usuario')
    let body = req.body
    let empleador = new Empleador({
        Fname: body.Fname,
        LName: body.LName,
        email: body.email,
        img: body.img,
        birthday: body.birthday,
        phone: body.phone,
        lat: body.lat,
        long: body.long

    });

    empleador.save((err, empleadorDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err

            })
        }

        res.json({
            ok: true,
            usuario: empleadorDB
        })

    })
})

//app.get('/empleador', verificaToken, (req, res) => {
app.get('/empleadores', (req, res) => {


    let desde = req.body.desde || 0
    let limite = req.body.limite || 5
    desde = Number(desde)
    limite = Number(limite)
    Empleador.find({ state: true }, 'Fname LName email img birthday phone state google lat long')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            Empleador.countDocuments({ state: true }, (err, conteo) => {

                res.json({
                    ok: true,
                    usuarios,
                    conteo
                })
            })
        })
})


app.get('/empleador', (req, res) => {


    // let desde = req.query.desde || 0
    // let limite = req.query.limite || 5
    // desde = Number(desde)
    // limite = Number(limite)
    let body = req.body
    let email = body.email
    Empleador.find({ email: email }, 'Fname LName email img birthday phone state google lat long')
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            Empleador.countDocuments({ email: email }, (err, conteo) => {

                res.json({
                    ok: true,
                    usuarios,
                    conteo
                })
            })
        })
})

//app.delete('/usuario/:id', [verificaToken, verificaAdmin_Role], function(req, res) {

app.delete('/empleador', function(req, res) {
    let body = req.body
    let email = body.email
        // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => { //eliminacion fisicaa
    Empleador.findOneAndUpdate({ email: email }, { state: false }, { new: true, runValidators: true }, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err

            })
        }
        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'User Not Found'
                }

            })
        }
        res.json({
            ok: true,
            usuario: usuarioBorrado
        })
    })
})

//app.put('/empleador', [verificaToken, verificaAdmin_Role], function(req, res) {

app.put('/empleador', function(req, res) {
    let body = req.body
    let id = body.id
        // console.log(id);
    body1 = _.pick(req.body, ['Fname', 'LName', 'lat', 'img', 'long'])
        //       body1 = _.pick(req.body, ['Fname', 'LName', 'email', 'lat', 'phone', 'img', 'long'])
        // console.log(body1);
        // let empleador = {
        //     Fname: body.Fname,
        //     LName: body.LName,
        //     img: body.img,
        //     lat: body.lat,
        //     long: body.long

    // };



    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => { //eliminacion fisicaa
    Empleador.findByIdAndUpdate(id, body1, { new: true, runValidators: true }, (err, usuarioActualizado) => {
        console.log(usuarioActualizado);
        if (err) {
            return res.status(400).json({
                ok: false,
                err

            })
        }
        if (!usuarioActualizado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'User Not Found'
                }

            })
        }
        res.json({
            ok: true,
            usuario: usuarioActualizado
        })
    })
})

module.exports = app