const express = require('express')
const Usuario = require('../models/usuario')
const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion')
const app = express()

const _ = require('underscore')

const bcrypt = require('bcrypt');


app.get('/usuario', verificaToken, (req, res) => {

    // return res.json({
    //     usuario: req.usuario
    // })
    let desde = req.query.desde || 0
    let limite = req.query.limite || 5
    desde = Number(desde)
    limite = Number(limite)
    Usuario.find({ estado: true }, 'nombre email role estado google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            Usuario.count({ estado: true }, (err, conteo) => {

                res.json({
                    ok: true,
                    usuarios,
                    conteo
                })
            })
        })
})
app.post('/usuario', [verificaToken, verificaAdmin_Role], (req, res) => {
        //res.json('get Usuario')
        let body = req.body
        let usuario = new Usuario({
            nombre: body.nombre,
            email: body.email,
            password: bcrypt.hashSync(body.password, 10),
            role: body.role
        });

        usuario.save((err, usuarioDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err

                })
            }

            res.json({
                ok: true,
                usuario: usuarioDB
            })

        })
    })
    // app.post('/usuario', function(req, res) {
    //     let body = req.body
    //     if (body.nombre === undefined) {
    //         res.status(400).json({
    //             ok: false,
    //             mensaje: 'El nombre es necesario'
    //         })
    //     } else {
    //         res.json({ body })
    //     }
    // })
app.put('/usuario/:id', [verificaToken, verificaAdmin_Role], function(req, res) {
    let id = req.params.id
        // console.log(id);
    body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado'])

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err

            })
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })

})


app.delete('/usuario/:id', [verificaToken, verificaAdmin_Role], function(req, res) {
    let id = req.params.id
        // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => { //eliminacion fisicaa
    Usuario.findByIdAndUpdate(id, { estado: false }, { new: true, runValidators: true }, (err, usuarioBorrado) => {
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

module.exports = app