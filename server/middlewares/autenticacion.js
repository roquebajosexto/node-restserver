const jwt = require('jsonwebtoken')

//=============================
//Verifica Token
//=============================
let verificaToken = (req, res, next) => {
    let token = req.get('token')

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token No Válido'
                }

            })

        }
        req.usuario = decoded.usuario
        next()
    })

}

//=============================
//Verifica Admin ROLE
//=============================


let verificaAdmin_Role = (req, res, next) => {
    let usuario = req.usuario
    if (usuario.role === 'ADMIN_ROLE') {
        next()

    } else {
        return res.json({
            ok: false,
            err: {
                message: 'El Usuario no es Adminisrador'
            }
        })
    }
}
module.exports = {
    verificaToken,
    verificaAdmin_Role
}