require('./config/config')

const express = require('express')
const app = express()
let mongoose = require('mongoose')

const bodyParser = require('body-parser')
    // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//configuracion global de rutas
app.use(require('./routes/index'))


mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, (err, res) => {
    if (err) throw err
    else console.log('base de datos online');
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto 3000');
})